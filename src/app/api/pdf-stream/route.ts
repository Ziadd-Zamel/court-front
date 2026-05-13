import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

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

// Streams the PDF binary through to the client. Forwards Range headers so
// the upstream / pdfium can do progressive (range-request) loading instead
// of waiting for the entire file as one base64 blob.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");
    if (!src) return new Response("Missing src", { status: 400 });

    const range = req.headers.get("range") ?? undefined;

    if (src.startsWith("http://") || src.startsWith("https://")) {
      if (!isAllowedRemotePdfUrl(src)) {
        return new Response("Invalid src", { status: 403 });
      }

      const upstream = await fetch(src, {
        cache: "no-store",
        headers: range ? { Range: range } : undefined,
      });

      if (!upstream.ok && upstream.status !== 206) {
        return new Response("PDF fetch failed", {
          status: upstream.status === 404 ? 404 : 502,
        });
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/pdf");
      headers.set("Accept-Ranges", "bytes");
      headers.set("Cache-Control", "public, max-age=3600");
      const len = upstream.headers.get("content-length");
      if (len) headers.set("Content-Length", len);
      const contentRange = upstream.headers.get("content-range");
      if (contentRange) headers.set("Content-Range", contentRange);

      return new Response(upstream.body, {
        status: upstream.status,
        headers,
      });
    }

    // Local file under /public
    if (!src.startsWith("/")) {
      return new Response("Invalid src", { status: 400 });
    }
    const filePath = path.join(process.cwd(), "public", src);
    if (!fs.existsSync(filePath)) {
      return new Response("PDF not found", { status: 404 });
    }
    const stat = fs.statSync(filePath);
    const total = stat.size;

    if (range) {
      const match = /bytes=(\d+)-(\d*)/.exec(range);
      if (match) {
        const start = Number(match[1]);
        const end = match[2] ? Number(match[2]) : total - 1;
        const chunkSize = end - start + 1;
        const stream = fs.createReadStream(filePath, { start, end });
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        headers.set("Accept-Ranges", "bytes");
        headers.set("Content-Length", String(chunkSize));
        headers.set("Content-Range", `bytes ${start}-${end}/${total}`);
        headers.set("Cache-Control", "public, max-age=3600");
        return new Response(stream as unknown as ReadableStream, {
          status: 206,
          headers,
        });
      }
    }

    const buffer = fs.readFileSync(filePath);
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Accept-Ranges": "bytes",
        "Content-Length": String(total),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
