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
    <div className="rounded-sm">
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={handleImageError} // Handle image load error
        />
      ) : (
        <div
          style={{ width: `${width}px`, height: `${height}px` }}
          className={`rounded-sm flex items-center justify-center font-semibold ${
            width > 36 ? "text-2xl" : width > 28 ? "text-xl" : "text-md"
          } text-white bg-purple-500`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
