"use client";

import { parseAsInteger, useQueryStates } from "nuqs";

/** URL search params only: `?month=` (1–12) and `year=` (full year). Nothing else. */
export function useMonthYearParams() {
  return useQueryStates({
    month: parseAsInteger,
    year: parseAsInteger,
  });
}
