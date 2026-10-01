import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.API;
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, message: "API base URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${backendUrl}search/options`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            (payload &&
            typeof payload === "object" &&
            "message" in payload
              ? String((payload as { message: unknown }).message)
              : null) ?? `Upstream HTTP ${response.status}`,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error proxying search options:", error);
    return NextResponse.json(
      { success: false, message: "فشل جلب خيارات البحث" },
      { status: 500 },
    );
  }
}
