export type TimePeriod = "week" | "month" | "quarter";
export type PathType = "report" | "user";
export type Quality = "High" | "Medium" | "Low";
export type Sentiment = "Positive" | "Negative" | "Neutral";

export interface userReport {
  summary?: string[];
  skills?: skillReport[];
  quality?: Record<string, Record<Quality, number>>;
  testCases?: Record<string, number>;
  testCasesRequired?: Record<string, number>;
  impact?: Record<string, Record<Sentiment, number>>;
}

export interface skillReport {
  skill: string;
  frequency: Record<string, number>;
  sentimentFrequency: {
    Positive: Record<string, number>;
    Negative: Record<string, number>;
    Neutral: Record<string, number>;
  };
  insights: string[];
}
