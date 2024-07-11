import { SkillsFrequencyTimeline } from "@/components/charts/skills_frequency_timeline";
import { SkillSentimentChart } from "@/components/charts/skills_sentiment_chart";
import Dropdown from "@/components/dropdown";
import { Info } from "@/components/info";
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
  }, [data]);

  if (skillsDropdownOptions.length === 0) {
    return <div>Positive Skill data not available</div>;
  }

  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg">Positive skills</h3>
      <div className="flex w-full flex-col lg:flex-row items-center">
        <div className="w-full relative min-h-96 lg:max-w-7xl">
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.SKILL_SENTIMENT_ANALYSIS} />
          </div>
          <SkillSentimentChart
            className="w-full"
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              sentimentFrequency: skill.sentimentFrequency,
            }))}
          />
        </div>
        <div className="w-full relative min-h-96 lg:max-w-7xl">
          <SkillsFrequencyTimeline
            className="w-full"
            period={period}
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              frequency: skill.frequency,
            }))}
          />
          <div className="absolute top-0 right-0 m-2">
            <Info tooltipText={GraphInfo.SKILL_FREQUENCY_TIMELINE} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full my-8 bg-gray-100 p-4 rounded-md min-h-48">
        <Dropdown
          onChange={(val: string) => setSkill(val)}
          className="w-full md:w-1/2 lg:w-1/4"
          options={skillsDropdownOptions}
          defaultValue={skillsDropdownOptions.at(0)?.value || ""}
        />
        <ol className="list-inside list-decimal px-2 py-4 text-justify">
          {data.positiveSkills
            .find((e) => e.skill === skill)
            ?.insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
        </ol>
      </div>
    </div>
  );
}
