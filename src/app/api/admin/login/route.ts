import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  adminConfigured,
  clientKey,
  createSessionToken,
  loginRateLimit,
  sameOrigin,
  verifyPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "The dashboard is locked until ADMIN_PASSWORD is set in the environment.",
      },
      { status: 503 },
    );
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Invalid origin." }, { status: 403 });
  }

  const limit = loginRateLimit(`login:${clientKey(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: `Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !verifyPassword(password)) {
    return NextResponse.json(
      { ok: false, message: "That password doesn't match. Try again." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
