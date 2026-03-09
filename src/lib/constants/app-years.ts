/** Year the constitutional court was founded */
const CONSTITUTIONAL_COURT_FOUNDING_YEAR = 1953;

/** Current year - updates automatically */
export const CURRENT_YEAR = new Date().getFullYear();

/** Years since constitutional court founding (e.g. 73 for 2026) */
export const YEARS_SINCE_FOUNDING =
  CURRENT_YEAR - CONSTITUTIONAL_COURT_FOUNDING_YEAR;
