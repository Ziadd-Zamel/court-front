import { NextRequest, NextResponse } from "next/server";
import { isSiteSearchScope } from "@/lib/constants/site-search";

export async function POST(request: NextRequest) {
  const backendUrl = process.env.API;
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, message: "API base URL is not configured" },
      { status: 500 },
    );
  }

  let body: {
    search?: string;
    scope?: string;
    page?: number;
    per_page?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const search = typeof body.search === "string" ? body.search.trim() : "";
  const scope = body.scope;
  const page = Math.max(1, Number(body.page) || 1);
  const perPage = Math.max(1, Math.min(50, Number(body.per_page) || 15));

  if (!search) {
    return NextResponse.json(
      { success: false, message: "حقل البحث مطلوب" },
      { status: 400 },
    );
  }

  if (!isSiteSearchScope(scope)) {
    return NextResponse.json(
      { success: false, message: "نطاق البحث غير صالح" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${backendUrl}search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        search,
        scope,
        page,
        per_page: perPage,
      }),
      cache: "no-store",
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

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error proxying site search:", error);
    return NextResponse.json(
      { success: false, message: "فشل تنفيذ البحث" },
      { status: 500 },
    );
  }
}
