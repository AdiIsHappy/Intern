import { RSTDiffNode } from "./gitlab.types";

export interface VERTNoteBody {
  id: string;
  body: string;
}

export interface VERTNoteForAnalysis {
  id: string;
  body: string;
  position: string;
  mergeRequest: {
    title: string;
    description: string;
    labels: string[];
  };
}

export interface VERTMergeRequestForAnalysis {
  id: string;
  title: string;
  description: string;
  labels: string[];
  upvotes: number;
  downvotes: number;
  conflicts: boolean;
  diffStats?: RSTDiffNode[];
}
