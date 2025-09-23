/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

// Disable SSL certificate validation (for self-signed certificates)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = new URLSearchParams();
  params.append("r", "api/basic-info/get-data");

  if (searchParams.get("rippId")) {
    params.append("rippId", searchParams.get("rippId")!);
  }

  if (searchParams.get("year")) {
    params.append("year", searchParams.get("year")!);
  }

  if (searchParams.get("classId")) {
    params.append("classId", searchParams.get("classId")!);
  }

  const apiUrl = `https://102.213.181.78/supremCourt/web/index-api.php?${params.toString()}`;

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch case data" },
      { status: 500 }
    );
  }
}
