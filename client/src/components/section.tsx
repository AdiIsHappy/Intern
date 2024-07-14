import React, { ReactNode } from "react";

interface SectionContainerProps {
  title: string;
  className?: string;
  children?: ReactNode; // Making children optional
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
      </div>
      {children && <div className="p-4">{children}</div>}
    </div>
  );
};

export default SectionContainer;
