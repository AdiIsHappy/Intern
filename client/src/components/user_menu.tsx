// UserMenu.tsx
import React, { useState } from "react";
import Dropdown from "./dropdown";

interface UserMenuProps {
  name?: string;
  email?: string;
  teamMembers?: { name: string; username: string }[];
  onUserSelect: (user: string) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name,
  email,
  teamMembers,
  onUserSelect,
}) => {
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);

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
          <Dropdown
            label="My Team"
            options={
              teamMembers?.map((member) => ({
                value: member.username,
                label: member.name,
              })) || []
            }
            defaultValue={teamMembers?.[0]?.username || ""}
            onChange={(value) => onUserSelect(value)}
            className="w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
          />
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
};

export default UserMenu;
