import { PRImpactTimeline } from "@/components/charts/pr_impact_timeline";
import { PRQualityTimeline } from "@/components/charts/pr_quality_timeline";
import { SkillsFrequencyTimeline } from "@/components/charts/skills_frequency_timeline";
import { SkillSentimentChart } from "@/components/charts/skills_sentiment_chart";
import { TestCaseRatioChart } from "@/components/charts/test_case_ratio_chart";
import { TimePeriod, userReport } from "@/lib/types/core.types";

export interface MonthOnMonthCompProp {
  data: userReport;
  period: TimePeriod;
}
export function MonthOnMonthComp({ data, period }: MonthOnMonthCompProp) {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg">Month on Month Comparisons</h3>
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
        <div className="flex-1 h-max">
          <SkillsFrequencyTimeline
            period={period}
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              frequency: skill.frequency,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
