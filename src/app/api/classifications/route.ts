/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

// Disable SSL certificate validation (for self-signed certificates)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export async function GET(request: NextRequest) {
  const params = new URLSearchParams();
  params.append("r", "api/classifications/get-data");

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

    // Wrap the response in APIResponse format
    const apiResponse: SuccessfulResponse<ClassificationDataType[]> = {
      data: data,
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: data.length,
        total: data.length,
        from: 1,
        to: data.length,
      },
    };

    return NextResponse.json(apiResponse);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Failed to fetch classifications data",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
