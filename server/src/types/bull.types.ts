export interface QueueData {
  tag: string;
  type: QueueTypes;
  data: any;
}
export enum QueueTypes {
  GITLAB_FETCH = "gitlab-fetch",
  ANALYSIS_SCHDULER = "analysis-scheduler",
  VERTEX_ANALYSE_NOTES = "vertex-analyse-notes",
  VERTEX_ANALYSE_MERGE_REQUEST = "vertex-analyse-merge-request",
  GENERATE_INSIGHTS = "generate-insights",
}
