import { DateTime } from "luxon";
import { sendAiPrompt } from "../../api/vertex/vertex";
import {
  getMergeRequestAnalysisDB,
  getNotesAnalsysisDB,
  getUserDataDB,
  getUserReportDB,
  storeInsightsDB,
  updateStatusDB,
} from "../../services/db/db";
import {
  Sentiment,
  Quality,
  TimePeriod,
  Report,
  PositiveSkill,
  NegativeSkill,
} from "../../types/core.types";
import {
  getAllPeriodsBeggningsafter,
  getNPeriodBeforeDate,
} from "../../utlis/time";
import {
  ActionVert,
  InsightVert,
  NegativeSkillVert,
  PositiveSkillVert,
  ReportVert,
} from "../../types/vertex.types";
import prompts from "../../api/vertex/prompts.json";
import { uploadUserDataToBlob } from "../../services/vercel/blob";
import { upsertUser } from "../../services/vercel/pg";
import { User } from "../../types/vercel.types";
import { GQLUserNode } from "../../types/gitlab.types";
import {
  AnalysedMergeRequestStorage,
  AnalysedNoteStorage,
} from "../../types/db.types";

// TODO: Reschduel the analysis upon failing

export async function generateReport(username: string, period: TimePeriod) {
  // Get analysis datas
  const startPeriodDate = getNPeriodBeforeDate(period);
  const notesAnalysis = getNotesAnalsysisDB(username);
  const mergeRequestAnalysis = getMergeRequestAnalysisDB(username);
  const userInfo = getUserDataDB(username);
  const periods = getAllPeriodsBeggningsafter(period, startPeriodDate);
  if (!notesAnalysis || !mergeRequestAnalysis || !userInfo) {
    console.error(`user data not found for user ${username}`);
    return null;
  }

  // Generate Response sentiments
  const {
    userResponseSentiments,
    commentsSentiments,
  }: {
    userResponseSentiments: Record<Sentiment, number>;
    commentsSentiments: Record<Sentiment, number>;
  } = GenerateReponseSentiemnts();

  // Generate PR quality count, impact count & test added count
  const quality: Record<string, Record<Quality, number>> = {};
  const impact: Record<string, Record<Sentiment, number>> = {};
  const testCases: Record<string, number> = {};
  const testCasesRequired: Record<string, number> = {};

  mergeRequestAnalysis.data.forEach((mr) => {
    if (!mr.createdAt) return;
    const startOfPeriod = DateTime.fromISO(mr.createdAt)
      .startOf(period)
      .toISO()!;
    if (!quality[startOfPeriod]) {
      quality[startOfPeriod] = {
        High: 0,
        Low: 0,
        Medium: 0,
      };
    }
    quality[startOfPeriod][mr.quality] += 1;

    if (!impact[startOfPeriod]) {
      impact[startOfPeriod] = {
        Negative: 0,
        Neutral: 0,
        Positive: 0,
      };
    }
    impact[startOfPeriod][mr.impact] += 1;

    if (!mr.testRequired) return;
    if (!testCases[startOfPeriod]) testCases[startOfPeriod] = 0;
    if (!testCasesRequired[startOfPeriod]) testCasesRequired[startOfPeriod] = 0;
    testCasesRequired[startOfPeriod] += 1;
    const sum = mr.tests.added + mr.tests.modified + mr.tests.removed;
    if (sum > 0) {
      testCases[startOfPeriod] += 1;
    }
  });

  // Get Insights from merge requests
  let mrInsights: ReportVert;
  try {
    mrInsights = await generateMRInsights(
      mergeRequestAnalysis,
      startPeriodDate,
      periods
    );
  } catch (error) {
    console.error(
      `Error generating insights from mr for user ${username}:`,
      error
    );
    return;
  }

  // Get Insights from notes
  let notesInsights: ReportVert;
  try {
    notesInsights = await generateNotesInsights(
      notesAnalysis,
      startPeriodDate,
      periods
    );
  } catch (error) {
    console.error(
      `Error generating insights from notes for user ${username}:`,
      error
    );
    return;
  }

  // Merge generated insights
  let mergedInsights: ReportVert;
  try {
    mergedInsights = await mergeInsights(notesInsights, mrInsights);
  } catch (error) {
    console.error(`Error merging insights for user ${username}:`, error);
    return;
  }

  // Changed ReportVert to Report;
  const {
    postitiveSkill,
    negativeSkill,
  }: { postitiveSkill: PositiveSkill[]; negativeSkill: NegativeSkill[] } =
    prepareSkills(mergedInsights);

  const report: Report = {
    actions: mergedInsights.a.map((action) => ({
      references: action.refs.map((ref) => ({
        title: ref.te,
        url: ref.url,
        skill: ref.s,
        description: ref.de,
      })),
      text: action.t,
    })),
    insights: mergedInsights.i.map((insight) => ({
      text: insight.t,
      ids: insight.ids,
    })),
    positiveSkills: postitiveSkill,
    negativeSkills: negativeSkill,
  };

  // Replace Ids with URls
  replaceIdsWithUrls(report, userInfo);

  // store insights
  const dataToStore = {
    ...report,
    quality,
    testCases,
    testCasesRequired,
    impact,
    userResponseSentiments,
    commentsSentiments,
  };
  storeInsightsDB(username, period, dataToStore);
  updateStatusDB(username, "Avaliable");

  await uploadData(username, userInfo);

  function GenerateReponseSentiemnts() {
    const userResponseSentiments: Record<Sentiment, number> = {
      Positive: 0,
      Negative: 0,
      Neutral: 0,
    };
    const commentsSentiments: Record<Sentiment, number> = {
      Positive: 0,
      Negative: 0,
      Neutral: 0,
    };
    userInfo!.authoredMergeRequests.nodes.forEach((mr) => {
      mr.notes.nodes.forEach((note) => {
        const analysis = notesAnalysis!.data.find((n) => n.id === note.id);
        if (!analysis) return;
        if (note.author.username === username) {
          userResponseSentiments[analysis.feedback] += 1;
        } else {
          commentsSentiments[analysis.feedback] += 1;
        }
      });
    });
    return { userResponseSentiments, commentsSentiments };
  }
}

