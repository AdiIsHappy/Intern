// Avatar.tsx
import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Profile Pic"
        width={40}
        height={40}
        className="rounded-md"
      />
    );
  } else {
    const initials = name ? name.charAt(0).toUpperCase() : "";

    return (
      <div className="w-10 h-10 rounded-md flex items-center justify-center font-semibold text-2xl text-white bg-blue-500">
        {initials}
      </div>
    );
  }
};

export default Avatar;
