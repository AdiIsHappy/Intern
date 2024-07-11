// components/ButtonWithTooltip.js
import { useState } from "react";
import Image from "next/image";
import InfoIcon from "@/lib/icons/info";

export function Info({ tooltipText }: { tooltipText: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`relative inline-block w-4 h-4 `}>
      <button
        className="rounded-full focus:outline-none`"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <InfoIcon width={16} className="fill-gray-600" />
      </button>
      {hovered && (
        <div className="absolute w-48 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black opacity-75 text-white text-xs rounded-md shadow-lg">
          {tooltipText}
        </div>
      )}
    </div>
  );
}
