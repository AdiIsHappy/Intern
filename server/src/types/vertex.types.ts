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


export interface ReportVert {
  i: InsightVert[];
  a: ActionVert[];
  ps: PositiveSkillVert[];
  ns: NegativeSkillVert[];
}

export interface ActionVert {
  t: string;
  refs: ReferenceVert[];
}

export interface ReferenceVert {
  te: string;
  url: string;
  s: string;
  de: string;
}

export interface InsightVert {
  t: string;
  ids: string[];
}
export interface NegativeSkillVert extends TiveSkillVert {
  refs: ReferenceVert[];
}
export interface PositiveSkillVert extends TiveSkillVert {}
export interface TiveSkillVert {
  s: string;
  f: { [key: string]: number };
  sf: { [key: string]: SentimentFrequency };
  i: InsightVert[];
}

export interface SentimentFrequency {
  p: number;
  n: number;
  ex: number;
}
