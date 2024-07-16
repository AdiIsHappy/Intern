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
  "**Reviewers Sentiment:** The sentiment of comments on your PRs.\n**User Response Sentiment:** The sentiment of your responses to comments.";

  const info_skillSentimentAnalysis =
    "This graph displays sentiment analysis of skills in your PRs, showing the frequency of each skill mentioned based on PR details, comments, and reviews.";

  const info_skillFrequencyTimeline =
    "This graph shows the frequency of skills used in your PRs over time, based on PR details, comments, and reviews. It also considers discussion context, not just mentions.";

  const info_prQualityTimeline =
    "This graph tracks the quality of your PRs over time, considering titles, descriptions, and labels.";

  const info_prImpactTimeline =
    "This graph measures the impact of your PRs over time, focusing on code changes made.";

  const info_testAddedRatio =
    "This graph shows the ratio of PRs with added test cases to those requiring them, based on PR changes.";

  const info_commentSentiment =
    "These plots show comment sentiment: positive for appreciation, negative for mistakes, and neutral for general discussion.";

  export enum GraphInfo {
    TOOLTIP_SKILL_SENTIMENT_ANALYSIS = toolTip_skillSentimentAnalysis,
    TOOLTIP_SKILL_FREQUENCY_TIMELINE = toolTip_skillFrequencyTimeline,
    TOOLTIP_PR_QUALITY_TIMELINE = toolTip_prQualityTimeline,
    TOOLTIP_PR_IMPACT_TIMELINE = toolTip_prImpactTimeline,
    TOOLTIP_TEST_ADDED_RATIO = toolTip_testAddedRatio,
    TOOLTIP_COMMENT_SENTIMENT = toolTip_commentSentiment,
    INFO_SKILL_SENTIMENT_ANALYSIS = info_skillSentimentAnalysis,
    INFO_SKILL_FREQUENCY_TIMELINE = info_skillFrequencyTimeline,
    INFO_PR_QUALITY_TIMELINE = info_prQualityTimeline,
    INFO_PR_IMPACT_TIMELINE = info_prImpactTimeline,
    INFO_TEST_ADDED_RATIO = info_testAddedRatio,
    INFO_COMMENT_SENTIMENT = info_commentSentiment,
  }
