// app/api/lawyers/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get query parameters
  const name = searchParams.get("name");
  const field = searchParams.get("field");
  const search = searchParams.get("search");
  const office_circle = searchParams.get("office_circle");
  const per_page = searchParams.get("per_page");
  const page = searchParams.get("page");

  // Build backend URL with parameters
  const backendUrl = process.env.API;
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }

  if (field) {
    params.append("field", field);
  }

  if (search) {
    params.append("search", search);
  }

  if (office_circle) {
    params.append("office_circle", office_circle);
  }

  if (per_page) {
    params.append("per_page", per_page);
  }

  if (page) {
    params.append("page", page);
  }

  const url = params.toString()
    ? `${backendUrl}lawyers?${params.toString()}`
    : `${backendUrl}lawyers`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return NextResponse.json(
      { error: "Failed to fetch lawyers" },
      { status: 500 }
    );
  }
}
