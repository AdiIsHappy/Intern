// components/CustomTextParser.tsx
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface LinkedTextProps {
  text: string;
  urls?: string[];
  className?: string;
}

const LinkedText: React.FC<LinkedTextProps> = ({ text, urls }) => {
  const [showingPopup, setShowingPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const hideTimeout = useRef<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (urls && urls.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      setPopupPosition({
        top: window.scrollY + rect.bottom + 2, // Adjusted for a small offset
        left: window.scrollX + rect.left + 50,
      });
      setShowingPopup(true);
    }
  };

  const handleMouseLeave = () => {
    if (urls && urls.length > 0) {
      hideTimeout.current = window.setTimeout(() => {
        setShowingPopup(false);
      }, 100); // Delay before hiding popup
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowingPopup(false);
    }
  };

  const handleScroll = () => {
    setShowingPopup(false);
  };

  const handlePopupMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    hideTimeout.current = window.setTimeout(() => {
      setShowingPopup(false);
    }, 1000);
  };

  useEffect(() => {
    if (showingPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showingPopup]);

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
        urls && urls.length > 0
          ? "cursor-pointer hover:underline hover:decoration-dotted"
          : ""
      } text-md my-2`}
      onMouseLeave={handleMouseLeave}
    >
      <span onClick={handleClick}>{parseText(text)}</span>
      {showingPopup && (
        <div
          ref={popupRef}
          className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-2 z-50"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <ul className="max-h-32 overflow-auto">
            {urls?.map((url, index) => (
              <li key={index} className="mb-1">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3954ef] hover:underline text-sm"
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
