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

export interface ReportProps {
  data: userReport | null;
  period: TimePeriod;
}

export function Report({ data, period }: ReportProps) {
  const summary = data ? generateSummary(data) : [];

  useWindowSize();

  return (
    <div className=" flex flex-col px-24 w-full items-center text-justify">
      <div className="w-full bg-white p-2 rounded-lg flex flex-row justify-evenly">
        <span>
          <strong>Name:</strong>
          {``}{" "}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        {data ? (
          <SectionContainer title="Summary" className="flex-1">
            <ol className="p-2 list-decimal list-inside">
              {summary.map((element, index) => (
                <li className="list-item text-md my-2" key={index}>
                  {element.split("\n").map((text, index) => {
                    const boldText = text.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    );
                    return (
                      <span
                        key={index}
                        dangerouslySetInnerHTML={{ __html: boldText }}
                      />
                    );
                  })}
                </li>
              ))}
            </ol>
          </SectionContainer>
        ) : (
          <div className="flex-1 mx-4">
            <Skeleton height={50} className="w-full" />
            <Skeleton containerClassName="w-full h-full" height={400} />
          </div>
        )}
        {data ? (
          <SectionContainer title="Insights" className="flex-1">
            <ol className="p-2 list-decimal list-inside">
              {data.insights.map((element, index) => (
                <li className="list-item text-md my-2" key={index}>
                  {element.text.split("\n").map((text, index) => {
                    const boldText = text.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    );
                    return (
                      <span
                        key={index}
                        dangerouslySetInnerHTML={{ __html: boldText }}
                      />
                    );
                  })}
                </li>
              ))}
            </ol>
          </SectionContainer>
        ) : (
          <div className="flex-1 mx-4">
            <Skeleton height={50} className="w-full" />
            <Skeleton containerClassName="w-full h-full" height={400} />
          </div>
        )}
        {data ? (
          <SectionContainer title="Focus Area" className="flex-1">
            <ol className="p-2 list-decimal list-inside">
              {data.actions.map((element, index) => (
                <li className="list-item text-md my-2" key={index}>
                  {element.text.split("\n").map((text, index) => {
                    const boldText = text.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    );
                    return (
                      <span
                        key={index}
                        dangerouslySetInnerHTML={{ __html: boldText }}
                      />
                    );
                  })}
                </li>
              ))}
            </ol>
          </SectionContainer>
        ) : (
          <div className="flex-1 mx-4">
            <Skeleton height={50} className="w-full" />
            <Skeleton containerClassName="w-full h-full" height={400} />
          </div>
        )}
      </div>
      <div className="flex flex-row w-full">
        {data ? (
          <SectionContainer title="Positive Skills" className="flex-1">
            {data.positiveSkills ? (
              <PositiveSkills period={period} data={data} />
            ) : (
              <div>
                Positive Skills not available please regenerate the report.
              </div>
            )}
          </SectionContainer>
        ) : (
          <div className="w-full m-2">
            <Skeleton height={50} className="w-full" />
            <Skeleton containerClassName="w-full h-full" height={600} />
          </div>
        )}
        {data ? (
          <SectionContainer title="Negative Skills" className="flex-1">
            {<data value="" className="neg"></data> ? (
              <NegativeSkills period={period} data={data} />
            ) : (
              <div>
                Negative Skills not available please regenerate the report.
              </div>
            )}
          </SectionContainer>
        ) : (
          <div className="w-full m-2">
            <Skeleton height={50} className="w-full" />
            <Skeleton containerClassName="w-full h-full" height={600} />
          </div>
        )}
      </div>
      {data ? (
        <SectionContainer title="Merge Requests Assessment" className="w-full">
          {<data value="" className="neg"></data> ? (
            <Quality period={period} data={data} />
          ) : (
            <div>Quality comparision not available.</div>
          )}
        </SectionContainer>
      ) : (
        <div className="w-full m-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={600} />
        </div>
      )}
      {data ? (
        <SectionContainer title="Other Comparisions" className="w-full">
          {<data value="" className="neg"></data> ? (
            <OtherComparisions period={period} data={data} />
          ) : (
            <div>Other comparision not available.</div>
          )}
        </SectionContainer>
      ) : (
        <div className="w-full m-2">
          <Skeleton height={50} className="w-full" />
          <Skeleton containerClassName="w-full h-full" height={600} />
        </div>
      )}
    </div>
  );
}
