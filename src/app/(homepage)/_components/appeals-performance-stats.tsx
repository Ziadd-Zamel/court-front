"use client";

import { ChartTooltip } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { BasicInfoByStatsRow } from "@/hooks/use-basic-info-by-stats";
import { Cell, Pie, PieChart } from "recharts";
import { useEffect, useMemo, useRef, useState } from "react";

// Pie slices + row dots: navy/gold/bronze aligned with --color-main; works on white and #121212.
const PIE_COLORS = ["#4a5d78", "#6b82a3", "#d1b882", "#a68968", "#7d726d"];

const PIE_ANIM_MS = 550;

// Smoothstep: interpolate slice % from previous targets to new ones (no “from zero” restart).
function useAnimatedPercentages(targets: number[]) {
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
    const from = displayRef.current;

    if (from.length !== next.length) {
      displayRef.current = next;
      setDisplay(next);
      return;
    }

    if (from.every((v, i) => v === next[i])) {
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const startValues = [...from];

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / PIE_ANIM_MS);
      const eased = t * t * (3 - 2 * t);
      const interpolated = next.map((target, i) => {
        const a = startValues[i] ?? target;
        return a + (target - a) * eased;
      });
      displayRef.current = interpolated;
      setDisplay(interpolated);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetsKey, targets]);

  return display;
}

// Skeleton mirrors loaded layout: bars column + pie only (no legend under chart).
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
};

export default function AppealsPerformanceStats({ rows, isLoading }: Props) {
  const targets = useMemo(
    () =>
      rows?.length
        ? rows.map((r) => Math.round(parseFloat(r.completion_rate)))
        : [],
    [rows],
  );

  const display = useAnimatedPercentages(targets);

  if (isLoading) {
    return <AppealsPerformanceStatsSkeleton />;
  }

  if (!rows?.length) {
    return null;
  }

  const chartData = rows.map((row, index) => ({
    name: row.className,
    value: Math.max(0, display[index] ?? 0),
    fill: PIE_COLORS[index % PIE_COLORS.length],
  }));

  // One row (e.g. filtered by classId): name + % + pie only — no progress bars.
  if (rows.length === 1) {
    const row = rows[0];
    const index = 0;
    const pct = Math.min(
      100,
      Math.max(0, Math.round(display[index] ?? 0)),
    );

    return (
      <div className="flex w-full flex-col items-center gap-10 pt-12">
        <h2 className="text-right font-zain text-2xl font-bold text-black dark:text-white sm:text-4xl lg:text-3xl">
          مؤشرات الأداء
        </h2>
        <div
          dir="rtl"
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="max-w-xl text-lg font-medium text-black dark:text-white">
            {row.className}
          </span>
          <span className="text-3xl font-bold tabular-nums text-main sm:text-4xl">
            {pct}%
          </span>
        </div>
        <div className="flex w-full max-w-lg flex-col items-center justify-center">
          <PieChart width={300} height={300} className="mx-auto">
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const v = payload[0].value;
                  const n = typeof v === "number" ? Math.round(v) : v;
                  return (
                    <div className="rounded-lg border border-border bg-white p-3 shadow-lg dark:bg-[#121212]">
                      <p className="text-right font-medium text-gray-900 dark:text-white">
                        {payload[0].name}
                      </p>
                      <p className="text-right text-sm text-gray-600 dark:text-gray-400">
                        {n}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={0}
              stroke="0"
              strokeWidth={0}
              isAnimationActive={false}
            >
              {chartData.map((entry, i) => (
                <Cell key={`cell-${rows[i].classId}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-10 pt-12 lg:flex-row-reverse">
      {/* Left: heading, % + dot + title per row, then progress (bar uses theme main). */}
      <div className="w-full space-y-8 lg:w-1/2">
        <h2 className="text-right font-zain text-2xl font-bold text-black dark:text-white sm:text-4xl lg:text-3xl">
          مؤشرات الأداء
        </h2>
        <div className="space-y-5">
          {rows.map((row, index) => {
            const pct = Math.min(
              100,
              Math.max(0, Math.round(display[index] ?? 0)),
            );
            const fill = PIE_COLORS[index % PIE_COLORS.length];
            return (
              <div key={row.classId} className="space-y-3">
                <div className="flex flex-row-reverse items-center justify-between gap-3 text-black dark:text-white">
                  <span className="shrink-0 text-[14px] font-bold text-main">
                    {pct}%
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 aspect-square rounded-full"
                      style={{ backgroundColor: fill }}
                      aria-hidden
                    />
                    <span className="text-sm font-medium">{row.className}</span>
                  </div>
                </div>
                <Progress
                  value={pct}
                  className="!important [&>div]:!border-b-none border-b-transparent h-2 rotate-180 border-t-2 bg-transparent [&>div]:!bg-main"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: pie — Recharts sector animation off; motion comes from interpolated values. */}
      <div className="flex w-full max-w-lg flex-col items-start justify-center -mt-7">
        <PieChart width={300} height={300} className="mr-10">
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload?.length) {
                const v = payload[0].value;
                const n = typeof v === "number" ? Math.round(v) : v;
                return (
                  <div className="rounded-lg border border-border bg-white p-3 shadow-lg dark:bg-[#121212]">
                    <p className="text-right font-medium text-gray-900 dark:text-white">
                      {payload[0].name}
                    </p>
                    <p className="text-right text-sm text-gray-600 dark:text-gray-400">
                      {n}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={0}
            stroke="0"
            strokeWidth={0}
            isAnimationActive={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${rows[index].classId}`}
                fill={entry.fill}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
