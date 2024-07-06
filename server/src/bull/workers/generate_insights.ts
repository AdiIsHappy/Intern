import { DateTime } from "luxon";
import { SystemPrompts } from "../../api/vertex/prompts";
import { sendAiPrompt } from "../../api/vertex/vertex";
import {
  getMergeRequestAnalysis,
  getNotesAnalsysis,
  storeInsights,
  updateStatus,
} from "../../services/db/db";
import {
  AnalysedMergeRequest,
  AnalysedNote,
  InsightsReport,
  TimePeriod,
} from "../../types/core.types";
import { getNPeriodBeforeDate } from "../../utlis/time";

// TODO: Reschduel the analysis upon failing

export async function generateInsights(username: string, period: TimePeriod) {
  // Get analysis datas
  const notesAnalysis = getNotesAnalsysis(username);
  const mergeRequestAnalysis = getMergeRequestAnalysis(username);

  if (notesAnalysis === null || mergeRequestAnalysis === null) {
    console.error(`Analysis data not found for user ${username}`);
    return null;
  }
  const startPeriodDate = getNPeriodBeforeDate(period);

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
      (mr) => DateTime.fromISO(mr.createdAt!) >= DateTime.fromISO(startPeriodDate)
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

  // store insights
  // :STORAGE
  storeInsights(username, period, mergedInsights);
  updateStatus(username, "Avaliable");
}
