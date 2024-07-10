import { PRImpactTimeline } from "@/components/charts/pr_impact_timeline";
import { PRQualityTimeline } from "@/components/charts/pr_quality_timeline";
import { SentimentPieChart } from "@/components/charts/sentiment_pie";
import { TestCaseRatioChart } from "@/components/charts/test_case_ratio_chart";
import { Info } from "@/components/info";
import { GraphInfo } from "@/lib/constants/graph_info";
import { TimePeriod, userReport } from "@/lib/types/core.types";

export interface OtherComparisionsProps {
  data: userReport;
  period: TimePeriod;
}
export function OtherComparisions({ data, period }: OtherComparisionsProps) {
  return (
    <div className="w-full items-center">
      <h3 className="font-semibold text-lg">Other Comparisons</h3>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 h-max relative m-4">
          <PRQualityTimeline period={period} data={data.quality} />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.PR_QUALITY_TIMELINE} />
          </div>
        </div>
        <div className="flex-1 h-max relative m-4">
          <PRImpactTimeline period={period} data={data.impact} />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.PR_IMPACT_TIMELINE} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 h-max relative m-4">
          <TestCaseRatioChart
            period={period}
            testCases={data.testCases}
            testCasesRequired={data.testCasesRequired}
          />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.TEST_ADDED_RATIO} />
          </div>
        </div>
        <div className="flex-1 h-max flex flex-row relative m-4">
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.SKILL_SENTIMENT_ANALYSIS} />
          </div>
          <div className="flex-1 h-max">
            <SentimentPieChart
              data={data.commentsSentiments}
              title="Comments Sentiments"
            />
          </div>
          <div className="flex-1 h-max">
            <SentimentPieChart
              data={data.userResponseSentiments}
              title="User Response Sentiments"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
