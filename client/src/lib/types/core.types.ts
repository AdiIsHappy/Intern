export type TimePeriod = "week" | "month" | "quarter";
export type PathType = "report" | "user";
export type Quality = "High" | "Medium" | "Low";
export type Sentiment = "Positive" | "Negative" | "Neutral";

export interface userReport {
  insights: { text: string; ids: string }[];
  actions: { text: string; references: Reference[] }[];
  positiveSkills: skillReport[];
  negativeSkills: skillReport[];
  impact: Record<string, Record<Sentiment, number>>;
  quality: Record<string, Record<Quality, number>>;
  testCases: Record<string, number>;
  testCasesRequired: Record<string, number>;
  userResponseSentiments: Record<Sentiment, number>;
  commentsSentiments: Record<Sentiment, number>;
}

export interface Reference {
  title: string;
  url: string;
  skill: string;
  description: string;
}

export interface skillReport {
  skill: string;
  frequency: Record<string, number>;
  sentimentFrequency: Record<string, Record<Sentiment, number>>;
  insights: { text: string; ids: string[] }[];
  references?: Reference[];
}
