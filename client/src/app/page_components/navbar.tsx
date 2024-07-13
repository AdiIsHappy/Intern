/* eslint-disable no-unused-vars */
// Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Arrow } from "@/lib/constants/icons/down_arrow";
import Image from "next/image";

export interface NavbarProps {
  name?: string;
  email?: string;
  profilePic?: string;
  teamMembers?: { name: string; username: string }[];
  onUserSelect: (user: string) => void;
}
export function Navbar(props: NavbarProps) {
  const { name, profilePic, email, teamMembers, onUserSelect } = props;

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const renderAvatar = () => {
    if (profilePic) {
      return (
        <Image
          src={profilePic}
          alt="Profile Pic"
          width={40}
          height={40}
          className="rounded-md"
        />
      );
    } else {
      const initials = name ? name.charAt(0).toUpperCase() : "";

      return (
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center font-semibold text-2xl text-white bg-blue-500`}
        >
          {initials}
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full bg-gray-100 justify-between flex max-w-9xl px-8 py-1 items-center">
        {name ? (
          <p className="font-medium text-xl text-gray-900">{name}</p>
        ) : (
          <Skeleton height={20} width={80} />
        )}
        {name ? (
          <button
            onClick={toggleDropdown}
            ref={buttonRef}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {renderAvatar()}
          </button>
        ) : (
          <Skeleton height={40} width={40} />
        )}
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-8 top-[100px] z-10 bg-white rounded-lg shadow-lg border-2 border-gray-200 w-56"
        >
          <UserMenu
            name={name}
            email={email}
            teamMembers={teamMembers}
            onUserSelect={onUserSelect}
          />
        </div>
      )}
    </>
  );
}

function UserMenu({
  name,
  email,
  teamMembers,
  onUserSelect,
}: {
  name?: string;
  email?: string;
  teamMembers?: { name: string; username: string }[];
  onUserSelect: (user: string) => void;
}) {
  const [teamDropdownOpen, setTeamDropdownOpen] = useState<boolean>(false);

  const toggleTeamDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTeamDropdownOpen((prev) => !prev);
  };

  return (
    <div className="px-4 py-3 text-sm text-gray-900 divide-y divide-gray-200">
      <div className="mb-1">
        <div>{name}</div>
        <div className="font-medium truncate">{email}</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownInformationButton"
      >
        <li>
          <button
            onClick={toggleTeamDropdown}
            className="w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
          >
            My team
            <Arrow open={teamDropdownOpen} />
          </button>
          {teamDropdownOpen && (
            <ul className="ml-4 mt-2 text-sm text-gray-700">
              {teamMembers &&
                teamMembers.map((member) => (
                  <li
                    key={member.username}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    <button onClick={() => onUserSelect(member.username)}>
                      {member.name}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
      <div className="py-2">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sign out
        </a>
      </div>
    </div>
  );
}
