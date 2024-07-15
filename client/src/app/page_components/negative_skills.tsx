import { SkillsFrequencyTimeline } from "@/components/charts/skills_frequency_timeline";
import { SkillSentimentChart } from "@/components/charts/skills_sentiment_chart";
import Dropdown from "@/components/dropdown";
import { TimePeriod, userReport } from "@/lib/types/core.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import linkIcon from "@/../public/link.svg";
import { GraphInfo } from "@/lib/constants/graph_info";
import ChartInfo from "@/components/chart_info";
import LinkedText from "@/components/linked_text";
export interface negativeSkillsProp {
  data: userReport;
  period: TimePeriod;
}
export function NegativeSkills({ data, period }: negativeSkillsProp) {
  const skillsDropdownOptions: { label: string; value: string }[] =
    data.negativeSkills.map((skill) => ({
      value: skill.skill,
      label: skill.skill,
    }));
  useEffect(() => {
    setSkill(skillsDropdownOptions.at(0)?.label || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const [skill, setSkill] = useState("");

  if (skillsDropdownOptions.length === 0)
    return <div>Positive Skill data not availale</div>;
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center">
        <ChartInfo
          tooltipText={GraphInfo.TOOLTIP_SKILL_SENTIMENT_ANALYSIS}
          infoText={GraphInfo.INFO_SKILL_SENTIMENT_ANALYSIS}
        >
          <SkillSentimentChart
            className="w-full"
            data={data.negativeSkills.map((skill) => ({
              skill: skill.skill,
              sentimentFrequency: skill.sentimentFrequency,
            }))}
          />
        </ChartInfo>
        <ChartInfo
          tooltipText={GraphInfo.TOOLTIP_SKILL_FREQUENCY_TIMELINE}
          infoText={GraphInfo.INFO_SKILL_FREQUENCY_TIMELINE}
        >
          <SkillsFrequencyTimeline
            className="w-full"
            period={period}
            data={data.negativeSkills.map((skill) => ({
              skill: skill.skill,
              frequency: skill.frequency,
            }))}
          />
        </ChartInfo>
      </div>
      <div className="w-full my-8 bg-gray-100 p-4 rounded-md min-h-48">
        <div className="flex-1 mx-2">
          <Dropdown
            onChange={(val: string) => setSkill(val)}
            className="w-full md:w-1/2 "
            options={skillsDropdownOptions}
            defaultValue={skillsDropdownOptions.at(0)?.value || ""}
            label="Skill"
          />
          <ol className="list-inside list-decimal px-2 py-4 flex-1">
            {data.negativeSkills
              .find((e) => e.skill === skill)
              ?.insights.map((insight, index) => (
                <li key={index}>
                  <LinkedText text={insight.text} urls={insight.ids} />
                </li>
              ))}
          </ol>
        </div>
      </div>
      <div className="w-full my-8 bg-gray-100 p-4 rounded-md min-h-48">
        <div className="flex-1 mx-2">
          <h3 className=" font-semibold text-lg">Refrences</h3>
          <div className="flex flex-col max-h-64 scroll-m-11 overflow-auto">
            {data.negativeSkills
              .find((e) => e.skill === skill)
              ?.references?.map((ref, index) => {
                return (
                  <div className="my-2" key={index}>
                    <Link href={ref.url} target="_blank">
                      <div className="flex flex-row min-h-20 bg-white rounded-md p-2 shadow-sm hover:shadow-md duration-100">
                        <div className="flex-1">
                          <h4 className="font-semibold">{ref.title}</h4>
                          <p className="text-sm w-auto">{ref.description}</p>
                        </div>
                        <div className="w-16 items-center m-auto">
                          <Image
                            width={36}
                            height={36}
                            src={linkIcon}
                            alt="link"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
