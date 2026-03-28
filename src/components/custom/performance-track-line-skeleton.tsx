import { Skeleton } from "@/components/ui/skeleton";

type PerformanceTrackLineSkeletonProps = {
  className?: string;
};

/** Same structure as `PerformanceTrackLine` — arrows, track + fill, five nodes + labels. */
export default function PerformanceTrackLineSkeleton({
  className = "relative mt-[130px] px-16",
}: PerformanceTrackLineSkeletonProps) {
  return (
    <div className={className}>
      <div
        style={{ direction: "rtl" }}
        className="relative flex items-center justify-between"
      >
        <Skeleton className="absolute -left-8 z-10 size-5 rounded-md sm:size-6" />

        <div
          style={{ direction: "rtl" }}
          className="h-[2px] w-full rounded-sm bg-[#e4e4e4] dark:bg-white/20 sm:h-[4px]"
        >
          <Skeleton className="h-full w-[40%] rounded-none opacity-70" />
        </div>

        <div
          style={{ direction: "rtl" }}
          className="absolute flex w-full justify-between"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="group relative w-fit"
            >
              <Skeleton className="mx-auto size-1 rounded-full ring-4 ring-[#e4e4e4] dark:ring-white/20 sm:size-2 sm:ring-8" />
              <Skeleton className="absolute bottom-5 left-1/2 h-3 w-[50px] -translate-x-1/2 sm:h-3.5 sm:w-[120px]" />
            </div>
          ))}
        </div>

        <Skeleton className="absolute -right-8 z-10 size-5 rounded-md sm:size-6" />
      </div>
    </div>
  );
}
