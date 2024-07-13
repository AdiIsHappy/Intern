import { DateTime } from "luxon";
import { SystemPrompts } from "../../api/vertex/prompts";
import { sendAiPrompt } from "../../api/vertex/vertex";
import {
  getMergeRequestAnalysisDB,
  getNotesAnalsysisDB,
  getUserDataDB,
  storeInsightsDB,
  updateStatusDB,
} from "../../services/db/db";
import { Sentiment, Quality, TimePeriod } from "../../types/core.types";
import {
  getAllPeriodsBeggningsafter,
  getNPeriodBeforeDate,
} from "../../utlis/time";
import { ReportVert } from "../../types/vertex.types";

// TODO: Reschduel the analysis upon failing

export async function generateReport(username: string, period: TimePeriod) {
  // Get analysis datas
  const startPeriodDate = getNPeriodBeforeDate(period);
  const notesAnalysis = getNotesAnalsysisDB(username);
  const mergeRequestAnalysis = getMergeRequestAnalysisDB(username);
  const userInfo = getUserDataDB(username);
  const periods = getAllPeriodsBeggningsafter(period, startPeriodDate);
  if (
    notesAnalysis === null ||
    mergeRequestAnalysis === null ||
    userInfo === null
  ) {
    console.error(`user data not found for user ${username}`);
    return null;
  }

  console.log("Generating Insights for user", username);
  console.log("using data after", startPeriodDate);

  // Get Insights from notes
  let notesInsights: ReportVert;
  try {
    const dataToSend = {
      data: notesAnalysis.data.filter(
        (note) =>
          DateTime.fromISO(note.createdAt!) >= DateTime.fromISO(startPeriodDate)
      ),
      date: periods,
    };
    notesInsights = await sendAiPrompt<ReportVert, any>(
      dataToSend,
      SystemPrompts.REPORT_NOTES_ANALYSIS
    );
  } catch (error) {
    console.error(
      `Error generating insights from notes for user ${username}:`,
      error
    );
    return;
  }

  console.log("generate insights of notes");

  // Get Insights from merge requests
  let mrInsights: ReportVert;
  try {
    const dataToSend = {
      data: mergeRequestAnalysis.data.filter(
        (mr) =>
          DateTime.fromISO(mr.createdAt!) >= DateTime.fromISO(startPeriodDate)
      ),
      date: periods,
    };
    mrInsights = await sendAiPrompt<ReportVert, any>(
      dataToSend,
      SystemPrompts.REPORT_MR_ANALYSIS
    );
  } catch (error) {
    console.error(
      `Error generating insights from mr for user ${username}:`,
      error
    );
    return;
  }

  console.log("generate insights of MR");

  // Merge generated insights
  let mergedInsights: ReportVert;
  try {
    mergedInsights = await sendAiPrompt<
      ReportVert,
      { comments: ReportVert; merge_requests: ReportVert }
    >(
      { comments: notesInsights, merge_requests: mrInsights },
      SystemPrompts.COMBINE_REPORTS
    );
  } catch (error) {
    console.error(`Error merging insights for user ${username}:`, error);
    return;
  }

  console.log("insights collected");

  // Replace Ids with URls
  const idURLMap: Record<string, string> = {};
  userInfo.authoredMergeRequests.nodes.forEach((mr) => {
    idURLMap[mr.id] = mr.webUrl;
    mr.notes.nodes.forEach((note) => {
      idURLMap[note.id] = note.url;
    });
  });
  mergedInsights.negativeSkills.forEach((skill) => {
    skill.insights.forEach((insight) => {
      insight.ids = insight.ids.map((id) => idURLMap[id]);
    });
  });
  mergedInsights.positiveSkills.forEach((skill) => {
    skill.insights.forEach((insight) => {
      insight.ids = insight.ids.map((id) => idURLMap[id]);
    });
  });
  mergedInsights.insights.forEach((insight) => {
    insight.ids = insight.ids.map((id) => idURLMap[id]);
  });

  // Generate Response sentiments
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
  userInfo.authoredMergeRequests.nodes.forEach((mr) => {
    mr.notes.nodes.forEach((note) => {
      const analysis = notesAnalysis.data.find((n) => n.id === note.id);
      if (!analysis) return;
      if (note.author.username === username) {
        userResponseSentiments[analysis.feedback] += 1;
      } else {
        commentsSentiments[analysis.feedback] += 1;
      }
    });
  });

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

  console.log("insights generated");

  // store insights
  // :STORAGE
  const dataToStore = {
    ...mergedInsights,
    quality,
    testCases,
    testCasesRequired,
    impact,
    userResponseSentiments,
    commentsSentiments,
  };
  storeInsightsDB(username, period, dataToStore);
  updateStatusDB(username, "Avaliable");
}
