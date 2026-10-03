/** Year the constitutional court was founded */
const CONSTITUTIONAL_COURT_FOUNDING_YEAR = 1953;

/** Anniversary month (0-indexed): October — year count advances on 1 Oct */
const FOUNDING_ANNIVERSARY_MONTH = 9;

/** Current calendar year */
export const CURRENT_YEAR = new Date().getFullYear();

/**
 * Years since constitutional court founding.
 * Increments every 1 October (not 1 January).
 * e.g. 73 until 30 Sep 2026, then 74 from 1 Oct 2026.
 */
function getYearsSinceFounding(date = new Date()): number {
  const calendarYears = date.getFullYear() - CONSTITUTIONAL_COURT_FOUNDING_YEAR;
  const hasPassedAnniversary = date.getMonth() >= FOUNDING_ANNIVERSARY_MONTH;
  return calendarYears + (hasPassedAnniversary ? 1 : 0);
}

export const YEARS_SINCE_FOUNDING = getYearsSinceFounding();
