import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");

    if (!src) {
      return NextResponse.json({ error: "Missing src" }, { status: 400 });
    }

    // 🔒 SECURITY: only allow known local PDFs
    if (!src.startsWith("/")) {
      return NextResponse.json({ error: "Invalid src" }, { status: 400 });
    }

    // ✅ Read from /public
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
