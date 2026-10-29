import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "samizil_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${sign(String(expires))}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [expiresRaw, signature] = token.split(".");
  if (!expiresRaw || !signature) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  const expected = sign(expiresRaw);
  if (expected.length !== signature.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

/** Constant-time password check; returns false when the dashboard is unconfigured. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still compare to keep timing roughly constant, then fail.
    timingSafeEqual(b, b);
    return false;
  }
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function loginRateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = attempts.get(key);

  if (!bucket || bucket.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "local").trim();
}

/** Rejects cross-site mutations when the browser sends an Origin header. */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
