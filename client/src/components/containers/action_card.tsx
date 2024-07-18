import { Reference } from "@/lib/types/core.types";
import Link from "next/link";

export interface ActionCardProps {
  text: string;
  references: Reference[];
}

export function ActionCard({ text, references }: ActionCardProps) {
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
    <div className="bg-white border-2 px-2 py-1 rounded-md shadow-md hover:shadow-xl">
      <span className="text-sm">{parseText(text)}</span>
      {references.length && (
        <p className="text-sm font-semibold mt-2">References:</p>
      )}
      {references.map((ref, index) => (
        <div key={index} className="ml-4 text-sm text-[#4f66e9]">
          <Link target="_blank" href={ref.url}>
            {parseText(ref.description)}
          </Link>
        </div>
      ))}
    </div>
  );
}