async function generateMRInsights(
  mergeRequestAnalysis: AnalysedMergeRequestStorage,
  startPeriodDate: string,
  periods: string[]
) {
  let mrInsights: ReportVert;
  const dataToSend = {
    data: mergeRequestAnalysis.data.filter(
      (mr) =>
        DateTime.fromISO(mr.createdAt!) >= DateTime.fromISO(startPeriodDate)
    ),
    date: periods,
  };
  const insights: { i: InsightVert[] } = await sendAiPrompt(
    dataToSend,
    prompts.report.insight
  );
  const actions: { a: ActionVert[] } = await sendAiPrompt(
    dataToSend,
    prompts.report.actions
  );
  const positiveSkills: { ps: PositiveSkillVert[] } = await sendAiPrompt(
    dataToSend,
    prompts.report.positiveSkillsMR
  );
  const negativeSkills: { ns: NegativeSkillVert[] } = await sendAiPrompt(
    { ...dataToSend, positiveSkills: positiveSkills.ps },
    prompts.report.negativeSkillsMR
  );
  console.groupEnd();
  mrInsights = {
    i: insights.i,
    a: actions.a,
    ps: positiveSkills.ps,
    ns: negativeSkills.ns,
  };
  return mrInsights;
}

async function generateNotesInsights(
  notesAnalysis: AnalysedNoteStorage,
  startPeriodDate: string,
  periods: string[]
) {
  let notesInsights: ReportVert;
  const dataToSend = {
    data: notesAnalysis.data.filter(
      (note) =>
        DateTime.fromISO(note.createdAt!) >= DateTime.fromISO(startPeriodDate)
    ),
    periods: periods,
  };
  const insights: { i: InsightVert[] } = await sendAiPrompt(
    dataToSend,
    prompts.report.insight
  );
  console.log("Getting actions from notes");
  const actions: { a: ActionVert[] } = await sendAiPrompt(
    dataToSend,
    prompts.report.actions
  );
  console.log("Getting positive skills from notes");
  const positiveSkills: { ps: PositiveSkillVert[] } = await sendAiPrompt(
    dataToSend,
    prompts.report.positiveSkillsNote
  );
  console.log("Getting negative skills from notes");
  const negativeSkills: { ns: NegativeSkillVert[] } = await sendAiPrompt(
    { ...dataToSend, positiveSkills: positiveSkills.ps },
    prompts.report.negativeSkillsNote
  );
  console.groupEnd();
  notesInsights = {
    i: insights.i,
    a: actions.a,
    ps: positiveSkills.ps,
    ns: negativeSkills.ns,
  };
  return notesInsights;
}

