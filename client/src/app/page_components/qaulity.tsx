import ChartInfo from "@/components/chart_info";
import { PRQualityTimeline } from "@/components/charts/pr_quality_timeline";
import { TestCaseRatioChart } from "@/components/charts/test_case_ratio_chart";
import SectionContainer from "@/components/section";
import { GraphInfo } from "@/lib/constants/graph_info";
import { TimePeriod, userReport } from "@/lib/types/core.types";

export interface QualityProps {
  data: userReport;
  period: TimePeriod;
}

export function Quality({ data, period }: QualityProps) {
  return (
    <div className="w-full flex flex-row">
      <ChartInfo
        tooltipText={GraphInfo.TOOLTIP_PR_QUALITY_TIMELINE}
        infoText="Quality"
      >
        <PRQualityTimeline
          className="w-full"
          period={period}
          data={data.quality}
        />
      </ChartInfo>
      <ChartInfo
        tooltipText={GraphInfo.TOOLTIP_TEST_ADDED_RATIO}
        infoText="test case ratio"
      >
        <TestCaseRatioChart
          className="w-full"
          period={period}
          testCases={data.testCases}
          testCasesRequired={data.testCasesRequired}
        />
      </ChartInfo>
    </div>
  );
}
