// BookCardSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";

type BookCardSkeletonProps = {
  hideIcons?: boolean;
};

export default function BookCardSkeleton({ hideIcons }: BookCardSkeletonProps) {
  return (
    <div className="w-[130px] sm:w-[160px]">
      {/* Book Image Skeleton */}
      <Skeleton className="h-40 sm:h-52 w-full mb-2 rounded" />

      {!hideIcons && (
        <div className="flex justify-start gap-1">
          {/* Icon Skeletons */}
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      )}
    </div>
  );
}

// BookCardSkeletonGrid.jsx - For multiple skeletons
type BookCardSkeletonGridProps = {
  count?: number;
  hideIcons?: boolean;
};

export function BookCardSkeletonGrid({
  count = 10,
  hideIcons,
}: BookCardSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 p-6">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} hideIcons={hideIcons} />
      ))}
    </div>
  );
}
