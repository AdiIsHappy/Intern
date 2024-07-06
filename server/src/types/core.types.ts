export type TimePeriod = "week" | "month" | "quarter" | "year";
export type Nature = "Positive" | "Negative" | "Neutral";

export type ReportStatus =
  | "Getting Data"
  | "Analyzing Data"
  | "Preparing Presentation"
  | "Avaliable";

export interface UserReport {
  username: string;
  updatedAt: string;
  period: TimePeriod;
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

export interface AnalysedMergeRequest {
  id: string;
  keywords: string[];
  skills: Skill[];
  impact: Nature;
  references: string[];
  createdAt?: string;
}

export interface AnalysedNote {
  id: string;
  keywords: string[];
  feedback: Nature;
  skills: Skill[];
  references: References[];
  createdAt?: string;
  mergeRequestId?: string;
}

export interface InsightsReport {
  summary?: string[];
  skills?: [
    {
      skill: string;
      frequency: number;
      sentimentFrequency: {
        Positive: number;
        Negative: number;
        Neutral: number;
      };
      insights: string[];
    }
  ];
}
