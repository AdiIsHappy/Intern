export type TimePeriod = "week" | "month" | "quarter";
export type PathType = "report" | "user";
export type Quality = "High" | "Medium" | "Low";
export type Sentiment = "Positive" | "Negative" | "Neutral";

export interface userReport {
  summary: string[];
  positiveSkills: skillReport[];
  negativeSkills: skillReport[];
  impact: Record<string, Record<Sentiment, number>>;
  quality: Record<string, Record<Quality, number>>;
  testCases: Record<string, number>;
  testCasesRequired: Record<string, number>;
}

export interface skillReport {
  skill: string;
  frequency: Record<string, number>;
  sentimentFrequency: Record<string, Record<Sentiment, number>>;
  insights: string[];
  references?: { title: string; url: string; description: string }[];
}
