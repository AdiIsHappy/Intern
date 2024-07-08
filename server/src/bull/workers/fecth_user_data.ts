import { getMergeRequestDiffAsync } from "../../api/gitlab/gitlab";
import { storeUserDataDB, updateStatusDB } from "../../services/db/db";
import { getGitlabUserDataAsync } from "../../services/gitlab/gitlab";
import { QueueData, QueueTypes } from "../../types/bull.types";
import { TimePeriod } from "../../types/core.types";
import { queue } from "../queue";

export async function fecthUserDataAsync(username: string, tag: string) {
  // Get user data from Gitlab : includes Merge requests and comments
  const userData = await getGitlabUserDataAsync(username);
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
  storeUserDataDB(username, userData);
  await updateStatusDB(username, "Analyzing Data");

  // Add Schduler to Job Queue
  const task: QueueData = {
    tag: tag,
    type: QueueTypes.ANALYSIS_SCHDULER,
    data: {
      username,
    },
  };

  await queue.add(task);
}
