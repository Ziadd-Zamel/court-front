import { PERFORMANCE_DATA_YEAR_KEYS } from "./data-year-keys";

export type CalendarPoint = { year: number; month: number };

export function getRollingFiveMonths(anchor: Date = new Date()): CalendarPoint[] {
  const out: CalendarPoint[] = [];
  for (let back = 4; back >= 0; back--) {
    const d = new Date(anchor.getFullYear(), anchor.getMonth() - back, 1);
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
  // No (valid) URL: default to the month before current, not the latest slot.
  if (window.length >= 2) {
    return window.length - 2;
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
