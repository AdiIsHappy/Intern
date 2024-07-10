export interface GQLResponse {
  user: GQLUserNode;
}

export interface GQLUserVerificationResponse {
  user: GQLUserVerificationNode;
}

export interface GQLUserVerificationNode {
  id: string;
  name: string;
}

export interface GQLUserNode {
  id: string;
  username: string;
  name: string;
  webUrl: string;
  createdAt: string;
  authoredMergeRequests: GQLAuthoredMergeRequest;
}

export interface GQLAuthoredMergeRequest {
  nodes: GQLMergeRequestNode[];
}

export interface GQLMergeRequestNode {
  id: string;
  iid: string;
  title: string;
  description: string;
  state: string;
  labels: GQLLabelResponse;
  upvotes: number;
  downvotes: number;
  conflicts: boolean;
  createdAt: string;
  project: GQLProjectNode;
  notes: GQLNotes;
  diffStats?: RSTDiffNode[];
}

export interface GQLLabelResponse {
  nodes: { title: string }[];
}

export interface GQLProjectNode {
  fullPath: string;
}

export interface GQLNotes {
  nodes: GQLNoteNode[];
}

export interface GQLNoteNode {
  id: string;
  body: string;
  createdAt: string;
  author: { username: string };
  position: GQLPositionNode;
}

export interface GQLPositionNode {
  filePath: string;
  diffRefs: FLDiffRefsNode;
}

export interface FLDiffRefsNode {
  headSha: string;
}

export interface RSTDiffNode {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  generated_file: boolean;
}
