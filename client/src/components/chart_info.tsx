import React, { ReactNode } from "react";
import { Info } from "./info";
import InfoIcon from "@/lib/constants/icons/info";

interface ChartInfoProps {
  children?: ReactNode;
  tooltipText: string;
  infoText: string;
  className?: string;
}

const ChartInfo: React.FC<ChartInfoProps> = ({
  children,
  tooltipText,
  infoText,
  className = "",
}) => {
  return (
    <div className={`w-full relative min-h-96 p-2 my-4 ${className}`}>
      {tooltipText ? (
        <div className="absolute top-0 right-0 m-2">
          <Info tooltipText={tooltipText} />
        </div>
      ) : null}
      <div className="w-full">{children}</div>
      {infoText ? (
        <div className="flex  mt-4 text-sm items-center w-full px-8 py-2 bg-yellow-100 rounded-md text-yellow-600">
          <InfoIcon className="w-4 h-4 mr-4" />
          {infoText}
        </div>
      ) : null}
    </div>
  );
};

export default ChartInfo;
