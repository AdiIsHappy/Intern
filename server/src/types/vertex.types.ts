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
  insights: Insight[];
  actions: Action[];
  positiveSkills: TiveSkill[];
  negativeSkills: TiveSkill[];
}

interface Action {
  text: string;
  references: Reference[];
}

export interface Reference {
  title: string;
  url: string;
  skill: string;
  description: string;
}

interface Insight {
  text: string;
  ids: string[];
}

interface TiveSkill {
  skill: string;
  frequency: { [key: string]: number };
  sentimentFrequency: { [key: string]: SentimentFrequency };
  insights: Insight[];
  references?: Reference[];
}

interface SentimentFrequency {
  Positive: number;
  Negative: number;
  Neutral: number;
}
