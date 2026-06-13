import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = `${process.env.API}suggestion-roles`;

  try {
    const response = await fetch(backendUrl, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching suggestion roles:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestion roles" },
      { status: 500 },
    );
  }
}
