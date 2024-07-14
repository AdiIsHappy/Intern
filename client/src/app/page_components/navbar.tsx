/* eslint-disable no-unused-vars */
// Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Arrow } from "@/lib/constants/icons/down_arrow";
import Image from "next/image";
import Avatar from "@/components/avatar";

export interface NavbarProps {
  name?: string;
  username?: string;
  profilePic?: string;
  teamMembers?: { name: string; username: string; avatarUrl: string }[];
  onUserSelect: (user: string) => void;
  className?: string;
  activeUser?: string | null;
}

export function Navbar(props: NavbarProps) {
  const {
    name,
    profilePic,
    username,
    teamMembers,
    onUserSelect,
    className,
    activeUser,
  } = props;
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

  return (
    <div className={`w-full ${className}`}>
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
            <Avatar
              alt=""
              height={40}
              name={name}
              src={profilePic || ""}
              width={40}
            />
          </button>
        ) : (
          <Skeleton height={40} width={40} />
        )}
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-8 top-14 z-10 bg-white rounded-lg shadow-lg border-2 border-gray-200 min-w-64"
        >
          <UserMenu
            name={name}
            username={username}
            teamMembers={teamMembers}
            onUserSelect={onUserSelect}
            profilePic={profilePic}
            activeUser={activeUser}
          />
        </div>
      )}
    </div>
  );
}

function UserMenu({
  name,
  username,
  teamMembers,
  onUserSelect,
  profilePic,
  activeUser,
}: {
  name?: string;
  username?: string;
  teamMembers?: { name: string; username: string; avatarUrl: string }[];
  profilePic?: string;
  onUserSelect: (user: string) => void;
  activeUser?: string | null;
}) {
  const [teamDropdownOpen, setTeamDropdownOpen] = useState<boolean>(false);

  const toggleTeamDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTeamDropdownOpen((prev) => !prev);
  };

  return (
    <div className="px-4 py-3 text-sm text-gray-900 divide-y divide-gray-200">
      <div className="mb-2 flex items-center justify-start">
        <Avatar
          alt=""
          height={40}
          name={name || ""}
          width={40}
          src={profilePic || ""}
        />
        <div className="ml-2">
          <div className="text-lg font-medium">{name}</div>
          <div className="truncate text-sm">@{username}</div>
        </div>
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
            <ul className="mt-2 text-sm text-gray-700">
              {teamMembers &&
                teamMembers.map((member) => (
                  <li
                    key={member.username}
                    className={`block px-4 py-2 w-full ${
                      activeUser && activeUser === member.username
                        ? "bg-green-100 hover:bg-green-200"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => onUserSelect(member.username)}
                      className="flex w-full text-nowrap items-center"
                    >
                      <Avatar
                        alt=""
                        height={24}
                        name={member.name}
                        width={24}
                        src={member.avatarUrl}
                      />
                      <span className="ml-2">{member.name}</span>
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

export default Navbar;
