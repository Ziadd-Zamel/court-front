"use client";

import CustomPieChart, { PieSlice } from "@/components/custom/custom-pie-chart";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { BasicInfoByStatsRow } from "@/hooks/use-basic-info-by-stats";
import { useEffect, useMemo, useRef, useState } from "react";

const SLICE_COLORS = [
  "#FFD6D0",
  "#FFB3AB",
  "#FF8F86",
  "#FF6B61",
  "#F74746",
  "#D93030",
  "#B81E1E",
  "#930F0F",
];

const PROGRESS_ANIM_MS = 1400;
const PIE_ANIM_MS = 1000;
const PROGRESS_STAGGER_MS = 80;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatAnimatedPercent(value: number | undefined) {
  const n = value ?? 0;
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function useAnimatedPercentages(
  targets: number[],
  durationMs = PROGRESS_ANIM_MS,
  staggerMs = 0,
) {
  const targetsKey = targets.join(",");
  const displayRef = useRef<number[]>([]);
  const [display, setDisplay] = useState<number[]>([]);

  useEffect(() => {
    if (!targets.length) {
      displayRef.current = [];
      setDisplay([]);
      return;
    }

    const next = targets;
    let from = displayRef.current;

    if (from.length !== next.length) {
      if (from.length === 0) {
        from = next.map(() => 0);
        displayRef.current = from;
        setDisplay(from);
      } else {
        displayRef.current = next;
        setDisplay(next);
        return;
      }
    }

    if (from.every((v, i) => v === next[i])) return;

    let rafId = 0;
    const start = performance.now();
    const startValues = [...from];

    const tick = (now: number) => {
      const interpolated = next.map((target, i) => {
        const delay = i * staggerMs;
        const elapsed = Math.max(0, now - start - delay);
        const t = Math.min(1, elapsed / durationMs);
        const eased = easeOutCubic(t);
        const from = startValues[i] ?? target;
        return from + (target - from) * eased;
      });
      displayRef.current = interpolated;
      setDisplay(interpolated);

      const totalDuration = durationMs + staggerMs * Math.max(0, next.length - 1);
      if (now - start < totalDuration) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetsKey, targets, durationMs, staggerMs]);

  return display;
}

function AppealsPerformanceStatsSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-10 pt-12 lg:flex-row-reverse">
      <div className="w-full space-y-8 lg:w-1/2">
        <div className="flex justify-end">
          <Skeleton className="h-8 w-48 rounded-md sm:h-10 lg:h-9 lg:w-56" />
        </div>
        <div className="space-y-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div
                className="flex items-center justify-between gap-3"
                dir="rtl"
              >
                <Skeleton className="h-4 w-9 shrink-0" />
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Skeleton className="h-4 max-w-[min(100%,220px)] flex-1 rounded-md" />
                  <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-2 w-full rounded-none opacity-80" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-lg flex-col items-start justify-center -mt-7">
        <Skeleton className="mr-10 size-[300px] shrink-0 rounded-full" />
      </div>
    </div>
  );
}

type Props = {
  rows: BasicInfoByStatsRow[] | undefined;
  isLoading: boolean;
  text?: string;
  description?: string;
  useDecidedForPie?: boolean;
  showPie?: boolean;
};

export default function AppealsPerformanceStats({
  rows,
  isLoading,
  text = "مؤشرات الأداء",
  description = "تعبر المؤشرات عن نسبة القضايا المفصول فيها من إجمالي القضايا المعروضة خلال الشهر",
  useDecidedForPie = false,
  showPie,
}: Props) {
  const progressTargets = useMemo(
    () => (rows?.length ? rows.map((r) => parseFloat(r.completion_rate)) : []),
    [rows],
  );

  const pieTargets = useMemo(
    () =>
      rows?.length
        ? rows.map((r) =>
            parseFloat(
              useDecidedForPie
                ? (r.decided_percentage ?? "0")
                : r.completion_rate,
            ),
          )
        : [],
    [rows, useDecidedForPie],
  );

  const displayProgress = useAnimatedPercentages(
    progressTargets,
    PROGRESS_ANIM_MS,
    PROGRESS_STAGGER_MS,
  );
  const displayPie = useAnimatedPercentages(pieTargets, PIE_ANIM_MS);

  if (isLoading) return <AppealsPerformanceStatsSkeleton />;
  if (!rows?.length) return null;

  const hidePie = showPie === false;

  const pieSlices = rows.map((row, index) => ({
    id: row.classId,
    name: row.className,
    value: displayPie[index],
    color: row.color ?? undefined,
  }));

  return (
    <div
      className={`flex w-full flex-col items-center justify-between gap-10 pt-12 ${
        hidePie ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Progress bars */}
      <div
        className={`space-y-8 ${
          hidePie ? "w-full max-w-2xl mx-auto" : "w-full lg:w-1/2"
        }`}
      >
        <h2 className="text-right font-zain text-2xl font-bold text-black dark:text-white sm:text-4xl lg:text-3xl">
          {text}
        </h2>
        <div className="space-y-5">
          {rows.map((row, index) => {
            const pct = displayProgress[index] ?? 0;
            const fill = row.color ?? SLICE_COLORS[index % SLICE_COLORS.length];
            return (
              <div key={row.classId} className="space-y-3">
                <div className="flex flex-row-reverse items-center justify-between gap-3 text-black dark:text-white">
                  <span className="shrink-0 tabular-nums text-[14px] font-bold">
                    %{formatAnimatedPercent(pct)}
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-4 aspect-square rounded-full"
                      style={{ backgroundColor: fill }}
                      aria-hidden
                    />
                    <span className="text-sm font-medium">{row.className}</span>
                  </div>
                </div>
                <Progress
                  value={pct}
                  className="h-2 rotate-180 border-b-transparent border-t-2 bg-transparent [&>div]:!border-b-none [&>div]:!bg-main [&>div]:!transition-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pie chart */}
      {!hidePie && (
        <div className="flex w-full max-w-lg flex-col items-center -mt-7">
          <div className="mr-10 shrink-0">
            <CustomPieChart
              slices={pieSlices as unknown as PieSlice[]}
              size={400}
            />
          </div>
          <p className="mr-10 mt-4 text-center self-start text-sm leading-relaxed text-black dark:text-white">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
