import { DateTime } from "luxon";
import { Sentiment, userReport } from "../types/core.types";

export function generateSummary(data: userReport) {
  const {
    commentsSentiments,
    userResponseSentiments,
    testCases,
    testCasesRequired,
    quality,
  } = data;

  const averageSentiment = (sentiments: Record<Sentiment, number>) => {
    const total =
      sentiments.Positive + sentiments.Negative + sentiments.Neutral;
    return {
      Positive: sentiments.Positive / total,
      Negative: sentiments.Negative / total,
      Neutral: sentiments.Neutral / total,
    };
  };

  const avgCommentSentiment = averageSentiment(commentsSentiments);
  const avgUserResponseSentiment = averageSentiment(userResponseSentiments);

  const dates = Object.keys(quality).sort();
  if (dates.length === 0) return [];
  const latestDate = DateTime.fromISO(dates.pop()!).toISO() as string;

  const calculateAverageTestRatio = () => {
    let totalTestCases = 0;
    let totalTestCasesRequired = 0;
    for (let date in testCases) {
      if (date !== latestDate) {
        totalTestCases += testCases[date];
        totalTestCasesRequired += testCasesRequired[date] || 0;
      }
    }
    return totalTestCasesRequired > 0
      ? totalTestCases / totalTestCasesRequired
      : 0;
  };

  const latestTestRatio =
    testCasesRequired[latestDate] > 0
      ? testCases[latestDate] / testCasesRequired[latestDate]
      : 0;
  const averageTestRatio = calculateAverageTestRatio();

  const calculateAverageQuality = () => {
    let totalHigh = 0,
      totalMedium = 0,
      totalLow = 0;
    let count = 0;
    for (let date in quality) {
      if (date !== latestDate) {
        totalHigh += quality[date].High;
        totalMedium += quality[date].Medium;
        totalLow += quality[date].Low;
        count++;
      }
    }
    return count > 0
      ? {
          High: totalHigh / count,
          Medium: totalMedium / count,
          Low: totalLow / count,
        }
      : { High: 0, Medium: 0, Low: 0 };
  };

  const latestQuality = quality[latestDate];
  const averageQuality = calculateAverageQuality();

  let reviews = [];

  if (commentsSentiments.Positive > avgCommentSentiment.Positive) {
    reviews.push(
      "You have been receiving more **positive** comments recently."
    );
  } else if (commentsSentiments.Negative > avgCommentSentiment.Negative) {
    reviews.push(
      "You have been receiving more **negative** comments recently."
    );
  } else {
    reviews.push("others comments sentiment has been mostly **neutral**.");
  }

  if (userResponseSentiments.Positive > avgUserResponseSentiment.Positive) {
    reviews.push("Your responses to others are mostly **positive**.");
  } else if (
    userResponseSentiments.Negative > avgUserResponseSentiment.Negative
  ) {
    reviews.push(
      "Your responses to comments have been mostly **negative**. Try to communicate more positively."
    );
  } else {
    reviews.push("Your responses to comments have been mostly **neutral**.");
  }

  let testRatioMessage = `Your test added ratio is **${latestTestRatio.toFixed(
    2
  )}.** The average ratio is **${averageTestRatio.toFixed(2)}**.`;
  if (latestTestRatio < 0.3) {
    testRatioMessage +=
      " Your test added ratio is **quite low**, consider adding more test cases.";
  } else if (latestTestRatio >= 0.3 && latestTestRatio < 0.6) {
    testRatioMessage +=
      " Your test added ratio is **moderate**, keep working on improving it.";
  } else if (latestTestRatio >= 0.6 && latestTestRatio < 0.8) {
    testRatioMessage += " Your test added ratio is good, you are doing great.";
  } else {
    testRatioMessage +=
      " Your test added ratio is **excellent**, keep up the excellent work.";
  }
  if (latestTestRatio > averageTestRatio) {
    testRatioMessage += " You are improving.";
  } else {
    testRatioMessage +=
      " Your performance is declining compared to the average.";
  }
  reviews.push(testRatioMessage);

  if (latestQuality.Low > averageQuality.Low) {
    reviews.push(
      "Your PR description quality has seen a **decline**, consider describing your PRs more briefly."
    );
  } else {
    reviews.push(
      "Your PR descriptions are of **good quality**, keep up the good work."
    );
  }

  return reviews;
}
