import React, { ReactNode, useState } from "react";
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
      <div className="w-full min-h-96">{children}</div>
      {infoText ? (
        <div className="flex  mt-4 text-sm items-center w-full px-8 py-2 bg-yellow-100 rounded-md text-yellow-600">
          <InfoIcon width={16} height={16} className="mr-4" />
          <span className="flex-1">{infoText}</span>
        </div>
      ) : null}
    </div>
  );
};

function Info({ tooltipText }: { tooltipText: string }) {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);
  const handleClick = () => setVisible(!visible);
  const handleBlur = () => setVisible(false);

  return (
    <div className="relative inline-block w-4 h-4">
      <button
        className="rounded-full focus:outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        <InfoIcon width={16} className="fill-gray-600" />
      </button>
      {visible && (
        <div className="absolute w-56 bottom-full left-1/2 transform -translate-x-full mb-2 px-2 py-1 bg-black opacity-90 text-white text-xs rounded-md shadow-lg text-start">
          {tooltipText.split("\n").map((text, index) => {
            const boldText = text.replace(
              /\*\*(.*?)\*\*/g,
              "<strong>$1</strong>"
            );
            return (
              <p key={index} dangerouslySetInnerHTML={{ __html: boldText }} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChartInfo;
