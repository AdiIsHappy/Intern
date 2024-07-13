/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Arrow } from "@/lib/constants/icons/down_arrow"; // Assuming Arrow component is correctly implemented

export default function Dropdown({
  className = "",
  options,
  onChange = (value: string) => {},
  defaultValue,
  label,
}: {
  className?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  defaultValue: string;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string, label: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-[8px] text-gray-500 uppercase absolute left-2 top-1">
          {label}
        </label>
      )}
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-black bg-white border-gray-300 border-2 focus:ring-2 hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 pt-3 min-w-48 text-center justify-between inline-flex items-center"
        type="button"
      >
        {options.find((option) => option.value === selectedValue)?.label}
        <Arrow open={isOpen} />
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 min-w-48  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2"
        >
          <ul
            className="py-2 text-sm text-gray-700  "
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionClick(option.value, option.label)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
