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

export interface ReportProps {
  data: userReport | null;
  period: TimePeriod;
}

export function Report({ data, period }: ReportProps) {
  const summary = data ? generateSummary(data) : [];

  useWindowSize();

  return (
    <div className=" flex flex-col px-8 w-full max-w-9xl items-center text-justify">
      <div className="flex flex-col lg:flex-row w-full">
        {data ? (
          <SectionContainer title="Summary" className="flex-1">
            <ol className="p-2">
              {summary.map((element, index) => (
                <li className="list-item" key={index}>
                  {element}
                </li>
              ))}
            </ol>
          </SectionContainer>
        ) : (
          <div className="flex-1 mx-4">
            <Skeleton height={20} width={200} />
            <Skeleton containerClassName="w-full h-full" height={200} />
          </div>
        )}
        {data ? (
          <SectionContainer title="Insights" className="flex-1">
            <h3 className="font-semibold text-lg">Insights</h3>
            <ol className="list-decimal list-inside p-2">
              {data.summary.map((element, index) => (
                <li className="list-item" key={index}>
                  {element}
                </li>
              ))}
            </ol>
          </SectionContainer>
        ) : (
          <div className="flex-1 mx-4">
            <Skeleton height={20} width={200} />
            <Skeleton containerClassName="w-full h-full" height={200} />
          </div>
        )}
        {data ? (
          <SectionContainer
            title="Focus Area"
            className="flex-1"
          ></SectionContainer>
        ) : (
          <div className="flex-1 mx-4">
            <Skeleton height={20} width={200} />
            <Skeleton containerClassName="w-full h-full" height={200} />
          </div>
        )}
      </div>
      <SectionContainer title="Positive Skills" className="w-full">
        {data ? (
          data.positiveSkills ? (
            <PositiveSkills period={period} data={data} />
          ) : (
            <div>
              Positive Skills not available please regenerate the report.
            </div>
          )
        ) : (
          <div className="h-50 w-full my-4 px-4">
            <Skeleton containerClassName="w-full h-full" height={200} />
          </div>
        )}
      </SectionContainer>

      {data ? (
        data.negativeSkills ? (
          <NegativeSkills period={period} data={data} />
        ) : (
          <div>Negative Skills not available please regenerate the report.</div>
        )
      ) : (
        <div className="h-50 w-full flex ">
          <Skeleton
            containerClassName="w-full h-full flex-1 mx-4"
            height={200}
          />
          <Skeleton
            containerClassName="w-full h-full md:w-0 md:h-0 flex-1 mx-4"
            height={200}
          />
        </div>
      )}
      <OtherComparisions period={period} data={data} />
    </div>
  );
}
