import { NextRequest, NextResponse } from "next/server";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const UPSTREAM_BASE = "https://inquiry.alolya.gov.ly/index-api.php";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const classId = searchParams.get("classId");

  if (!month || !year) {
    return NextResponse.json(
      { error: "Missing month or year" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    r: "api/basic-info/by-class",
    month,
    year,
  });
  if (classId) {
    params.set("classId", classId);
  }

  const apiUrl = `${UPSTREAM_BASE}?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream HTTP ${response.status}` },
        { status: response.status },
      );
    }

    const data: unknown = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch basic info by class" },
      { status: 500 },
    );
  }
}
