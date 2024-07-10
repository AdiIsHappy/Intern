// components/ButtonWithTooltip.js
import { useState } from "react";
import Image from "next/image";
import tootipIcon from "@/../public/tooltip.svg";

export function Info({ tooltipText }: { tooltipText: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`relative inline-block`}>
      <button
        className="rounded-full focus:outline-none w-4 h-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={tootipIcon} alt="tooltip" />
      </button>
      {hovered && (
        <div className="absolute w-48 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg">
          {tooltipText}
        </div>
      )}
    </div>
  );
}
