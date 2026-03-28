export type PerformanceMetricsCategory = {
  id: number;
  name: string;
};

// Server-side fetch (used from Server Components). Same upstream URL as inquiry UI.
export async function getPerformanceMetricsCategory(): Promise<
  PerformanceMetricsCategory[]
> {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  const response = await fetch(
    "https://inquiry.alolya.gov.ly/index-api.php?r=api/categories/get-data",
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!Array.isArray(payload)) {
    return [];
  }

  return payload as PerformanceMetricsCategory[];
}
