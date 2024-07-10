import { SkillsFrequencyTimeline } from "@/components/charts/skills_frequency_timeline";
import { SkillSentimentChart } from "@/components/charts/skills_sentiment_chart";
import Dropdown from "@/components/dropdown";
import { userReport } from "@/lib/types/core.types";
import { useEffect, useState } from "react";

export function PositiveSkills({ data }: { data: userReport }) {
  const skillsDropdownOptions: { label: string; value: string }[] =
    data.positiveSkills.map((skill) => ({
      value: skill.skill,
      label: skill.skill,
    }));
  const [skill, setSkill] = useState(skillsDropdownOptions.at(0)?.label || "");
  useEffect(() => {
    setSkill(skillsDropdownOptions.at(0)?.label || "");
  }, [data]);
  if (skillsDropdownOptions.length === 0)
    return <div>Positive Skill data not availale</div>;

  return (
    <div className="w-full my-8">
      <h3 className="font-semibold text-lg">Positive skills</h3>
      {/* Graphs */}
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="flex-1 h-max">
          <SkillSentimentChart
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              sentimentFrequency: skill.sentimentFrequency,
            }))}
          />
        </div>
        <div className="flex-1 h-max">
          <SkillsFrequencyTimeline
            data={data.positiveSkills.map((skill) => ({
              skill: skill.skill,
              frequency: skill.frequency,
            }))}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full my-8 bg-gray-100 p-4 rounded-md min-h-48">
        <Dropdown
          onChange={(val: string) => setSkill(val)}
          className="w-1/4"
          options={skillsDropdownOptions}
          defaultValue={skillsDropdownOptions.at(0)?.value || ""}
        />
        <ol className="list-inside list-decimal px-8 py-4">
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
