import { PERFORMANCE_DATA_YEAR_KEYS } from "./data-year-keys";

export type CalendarPoint = { year: number; month: number };

/**
 * Day of month when the performance timeline advances to the new month.
 * Until then, keep showing the previous month's window (e.g. Sep until 7 Oct).
 */
const MONTH_ROLLOVER_DAY = 7;

/**
 * Effective "today" for the rolling window.
 * Before the 7th, treat the date as still in the previous calendar month.
 */
export function getPerformanceMetricsAnchor(date: Date = new Date()): Date {
  if (date.getDate() < MONTH_ROLLOVER_DAY) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getRollingFiveMonths(
  anchor: Date = new Date(),
): CalendarPoint[] {
  const effective = getPerformanceMetricsAnchor(anchor);
  const out: CalendarPoint[] = [];
  for (let back = 5; back >= 1; back--) {
    const d = new Date(effective.getFullYear(), effective.getMonth() - back, 1);
    out.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }
  return out;
}

export function findSlotIndex(
  window: CalendarPoint[],
  year: number,
  month: number,
): number {
  return window.findIndex((s) => s.year === year && s.month === month);
}

export function resolveSlotIndex(
  window: CalendarPoint[],
  year: number | null | undefined,
  month: number | null | undefined,
): number {
  if (year != null && month != null) {
    const idx = findSlotIndex(window, year, month);
    if (idx >= 0) return idx;
  }
  return window.length - 1;
}

export function slotIndexToStatsYear(slotIndex: number): number {
  const i = Math.max(0, Math.min(4, slotIndex));
  return PERFORMANCE_DATA_YEAR_KEYS[i];
}

export function formatMonthLabel(year: number, month: number): string {
  const d = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat("ar", {
    month: "long",
    year: "numeric",
  }).format(d);
}
