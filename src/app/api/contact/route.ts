import { NextResponse, type NextRequest } from "next/server";

/**
 * Contact endpoint.
 *
 * Delivery options, in order of preference:
 *  1. Resend  — set RESEND_API_KEY, CONTACT_TO_EMAIL (and optionally CONTACT_FROM_EMAIL)
 *  2. Any form service that accepts JSON — set CONTACT_FORM_ENDPOINT
 *  3. Nothing configured — returns 503 with a clear message so the UI can show
 *     an honest "not connected" state instead of pretending a message was sent.
 *
 * The in-memory rate limiter resets per server instance; for multi-instance
 * deployments use a shared store (e.g. Upstash) if abuse becomes a problem.
 */

export const runtime = "nodejs";

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;

  if (buckets.size > 5000) {
    for (const [key, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(key);
    }
  }

  return bucket.count > LIMIT;
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function jsonError(message: string, status: number, code: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

export async function POST(request: NextRequest) {
  // Same-origin guard for browsers that send an Origin header.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return jsonError("This request came from an unknown origin.", 403, "FORBIDDEN");
      }
    } catch {
      return jsonError("Invalid request origin.", 403, "FORBIDDEN");
    }
  }

  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return jsonError(
      "Too many messages from this address. Please try again later or send an email.",
      429,
      "RATE_LIMITED",
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return jsonError("The request body could not be read.", 400, "BAD_REQUEST");
  }

  // Honeypot: accept silently so bots don't learn from the response.
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true, message: "Thanks — your message was sent." });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const subject = clean(body.subject, 120);
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";

  if (name.length < 2) {
    return jsonError("Please include your name.", 422, "INVALID_NAME");
  }
  if (!emailPattern.test(email)) {
    return jsonError("Please include a valid email address.", 422, "INVALID_EMAIL");
  }
  if (subject.length < 3) {
    return jsonError("Please include a subject.", 422, "INVALID_SUBJECT");
  }
  if (message.length < 20) {
    return jsonError(
      "Please add a little more detail to your message.",
      422,
      "INVALID_MESSAGE",
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    "— Sent from the portfolio contact form",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

  try {
    if (resendKey && to) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ??
            "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `Portfolio enquiry — ${subject}`,
          text,
        }),
      });

      if (!response.ok) {
        console.error("Resend delivery failed:", response.status, await response.text());
        return jsonError(
          "The mail service rejected the message. Please email me directly instead.",
          502,
          "DELIVERY_FAILED",
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Thanks — your message is on its way. I'll reply as soon as I can.",
      });
    }

    if (endpoint) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        console.error("Form endpoint failed:", response.status, await response.text());
        return jsonError(
          "The form service rejected the message. Please email me directly instead.",
          502,
          "DELIVERY_FAILED",
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Thanks — your message is on its way. I'll reply as soon as I can.",
      });
    }

    if (smtpHost && smtpUser && smtpPass && to) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to,
        replyTo: email,
        subject: `Portfolio enquiry — ${subject}`,
        text,
      });

      return NextResponse.json({
        ok: true,
        message: "Thanks — your message is on its way. I'll reply as soon as I can.",
      });
    }
  } catch (error) {
    console.error("Contact form delivery error:", error);
    return jsonError(
      "The message could not be delivered right now. Please try again shortly.",
      502,
      "DELIVERY_ERROR",
    );
  }

  return NextResponse.json(
    {
      ok: false,
      code: "NOT_CONFIGURED",
      message: "This form isn't connected to a mail service yet, so nothing was sent.",
    },
    { status: 503 },
  );
}
