"use client";

import { TimePeriod, userReport } from "@/lib/types/core.types";
import "../../lib/constants/chart_registration";
import { PositiveSkills } from "./positive_skills";
import { NegativeSkills } from "./negative_skills";
import { OtherComparisions } from "./other_comparisions";
import { generateSummary } from "@/lib/utils/generate_summary";
import useWindowSize from "@/lib/hooks/use_windows_size";
import Skeleton from "react-loading-skeleton";
import SectionContainer from "@/components/section";
import { Quality } from "./merge_request_assesment";
import LinkedText from "@/components/linked_text";

export interface ReportProps {
  data: userReport;
  period: TimePeriod;
}

export function Report({ data, period }: ReportProps) {
  const summary = data ? generateSummary(data) : [];
  useWindowSize();

  return (
    <div className="px-24 w-full items-center scroll-auto flex flex-col pb-16">
      <div className="my-1 w-full bg-white p-2 rounded-lg flex flex-row justify-evenly">
        <span>
          <strong>Name:</strong>
          {``}{" "}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row w-full my-1">
        <SectionContainer title="Summary" className="flex-1 mr-1">
          <ol className="list-decimal list-inside">
            {summary.map((element, index) => (
              <li className="list-item text-md m-2" key={index}>
                <LinkedText text={element} />
              </li>
            ))}
          </ol>
        </SectionContainer>
        <SectionContainer title="Insights" className="flex-1 mx-1">
          <ol className="p-2 list-decimal list-inside">
            {data.insights.map((element, index) => (
              <li className="list-item text-md m-2" key={index}>
                <LinkedText text={element.text} urls={element.ids} />
              </li>
            ))}
          </ol>
        </SectionContainer>
        <SectionContainer title="Focus Area" className="flex-1 ml-1">
          <ol className="p-2 list-decimal list-inside">
            {data.actions.map((element, index) => (
              <li className="list-item text-md m-2" key={index}>
                <LinkedText
                  text={element.text}
                  urls={element.references.map((ref) => ref.url)}
                />
              </li>
            ))}
          </ol>
        </SectionContainer>
      </div>
      <div className="flex flex-row w-full my-1">
        <SectionContainer title="Positive Skills" className="flex-1 mr-1">
          <PositiveSkills period={period} data={data} />
        </SectionContainer>
        <SectionContainer title="Negative Skills" className="flex-1 ml-1">
          <NegativeSkills period={period} data={data} />
        </SectionContainer>
      </div>
      <SectionContainer
        title="Merge Requests Assessment"
        className="w-full my-1"
      >
        <Quality period={period} data={data} />
      </SectionContainer>
      <SectionContainer title="Other Comparisions" className="w-full my-1">
        <OtherComparisions period={period} data={data} />
      </SectionContainer>
    </div>
  );
}
