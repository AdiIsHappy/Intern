/* eslint-disable no-unused-vars */
const toolTip_skillSentimentAnalysis =
  "**Positive:** The skill is appreciated.\n**Negative:** The skill is not satisfactory.\n**Neutral:** The skill is mentioned without specific feedback.";

const toolTip_skillFrequencyTimeline = "";

const toolTip_prQualityTimeline =
  "**High:** The PR is well-described.\n**Medium:** The PR description meets requirements but could be improved.\n**Low:** The PR is not well-described.";

const toolTip_prImpactTimeline =
  "\n**High:** The PR introduces significant functionality or fixes critical issues.\n**Medium:** The PR has a moderate impact on the project.\n**Low:** The PR involves minor changes or bug fixes.";

const toolTip_testAddedRatio = "";

const toolTip_commentSentiment =
  "**Comment Sentiment:** The sentiment of comments on your PRs.\n**User Response Sentiment:** The sentiment of your responses to comments.";

export enum GraphInfo {
  TOOLTIP_SKILL_SENTIMENT_ANALYSIS = toolTip_skillSentimentAnalysis,
  TOOLTIP_SKILL_FREQUENCY_TIMELINE = toolTip_skillFrequencyTimeline,
  TOOLTIP_PR_QUALITY_TIMELINE = toolTip_prQualityTimeline,
  TOOLTIP_PR_IMPACT_TIMELINE = toolTip_prImpactTimeline,
  TOOLTIP_TEST_ADDED_RATIO = toolTip_testAddedRatio,
  TOOLTIP_COMMENT_SENTIMENT = toolTip_commentSentiment,
}
