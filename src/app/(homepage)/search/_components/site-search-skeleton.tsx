"use client";

import { Skeleton } from "@/components/ui/skeleton";
import BookCardSkeleton from "@/components/common/book-card-skeleton";
import type { SiteSearchScope } from "@/lib/constants/site-search";

function ResultCountSkeleton() {
  return (
    <div className="mb-10 flex justify-end" dir="rtl">
      <Skeleton className="h-7 w-40 rounded" />
    </div>
  );
}

function RulingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-4" dir="rtl">
      <ResultCountSkeleton />
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-3 pt-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="size-8 shrink-0 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BooksSkeleton({ magazine = false }: { magazine?: boolean }) {
  return (
    <div>
      <ResultCountSkeleton />
      <div className="flex w-full justify-center">
        <div className="grid grid-cols-2 gap-5 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-[1150px]:grid-cols-4! min-[1300px]:grid-cols-5! min-[1700px]:grid-cols-6!">
          {Array.from({ length: magazine ? 8 : 10 }).map((_, index) => (
            <BookCardSkeleton key={index} hideIcons={magazine} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LawsSkeleton() {
  return (
    <div className="mx-auto max-w-5xl" dir="rtl">
      <ResultCountSkeleton />
      <div className="w-full space-y-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-start gap-4 border-b border-main/40 py-5 md:flex-row md:items-center"
          >
            <Skeleton className="h-4 flex-1 rounded" />
            <div className="flex gap-3">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="size-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CounselorsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl" dir="rtl">
      <ResultCountSkeleton />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-100 bg-white shadow-xl dark:border-white/10 dark:bg-white/10"
          >
            <div className="flex flex-col items-center gap-3 p-6 pb-4">
              <Skeleton className="size-18 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="mx-6 h-px bg-gray-100 dark:bg-white/10" />
            <div className="space-y-3 px-6 py-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-3 w-44" />
            </div>
            <div className="mx-6 h-px bg-gray-200 dark:bg-white/20" />
            <div className="px-6 py-4">
              <Skeleton className="mx-auto h-3 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SiteSearchSkeleton({
  scope,
}: {
  scope?: SiteSearchScope | null;
}) {
  if (scope === "books") return <BooksSkeleton />;
  if (scope === "publications") return <BooksSkeleton magazine />;
  if (scope === "laws") return <LawsSkeleton />;
  if (scope === "counselors") return <CounselorsSkeleton />;

  // cassation | constitutional | research (rulings)
  return <RulingSkeleton />;
}
