// app/api/questions/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const category_id = searchParams.get("category_id");
    const per_page = searchParams.get("per_page");
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    // Build API URL
    const baseUrl = `${process.env.API}questions`;
    const params = new URLSearchParams();

    // Add parameters if they exist
    if (category_id) {
      params.append("category_id", category_id);
    }

    if (per_page) {
      params.append("per_page", per_page);
    }

    if (page) {
      params.append("page", page);
    }

    if (search) {
      params.append("search", search);
    }

    // Construct final URL
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

    // Fetch from external API
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers your API needs
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data with proper headers
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error in questions API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
