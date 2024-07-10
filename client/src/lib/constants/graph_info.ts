const skillSentimentAnalysis =
  "Kind of review of the skill you recived from comments\nPositive: People are apprecating you for the skill\nNegative: People are not happy with the skill\nNeutral: Skill was just mnetioned without any feedback\nUses Comments on Prs to determine.";
const skillFrequencyTimeline =
  "no of times the skills were mentioned in the comments over the period of time";
const prQualityTimeline =
  "How well described your prs were\nHigh: PR was well described\nMedium: PR description adderess the needs but could have been improved\nLow: PR was not described well.\nUses description and title of PR to determine.";
const prImpactTimeline =
  "how impact full changes were made in the prs\nHigh: PR had a high impact on the project like introducing new fuctanality, fixing breaking changes etc.\nMedium: PR had a medium impact on the project\nLow: PR had a low impact on the project like minor bug fixes.\nUses the code changed in the PR to determine.";
const testAddedRation =
  "Ratio of tests added to the code changes in the PR which requires test to be added";
const commentSentiment =
  "Comment Sentiment: Sentiments of the comment on your PR's\nUser Response Sentiment: Sentiments of the response you gave to the comments\nUses the comments and responses on your PR to determine.";

export enum GraphInfo {
  SKILL_SENTIMENT_ANALYSIS = skillSentimentAnalysis,
  SKILL_FREQUENCY_TIMELINE = skillFrequencyTimeline,
  PR_QUALITY_TIMELINE = prQualityTimeline,
  PR_IMPACT_TIMELINE = prImpactTimeline,
  TEST_ADDED_RATIO = testAddedRation,
  COMMENT_SENTIMENT = commentSentiment,
}
