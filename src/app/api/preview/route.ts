import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["http:", "https:"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");
  const widthParam = searchParams.get("w");

  if (!target) {
    return new NextResponse("Missing url", { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (!ALLOWED.has(url.protocol)) {
    return new NextResponse("Invalid protocol", { status: 400 });
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "text/html; charset=utf-8";
    const isHtml = contentType.toLowerCase().includes("text/html");

    if (!isHtml) {
      const body = await res.arrayBuffer();
      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Cache-Control", "no-store");
      return new NextResponse(body, { status: res.status, headers });
    }

    const html = await res.text();
    // Inject a <base> tag so relative assets/links resolve against the
    // original origin instead of the proxy URL (which would 404).
    const baseTag = `<base href="${url.origin}${url.pathname.replace(/[^/]*$/, "")}" target="_self">`;
    let out = html;
    if (/<head[^>]*>/i.test(out)) {
      out = out.replace(/<head[^>]*>/i, (m) => `${m}\n${baseTag}`);
    } else if (/<html[^>]*>/i.test(out)) {
      out = out.replace(/<html[^>]*>/i, (m) => `${m}\n<head>${baseTag}</head>`);
    } else {
      out = `${baseTag}\n${out}`;
    }

    // Optionally force a specific viewport width (e.g. desktop/mobile) so the
    // site's responsive layout is evaluated at that width from the start.
    if (widthParam && /^\d+$/.test(widthParam)) {
      const w = parseInt(widthParam, 10);
      const viewportMeta = `<meta name="viewport" content="width=${w}, initial-scale=1" />`;
      // Replace any existing viewport meta.
      if (/<meta[^>]+name=["']viewport["'][^>]*>/i.test(out)) {
        out = out.replace(/<meta[^>]+name=["']viewport["'][^>]*>/i, viewportMeta);
      } else if (/<head[^>]*>/i.test(out)) {
        out = out.replace(/<head[^>]*>/i, (m) => `${m}\n${viewportMeta}`);
      }
    }

    const headers = new Headers();
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "no-store");
    headers.set("Content-Security-Policy", "frame-ancestors 'self' *");
    // Intentionally omit X-Frame-Options so the proxied page can be framed.

    return new NextResponse(out, { status: res.status, headers });
  } catch {
    return new NextResponse("Failed to fetch", { status: 502 });
  }
}
