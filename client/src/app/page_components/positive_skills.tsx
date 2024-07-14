import ChartInfo from "@/components/chart_info";
import { SkillsFrequencyTimeline } from "@/components/charts/skills_frequency_timeline";
import { SkillSentimentChart } from "@/components/charts/skills_sentiment_chart";
import Dropdown from "@/components/dropdown";
import LinkedText from "@/components/linked_text";
import { GraphInfo } from "@/lib/constants/graph_info";
import { TimePeriod, userReport } from "@/lib/types/core.types";
import { useEffect, useState } from "react";

export function PositiveSkills({
  data,
  period,
}: {
  data: userReport;
  period: TimePeriod;
}) {
  const skillsDropdownOptions: { label: string; value: string }[] =
    data.positiveSkills.map((skill) => ({
      value: skill.skill,
      label: skill.skill,
    }));
  const [skill, setSkill] = useState("");

  useEffect(() => {
    setSkill(skillsDropdownOptions.at(0)?.label || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (skillsDropdownOptions.length === 0) {
    return <div>Positive Skill data not available</div>;
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center">
        <ChartInfo
          tooltipText={GraphInfo.TOOLTIP_SKILL_SENTIMENT_ANALYSIS}
          infoText={"hello sample text"}
        >
          <SkillSentimentChart
            className="w-full"
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              sentimentFrequency: skill.sentimentFrequency,
            }))}
          />
        </ChartInfo>
        <ChartInfo
          tooltipText={GraphInfo.TOOLTIP_SKILL_FREQUENCY_TIMELINE}
          infoText={"hello sample text"}
        >
          <SkillsFrequencyTimeline
            className="w-full"
            period={period}
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              frequency: skill.frequency,
            }))}
          />
        </ChartInfo>
      </div>
      <div className="flex flex-col items-start justify-start w-full my-8 bg-gray-50 p-4 rounded-md min-h-48">
        <Dropdown
          label="Skill"
          onChange={(val: string) => setSkill(val)}
          className="w-full md:w-1/2 lg:w-1/4"
          options={skillsDropdownOptions}
          defaultValue={skillsDropdownOptions.at(0)?.value || ""}
        />
        <ol className="list-inside list-decimal px-2 py-4">
          {data.positiveSkills
            .find((e) => e.skill === skill)
            ?.insights.map((insight, index) => (
              <li className="text-md" key={index}>
                <LinkedText text={insight.text} urls={insight.ids} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
