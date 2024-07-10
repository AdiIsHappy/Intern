import { PRImpactTimeline } from "@/components/charts/pr_impact_timeline";
import { PRQualityTimeline } from "@/components/charts/pr_quality_timeline";
import { SentimentPieChart } from "@/components/charts/sentiment_pie";
import { TestCaseRatioChart } from "@/components/charts/test_case_ratio_chart";
import { TimePeriod, userReport } from "@/lib/types/core.types";

export interface OtherComparisionsProps {
  data: userReport;
  period: TimePeriod;
}
export function OtherComparisions({ data, period }: OtherComparisionsProps) {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg">Other Comparisons</h3>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 h-max">
          <PRQualityTimeline period={period} data={data.quality} />
        </div>
        <div className="flex-1 h-max">
          <PRImpactTimeline period={period} data={data.impact} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 h-max">
          <TestCaseRatioChart
            period={period}
            testCases={data.testCases}
            testCasesRequired={data.testCasesRequired}
          />
        </div>
        <div className="flex-1 h-max flex flex-row">
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
