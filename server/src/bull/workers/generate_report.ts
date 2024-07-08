import { DateTime } from "luxon";
import { SystemPrompts } from "../../api/vertex/prompts";
import { sendAiPrompt } from "../../api/vertex/vertex";
import {
  getMergeRequestAnalysisDB,
  getNotesAnalsysisDB,
  storeInsightsDB,
  updateStatusDB,
} from "../../services/db/db";
import {
  AnalysedMergeRequest,
  AnalysedNote,
  InsightsReport,
  Quality,
  TimePeriod,
} from "../../types/core.types";
import { getNPeriodBeforeDate } from "../../utlis/time";

// TODO: Reschduel the analysis upon failing

export async function generateReport(username: string, period: TimePeriod) {
  // Get analysis datas
  const startPeriodDate = getNPeriodBeforeDate(period);
  const notesAnalysis = getNotesAnalsysisDB(username);
  const mergeRequestAnalysis = getMergeRequestAnalysisDB(username);

  if (notesAnalysis === null || mergeRequestAnalysis === null) {
    console.error(`Analysis data not found for user ${username}`);
    return null;
  }

  // Get Insights from notes
  let notesInsights: InsightsReport;
  try {
    const dataToSend = notesAnalysis.data.filter(
      (note) =>
        DateTime.fromISO(note.createdAt!) >= DateTime.fromISO(startPeriodDate)
    );

    notesInsights = await sendAiPrompt<InsightsReport, AnalysedNote[]>(
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

  // Get Insights from merge requests
  let mrInsights: InsightsReport;
  try {
    const dataToSend = mergeRequestAnalysis.data.filter(
      (mr) =>
        DateTime.fromISO(mr.createdAt!) >= DateTime.fromISO(startPeriodDate)
    );
    mrInsights = await sendAiPrompt<InsightsReport, AnalysedMergeRequest[]>(
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

  // Merge generated insights
  let mergedInsights: InsightsReport = {};
  try {
    mergedInsights = await sendAiPrompt<
      InsightsReport,
      { notes: InsightsReport; merge_requests: InsightsReport }
    >(
      { notes: notesInsights, merge_requests: mrInsights },
      SystemPrompts.COMBINE_REPORTS
    );
  } catch (error) {
    console.error(`Error merging insights for user ${username}:`, error);
    return;
  }

  // Generate test case counts
  const testCases: Record<string, number> = {};
  const testCasesRequired: Record<string, number> = {};
  mergeRequestAnalysis.data.forEach((mr) => {
    if (!mr.testRequired) return;
    if (!mr.createdAt) return;
    const startOfPeriod = DateTime.fromISO(mr.createdAt)
      .startOf(period)
      .toISO()!;
    if (!testCases[startOfPeriod]) testCases[startOfPeriod] = 0;
    if (!testCasesRequired[startOfPeriod]) testCasesRequired[startOfPeriod] = 0;
    testCasesRequired[startOfPeriod] += 1;
    const sum = mr.tests.added + mr.tests.modified + mr.tests.removed;
    if (sum > 0) {
      testCases[startOfPeriod] += 1;
    }
  });
  // Generate Quality Count
  const quality: Record<string, Record<Quality, number>> = {};
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
  });
  // store insights
  // :STORAGE
  const dataToStore = {
    ...mergedInsights,
    quality,
    testCases,
    testCasesRequired,
  };
  storeInsightsDB(username, period, mergedInsights);
  updateStatusDB(username, "Avaliable");
}
