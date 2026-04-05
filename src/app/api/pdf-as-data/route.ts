import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function isAllowedRemotePdfUrl(src: string): boolean {
  const api = process.env.API;
  if (!api) return false;
  try {
    const target = new URL(src);
    const base = new URL(api);
    return target.origin === base.origin;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");

    if (!src) {
      return NextResponse.json({ error: "Missing src" }, { status: 400 });
    }

    if (src.startsWith("http://") || src.startsWith("https://")) {
      if (!isAllowedRemotePdfUrl(src)) {
        return NextResponse.json({ error: "Invalid src" }, { status: 403 });
      }
      const res = await fetch(src, { cache: "no-store" });
      if (!res.ok) {
        return NextResponse.json(
          { error: "PDF fetch failed" },
          { status: res.status === 404 ? 404 : 502 },
        );
      }
      const arrayBuffer = await res.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      return NextResponse.json({
        dataUrl: `data:application/pdf;base64,${base64}`,
      });
    }

    // 🔒 Local: only paths under /public
    if (!src.startsWith("/")) {
      return NextResponse.json({ error: "Invalid src" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", src);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString("base64");

    return NextResponse.json({
      dataUrl: `data:application/pdf;base64,${base64}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
