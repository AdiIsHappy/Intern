import { Reference } from "@/lib/types/core.types";
import Link from "next/link";
import Image from "next/image";
import icon from "@/../public/link.svg";

export interface ReferenceCardProp {
  reference: Reference;
}

export function ReferenceCard({ reference }: ReferenceCardProp) {
  return (
    <div className="bg-white border-2 px-2 py-3 rounded-md shadow-sm hover:shadow-xl hover:border-2 hover:border-[#d4daf4] h-full mx-1 duration-300">
      <Link target="_blank" href={reference.url}>
        <div className="flex flex-row w-full justify-between mb-1 max-h-12 overflow-hidden">
          <p className="font-semibold text-lg leading-6 h-12 overflow-ellipsis text-wrap">
            {reference.title}
          </p>
        </div>
        <p className="text-sm "> {reference.description}</p>
      </Link>
    </div>
  );
}
