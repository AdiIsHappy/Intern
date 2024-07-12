// components/ButtonWithTooltip.js
import { useState } from "react";
import Image from "next/image";
import InfoIcon from "@/lib/constants/icons/info";

export function Info({ tooltipText }: { tooltipText: string }) {
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
