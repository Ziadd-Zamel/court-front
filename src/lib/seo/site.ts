export const SITE_NAME = "المحكمة العليا الليبية";

export const SITE_DESCRIPTION =
  "الموقع الرسمي للمحكمة العليا الليبية — بوابة المتقاضين، المبادئ القانونية، الدائرة الدستورية، مكتبة المحكمة، والمكتب الفني.";

export const SITE_KEYWORDS = [
  "المحكمة العليا",
  "ليبيا",
  "القضاء",
  "المبادئ القانونية",
  "الدائرة الدستورية",
  "قضاء النقض",
  "طرابلس",
  "المحكمة العليا الليبية",
  "alolya",
];

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alolya.gov.ly"
).replace(/\/$/, "");
