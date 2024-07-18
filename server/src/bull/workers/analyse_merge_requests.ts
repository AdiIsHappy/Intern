import { sendAiPrompt } from "../../api/vertex/vertex";
import {
  addMergeRequestsToAnalysisDB,
  getUserDataDB,
} from "../../services/db/db";
import { QueueData, QueueTypes } from "../../types/bull.types";
import { AnalysedMergeRequest } from "../../types/core.types";
import { VERTMergeRequestForAnalysis } from "../../types/vertex.types";
import { queue } from "../queue";
import prompts from "../../api/vertex/prompts.json";

export async function analyseMergeRequestsAsync(
  username: string,
  mergeRequestIds: string[]
) {
  console.log("Analyzing Merge Requests", username, mergeRequestIds);
  // ger merge requests for analysis
  const userData = getUserDataDB(username);
  if (userData === null) {
    return;
  }
  console.log("Getting merge requests for analysis");
  const mergeRequests: VERTMergeRequestForAnalysis[] =
    userData.authoredMergeRequests.nodes
      .filter((mr) => mergeRequestIds.includes(mr.id))
      .map((mr) => ({
        id: mr.id,
        title: mr.title,
        description: mr.description,
        labels: mr.labels.nodes.map((label) => label.title),
        upvotes: mr.upvotes,
        downvotes: mr.downvotes,
        conflicts: mr.conflicts,
        diffStats: mr.diffStats,
      }));

  // do analysis
  let analysedMergeRequest: AnalysedMergeRequest[] = [];

  console.log("Analysing merge requests");
  try {
    analysedMergeRequest = await sendAiPrompt(
      mergeRequests,
      prompts.analysis.mergeRequest
    );

    analysedMergeRequest.forEach((mr) => {
      mr.createdAt = userData.authoredMergeRequests.nodes.find(
        (e) => e.id === mr.id
      )!.createdAt;
    });
  } catch (error) {
    console.error(
      "Error in analysing merge requests rescheduling Analysis for later",
      error
    );
    const task: QueueData = {
      tag: username,
      type: QueueTypes.VERTEX_ANALYSE_MERGE_REQUEST,
      data: {
        username,
        mergeRequestIds,
      },
    };
    await queue.add(task);
    return;
  }
  console.log("analysis complete");
  console.groupEnd();

  // Updates merege requests in storage
  addMergeRequestsToAnalysisDB(username, analysedMergeRequest);
}
