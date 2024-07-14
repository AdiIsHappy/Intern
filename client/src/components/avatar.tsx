import { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, width, height, name }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const initials = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div className="rounded-md ">
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          onError={handleImageError} // Handle image load error
        />
      ) : (
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center font-semibold text-2xl text-white bg-blue-500`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
