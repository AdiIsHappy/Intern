/* eslint-disable no-unused-vars */
const skillSentimentAnalysis =
  "An evaluation of feedback on the skill received from comments.\n**Positive:** The skill is appreciated.\n**Negative:** The skill is not satisfactory.\n**Neutral:** The skill is mentioned without specific feedback.\nThis analysis is based on comments on PRs.";

const skillFrequencyTimeline =
  "The frequency at which skills were mentioned in comments over a specified period.";

const prQualityTimeline =
  "Assessment of the quality of your PR descriptions.\n**High:** The PR is well-described.\n**Medium:** The PR description meets requirements but could be improved.\n**Low:** The PR is not well-described.\nThis evaluation uses the description and title of the PR.";

const prImpactTimeline =
  "The impact of changes made in the PRs.\n**High:** The PR introduces significant functionality or fixes critical issues.\n**Medium:** The PR has a moderate impact on the project.\n**Low:** The PR involves minor changes or bug fixes.\nThis assessment is based on the code changes in the PR.";

const testAddedRatio =
  "The ratio of tests added relative to the code changes in the PR that require testing.";

const commentSentiment =
  "**Comment Sentiment:** The sentiment of comments on your PRs.\n**User Response Sentiment:** The sentiment of your responses to comments.\nThis analysis uses the comments and responses on your PRs.";

export enum GraphInfo {
  SKILL_SENTIMENT_ANALYSIS = skillSentimentAnalysis,
  SKILL_FREQUENCY_TIMELINE = skillFrequencyTimeline,
  PR_QUALITY_TIMELINE = prQualityTimeline,
  PR_IMPACT_TIMELINE = prImpactTimeline,
  TEST_ADDED_RATIO = testAddedRatio,
  COMMENT_SENTIMENT = commentSentiment,
}
