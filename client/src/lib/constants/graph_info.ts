/* eslint-disable no-unused-vars */
const skillSentimentAnalysis =
  "An evaluation of feedback on the skill received from comments. \nPositive: The skill is appreciated. \nNegative: The skill is not satisfactory. \nNeutral: The skill is mentioned without specific feedback. \nThis analysis is based on comments on PRs.";

const skillFrequencyTimeline =
  "The frequency at which skills were mentioned in comments over a specified period.";

const prQualityTimeline =
  "Assessment of the quality of your PR descriptions. \nHigh: The PR is well-described. \nMedium: The PR description meets requirements but could be improved. \nLow: The PR is not well-described. \nThis evaluation uses the description and title of the PR.";

const prImpactTimeline =
  "The impact of changes made in the PRs.\nHigh: The PR introduces significant functionality or fixes critical issues. \nMedium: The PR has a moderate impact on the project. \nLow: The PR involves minor changes or bug fixes. \nThis assessment is based on the code changes in the PR.";

const testAddedRatio =
  "The ratio of tests added relative to the code changes in the PR that require testing.";

const commentSentiment =
  "Comment Sentiment: The sentiment of comments on your PRs. User Response Sentiment: The sentiment of your responses to comments. This analysis uses the comments and responses on your PRs.";

export enum GraphInfo {
  SKILL_SENTIMENT_ANALYSIS = skillSentimentAnalysis,
  SKILL_FREQUENCY_TIMELINE = skillFrequencyTimeline,
  PR_QUALITY_TIMELINE = prQualityTimeline,
  PR_IMPACT_TIMELINE = prImpactTimeline,
  TEST_ADDED_RATIO = testAddedRatio,
  COMMENT_SENTIMENT = commentSentiment,
}
