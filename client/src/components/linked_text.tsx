// components/CustomTextParser.tsx
import Link from "next/link";
import React, { useState, useRef } from "react";

interface LinkedTextProps {
  text: string;
  urls?: string[];
  className?: string;
}

const LinkedText: React.FC<LinkedTextProps> = ({ text, urls, className }) => {
  const [hovering, setHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const hideTimeout = useRef<number | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (urls && urls.length > 0) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
      const rect = event.currentTarget.getBoundingClientRect();
      setHoverPosition({
        top: window.scrollY + rect.bottom + 2, // Adjusted for a small offset
        left: window.scrollX + rect.left + 50,
      });
      setHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (urls && urls.length > 0) {
      hideTimeout.current = window.setTimeout(() => {
        setHovering(false);
      }, 100); // Delay before hiding popup
    }
  };

  const handlePopupMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    setHovering(false);
  };

  const parseText = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const segments = text.split(regex);

    return segments.map((segment, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-bold">
          {segment}
        </strong>
      ) : (
        <span key={index}>{segment}</span>
      )
    );
  };

  return (
    <span
      className={`${
        urls && urls.length > 0 ? "hover:underline hover:decoration-dotted" : ""
      } text-md my-2`}
      onMouseLeave={handleMouseLeave}
    >
      <span onMouseEnter={handleMouseEnter}>{parseText(text)}</span>
      {hovering && (
        <div
          className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-2 z-50"
          style={{
            top: `${hoverPosition.top}px`,
            left: `${hoverPosition.left}px`,
          }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <ul>
            {urls?.map((url, index) => (
              <li key={index} className="mb-1">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};

export default LinkedText;
