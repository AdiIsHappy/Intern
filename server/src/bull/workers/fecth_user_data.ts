import { getMergeRequestDiffAsync } from "../../api/gitlab/gitlab";
import { getStoragePath, storeUserData } from "../../services/db/db";
import { writeJsonFile } from "../../services/db/file_handling";
import { getGitlabUserDataAsync } from "../../services/gitlab/gitlab";
import { QueueData, QueueTypes } from "../../types/bull.types";
import { TimePeriod } from "../../types/core.types";
import { queue } from "../queue";

export async function fecthUserDataAsync(
  username: string,
  period: TimePeriod,
  tag: string
) {
  // Get user data from Gitlab : includes Merge requests and comments
  const userData = await getGitlabUserDataAsync(username, period);
  if (userData === null) {
    return;
  }

  userData.authoredMergeRequests.nodes =
    userData.authoredMergeRequests.nodes.filter((node) => node != null);

  // get diffs for each merge request
  for (let i = 0; i < userData.authoredMergeRequests.nodes.length; i++) {
    const mergeRequest = userData.authoredMergeRequests.nodes[i];
    mergeRequest.diffStats = await getMergeRequestDiffAsync(
      mergeRequest.project.fullPath,
      mergeRequest.iid
    );
    mergeRequest.notes.nodes = mergeRequest.notes.nodes.filter(
      (node) => node !== null
    );
    userData.authoredMergeRequests.nodes[i] = mergeRequest;
  }

  //:STORAGE
  storeUserData(username, userData);

  // Add Schduler to Job Queue
  const task: QueueData = {
    tag: tag,
    type: QueueTypes.ANALYSIS_SCHDULER,
    data: {
      username,
      period: period,
    },
  };

  await queue.add(task);
}
