import { Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  buttonText = "اقرأ المزيد",
  onButtonClick,
}: HighlightCardProps) {
  return (
    <div className={cn("flex w-full flex-col pb-20 pt-20 bg-transparent")}>
      <div className="flex flex-col items-center justify-center gap-3">
        <Pin className="size-7 text-main" />
        <h3 className="text-center text-xl font-[700] text-main">{section}</h3>
      </div>

      <h4
        className="my-3 text-right text-md font-[500] text-black lg:text-xl"
        style={{ direction: "rtl" }}
      >
        <span className="font-[600] text-main">{goldenTitle}</span> {title}
      </h4>

      <p
        style={{ direction: "rtl" }}
        className="min-h-[100px] text-justify text-md text-gray-500"
      >
        {firstDescription}
      </p>

      {secondDescription && (
        <p
          style={{ direction: "rtl" }}
          className="mt-3 min-h-[100px] text-justify text-md text-gray-500"
        >
          {secondDescription}
        </p>
      )}

      <Button
        variant="ghost"
        className="mt-5 text-left text-sm font-[500] text-main hover:text-main/80 p-0 h-auto"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
