import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HighlightCardProps {
  section: string;
  goldenTitle: string;
  title: string;
  firstDescription: string;
  secondDescription?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: "default" | "highlighted";
}

export default function HighlightCard({
  section,
  goldenTitle,
  title,
  firstDescription,
  secondDescription,
  onButtonClick,
}: HighlightCardProps) {
  return (
    <div className={cn("flex w-full flex-col pb-20 pt-20 bg-transparent")}>
      <div className="flex flex-col items-center justify-center gap-3">
        <Pin className="size-7 text-main" />
        <h3 className="text-center text-lg font-bold my-5 text-main">
          {section}
        </h3>
      </div>

      <h4 className="my-3 text-right text-md font-medium text-black lg:text-base">
        <span className="font-[600] text-main">{goldenTitle}</span> {title}
      </h4>

      <p className="min-h-[100px] text-justify text-sm text-gray-500">
        {firstDescription}
      </p>

      {secondDescription && (
        <p className="mt-3 min-h-[100px] text-justify text-sm text-gray-500">
          {secondDescription}
        </p>
      )}

      <div className="flex justify-end w-full">
        <Link
          href={"#"}
          className="mt-5 text-left text-base font-[500] text-main hover:text-main/80 px-3 py-1 h-auto"
          onClick={onButtonClick}
        >
          المزيد
        </Link>
      </div>
    </div>
  );
}
