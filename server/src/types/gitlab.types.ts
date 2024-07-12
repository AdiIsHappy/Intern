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

export interface RSTUserEvent{
  id: number;
  title: string | null;
  project_id: number;
  action_name: string;
  target_id: number | null;
  target_iid: number | null;
  target_type: string | null;
  author_id: number;
  target_title: string | null;
  author: {
    name: string;
    username: string;
    id: number;
    state: string;
    avatar_url: string;
    web_url: string;
  };
  author_username: string;
  imported: boolean;
  imported_from: string;
  push_data?: {
    commit_count: number;
    action: string;
    ref_type: string;
    commit_from: string;
    commit_to: string;
    ref: string;
    commit_title: string;
  };
  note?: {
    id: number;
    body: string;
    attachment: string | null;
    author: {
      name: string;
      username: string;
      id: number;
      state: string;
      avatar_url: string;
      web_url: string;
    };
    created_at: string;
    system: boolean;
    noteable_id: number;
    noteable_type: string;
  };
  created_at?: string;
};