async function mergeInsights(
  notesInsights: ReportVert,
  mrInsights: ReportVert
) {
  let mergedInsights: ReportVert;
  const insights: { i: InsightVert[] } = await sendAiPrompt(
    { comments: notesInsights, mergeRequest: mrInsights },
    prompts.combine.insight
  );
  console.log("Merging actions");
  const actions: { a: ActionVert[] } = await sendAiPrompt(
    { comments: notesInsights, mergeRequest: mrInsights },
    prompts.combine.actions
  );
  console.log("Merging positive skills");
  const positiveSkills: { ps: PositiveSkillVert[] } = await sendAiPrompt(
    { comments: notesInsights.ps, mergeRequest: mrInsights.ps },
    prompts.combine.positiveSkills
  );
  console.log("Merging negative skills");
  const negativeSkills: { ns: NegativeSkillVert[] } = await sendAiPrompt(
    { comments: notesInsights.ns, mergeRequest: mrInsights.ns },
    prompts.combine.negativeSkills
  );
  mergedInsights = {
    a: actions.a,
    i: insights.i,
    ps: positiveSkills.ps,
    ns: negativeSkills.ns,
  };
  return mergedInsights;
}

function prepareSkills(mergedInsights: ReportVert) {
  const poisitveSF: Record<
    string,
    Record<string, Record<Sentiment, number>>
  > = {};
  mergedInsights.ps.forEach((skill) => {
    poisitveSF[skill.s] = {};
    Object.keys(skill.sf).forEach((date) => {
      poisitveSF[skill.s][date] = {
        Positive: skill.sf[date].p,
        Negative: skill.sf[date].n,
        Neutral: skill.sf[date].ex,
      };
    });
  });

  const negativeSF: Record<
    string,
    Record<string, Record<Sentiment, number>>
  > = {};
  mergedInsights.ns.forEach((skill) => {
    negativeSF[skill.s] = {};
    Object.keys(skill.sf).forEach((date) => {
      negativeSF[skill.s][date] = {
        Positive: skill.sf[date].p,
        Negative: skill.sf[date].n,
        Neutral: skill.sf[date].ex,
      };
    });
  });

  const postitiveSkill: PositiveSkill[] = mergedInsights.ps.map((skill) => ({
    frequency: skill.f,
    insights: skill.i.map((insight) => ({ text: insight.t, ids: insight.ids })),
    skill: skill.s,
    sentimentFrequency: poisitveSF[skill.s],
  }));

  const negativeSkill: NegativeSkill[] = mergedInsights.ns.map((skill) => ({
    frequency: skill.f,
    insights: skill.i.map((insight) => ({ text: insight.t, ids: insight.ids })),
    skill: skill.s,
    sentimentFrequency: negativeSF[skill.s],
    references: skill.refs.map((ref) => ({
      title: ref.te,
      description: ref.de,
      skill: ref.s,
      url: ref.url,
    })),
  }));
  return { postitiveSkill, negativeSkill };
}

function replaceIdsWithUrls(report: Report, userInfo: GQLUserNode) {
  const idURLMap: Record<string, string> = {};
  userInfo.authoredMergeRequests.nodes
    .filter((e) => e)
    .forEach((mr) => {
      idURLMap[mr.id] = mr.webUrl;
      mr.notes.nodes.forEach((note) => {
        idURLMap[note.id] = note.url;
      });
    });

  report.negativeSkills.forEach((skill) => {
    skill.insights.forEach((insight) => {
      insight.ids = insight.ids.map((id) => idURLMap[id]);
    });
  });
  report.positiveSkills.forEach((skill) => {
    skill.insights.forEach((insight) => {
      insight.ids = insight.ids.map((id) => idURLMap[id]);
    });
  });
  report.insights.forEach((insight) => {
    insight.ids = insight.ids.map((id) => idURLMap[id]);
  });
}

async function uploadData(username: string, userInfo: GQLUserNode) {
  const finalReport = getUserReportDB(username);
  if (finalReport) {
    const response = await uploadUserDataToBlob(username, finalReport);
    const informationDB: User = {
      managerUsername: null,
      name: userInfo.name || "",
      profilePicUrl: userInfo?.avatarUrl || "",
      reportUrl: response.url,
      username: userInfo?.username || "",
      webUrl: userInfo?.webUrl || "",
    };
    await upsertUser(informationDB);
  }
}

