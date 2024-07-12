import { PRImpactTimeline } from "@/components/charts/pr_impact_timeline";
import { PRQualityTimeline } from "@/components/charts/pr_quality_timeline";
import { SentimentPieChart } from "@/components/charts/sentiment_pie";
import { TestCaseRatioChart } from "@/components/charts/test_case_ratio_chart";
import { Info } from "@/components/info";
import { GraphInfo } from "@/lib/constants/graph_info";
import { TimePeriod, userReport } from "@/lib/types/core.types";

export interface OtherComparisionsProps {
  data: userReport | null;
  period: TimePeriod;
}
export function OtherComparisions({ data, period }: OtherComparisionsProps) {
  if (!data) return null;
  return (
    <div className="w-full items-center">
      <h3 className="font-semibold text-lg">Other Comparisons</h3>
      <div className="flex w-full flex-col lg:flex-row items-center">
        <div className="flex-1 w-full relative m-4 min-h-96">
          <PRQualityTimeline
            className="w-full"
            period={period}
            data={data.quality}
          />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.PR_QUALITY_TIMELINE} />
          </div>
        </div>
        <div className="flex-1 w-full relative m-4 min-h-96">
          <PRImpactTimeline
            className="w-full"
            period={period}
            data={data.impact}
          />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.PR_IMPACT_TIMELINE} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 w-full relative m-4 min-h-96">
          <TestCaseRatioChart
            className="w-full"
            period={period}
            testCases={data.testCases}
            testCasesRequired={data.testCasesRequired}
          />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.TEST_ADDED_RATIO} />
          </div>
        </div>
        <div className="flex-1 flex flex-col md:w-full md:flex-row relative m-4 min-h-[36rem] lg:min-h-96">
          <div className="absolute top-0 right-0">
            <Info tooltipText={GraphInfo.COMMENT_SENTIMENT} />
          </div>
          <div className="flex-1 h-max w-max">
            <SentimentPieChart
              className="w-full my-4"
              data={data.commentsSentiments}
              title="Comments Sentiments"
            />
          </div>
          <div className="flex-1 h-max w-max">
            <SentimentPieChart
              className="w-full my-4"
              data={data.userResponseSentiments}
              title="User Response Sentiments"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
