import { NextRequest, NextResponse } from "next/server";
import {
  normalizeNumericParam,
  PRINCIPLE_NUMERIC_PARAM_KEYS,
} from "@/lib/utils/normalize-numeric-param";

// Forwarded query parameters from the client (matches the principle search UI).
const FORWARDED_PARAMS = [
  "page",
  "per_page",
  "principle_type_uuids",
  "exact_phrase",
  "similar_phrase",
  "include_terms",
  "exclude_terms",
  "any_terms",
  "appeal_number",
  "appeal_year",
  "principle_number",
  "principle_year",
  "session_date",
  "strict_alef",
  "strict_ya",
  "strict_ta",
] as const;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const upstreamParams = new URLSearchParams();
  for (const key of FORWARDED_PARAMS) {
    const value = searchParams.get(key);
    if (value !== null && value !== "") {
      const normalized = (PRINCIPLE_NUMERIC_PARAM_KEYS as readonly string[]).includes(
        key,
      )
        ? normalizeNumericParam(value)
        : value;
      if (normalized) {
        upstreamParams.append(key, normalized);
      }
    }
  }

  const backendUrl = process.env.API;
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, message: "API base URL is not configured" },
      { status: 500 },
    );
  }

  const url = `${backendUrl}principles/advanced-search?${upstreamParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 600 },
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            (payload && typeof payload === "object" && "message" in payload
              ? String((payload as { message: unknown }).message)
              : null) ?? `Upstream HTTP ${response.status}`,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error fetching principles advanced search:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch principles" },
      { status: 500 },
    );
  }
}
