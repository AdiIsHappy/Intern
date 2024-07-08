export type TimePeriod = "week" | "month" | "quarter";
export type Nature = "Positive" | "Negative" | "Neutral";
export type Quality = "High" | "Medium" | "Low";

export type ReportStatus =
  | "Getting Data"
  | "Analyzing Data"
  | "Preparing Presentation"
  | "Avaliable";

export interface UserReport {
  username: string;
  updatedAt: string;
  status: ReportStatus;
  report: any;
}

export interface Skill {
  skill: string;
  feedback: Nature;
}

export interface References {
  url: string;
  skill: string;
  description: string;
}

export interface TestChanges {
  added: 0;
  removed: 0;
  modified: 0;
}

export interface AnalysedMergeRequest {
  id: string;
  keywords: string[];
  quality: Quality;
  skills: Skill[];
  impact: Nature;
  references: string[];
  createdAt?: string;
  testRequired: true;
  tests: TestChanges;
  summary: string;
}

export interface AnalysedNote {
  id: string;
  keywords: string[];
  feedback: Nature;
  skills: Skill[];
  references: References[];
  createdAt?: string;
  mergeRequestId?: string;
  summary: string;
}

export interface InsightsReport {
  summary?: string[];
  skills?: [
    {
      skill: string;
      frequency: Record<string, number>;
      sentimentFrequency: {
        Positive: Record<string, number>;
        Negative: Record<string, number>;
        Neutral: Record<string, number>;
      };
      insights: string[];
    }
  ];
}
