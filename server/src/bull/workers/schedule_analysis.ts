import { DateTime } from "luxon";
import { getMergeRequestAnalysisDB, getUserDataDB } from "../../services/db/db";
import { QueueData, QueueTypes } from "../../types/bull.types";
import { queue } from "../queue";
import config from "../../config.json";

const notesPerIteration = config.analysis.dataPerJob.notes;
const mergeRequestsPerITeration = config.analysis.dataPerJob.mergeRequests;

export async function ScheduleAnalysisAsync(username: string, tag: string) {
  const userData = getUserDataDB(username);
  if (userData === null) {
    return;
  }

  let mergeRequests = userData.authoredMergeRequests.nodes;

  // filter merge requests based on exisiting analysis
  const exisitingAnalysis = getMergeRequestAnalysisDB(username);
  if (exisitingAnalysis !== null) {
    const filterData = DateTime.fromISO(exisitingAnalysis.updatedAt);
    mergeRequests = mergeRequests.filter(
      (mr) =>
        mr !== null &&
        mr.state !== "closed" &&
        DateTime.fromISO(mr.createdAt) > filterData
    );
  }

  // schedule merge request analysis
  for (let i = 0; i < mergeRequests.length; i += mergeRequestsPerITeration) {
    const requests = mergeRequests
      .slice(i, i + mergeRequestsPerITeration)
      .map((mr) => mr.id);
    const task: QueueData = {
      type: QueueTypes.VERTEX_ANALYSE_MERGE_REQUEST,
      tag: tag,
      data: {
        username,
        mergeRequestIds: requests,
      },
    };
    await queue.add(task);
  }

  // get all notes
  let notes = mergeRequests
    .map((mr) => mr.notes.nodes.map((note) => note.id))
    .flat();

  // schedule notes analysis
  for (let i = 0; i < notes.length; i += notesPerIteration) {
    const noteIds = notes.slice(i, i + notesPerIteration);
    const task: QueueData = {
      type: QueueTypes.VERTEX_ANALYSE_NOTES,
      tag: tag,
      data: {
        username,
        noteIds,
      },
    };
    await queue.add(task);
  }
}
