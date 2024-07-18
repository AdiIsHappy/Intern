import React, { ReactNode } from "react";

interface SectionContainerProps {
  title: string;
  className?: string;
  children?: ReactNode; // Making children optional
  childClassName?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  className = "",
  childClassName = "",
  children,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg  ${className}`}>
      <div className="px-4 py-3 border-b border-[#b8c1f3]">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
      </div>
      {children && <div className={`p-4 ${childClassName}`}>{children}</div>}
    </div>
  );
};

export default SectionContainer;
