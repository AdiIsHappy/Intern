import ChartInfo from "@/components/chart_info";
import { PRImpactTimeline } from "@/components/charts/pr_impact_timeline";
import { SentimentPieChart } from "@/components/charts/sentiment_pie";
import { GraphInfo } from "@/lib/constants/graph_info";
import { TimePeriod, userReport } from "@/lib/types/core.types";

export interface OtherComparisionsProps {
  data: userReport | null;
  period: TimePeriod;
}

export function OtherComparisions({ data, period }: OtherComparisionsProps) {
  if (!data) return null;
  return (
    <div className="w-full flex flex-row">
      <ChartInfo
        tooltipText={GraphInfo.TOOLTIP_PR_IMPACT_TIMELINE}
        infoText={GraphInfo.INFO_PR_IMPACT_TIMELINE}
        className="flex-1 h-max"
      >
        <PRImpactTimeline
          className="w-full"
          period={period}
          data={data.impact}
        />
      </ChartInfo>
      <ChartInfo
        tooltipText={GraphInfo.TOOLTIP_COMMENT_SENTIMENT}
        infoText={GraphInfo.INFO_COMMENT_SENTIMENT}
        className="flex-1 h-min"
      >
        <div className="flex">
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
      </ChartInfo>
    </div>
  );
}
