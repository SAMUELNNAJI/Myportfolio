"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/content/site";

type LoginPanelProps = {
  configured: boolean;
  onSuccess: () => void;
};

export function LoginPanel({ configured, onSuccess }: LoginPanelProps) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        setError(data.message ?? "Could not sign in. Try again.");
        return;
      }

      setPassword("");
      onSuccess();
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,59,59,0.16),transparent_72%)]"
      />
      <div aria-hidden="true" className="grid-fade absolute inset-0 opacity-40" />

      <div className="relative w-full max-w-[26rem]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-offset-4"
          aria-label={`${siteConfig.brand} — back to the site`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-[linear-gradient(145deg,rgba(255,59,59,0.28),rgba(255,138,61,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <span className="font-mono text-[12px] font-semibold tracking-tighter text-accent-soft">
              {"</>"}
            </span>
          </span>
          <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
            {siteConfig.brand}
          </span>
        </Link>

        <div className="card overflow-hidden rounded-2xl">
          <div className="border-b border-white/[0.07] bg-white/[0.02] px-5 py-3">
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Private · project dashboard
            </p>
          </div>

          <div className="p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent-soft">
              <Icon name="lock" size={19} />
            </span>
            <h1 className="mt-4 font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">
              Sign in to manage projects
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Add a project, paste its live URL, and it appears in the featured
              section — with a live preview visitors can switch between desktop
              and mobile.
            </p>

            {!configured ? (
              <div className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-4 py-3.5 text-[12px] leading-relaxed text-amber-100/90">
                <p className="font-medium">Dashboard not configured</p>
                <p className="mt-1 text-amber-100/70">
                  Add <code className="font-mono text-[11px]">ADMIN_PASSWORD</code>{" "}
                  to <code className="font-mono text-[11px]">.env.local</code>{" "}
                  (or your host&apos;s environment variables) and restart the
                  server.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6" noValidate>
                <label
                  htmlFor="admin-password"
                  className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint"
                >
                  Admin password
                </label>
                <div className="relative mt-2">
                  <input
                    id="admin-password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "admin-error" : undefined}
                    className="field pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((value) => !value)}
                    aria-label={show ? "Hide password" : "Show password"}
                    aria-pressed={show}
                    className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-faint transition-colors hover:bg-white/[0.05] hover:text-ink"
                  >
                    <Icon name={show ? "eye-off" : "eye"} size={16} />
                  </button>
                </div>

                {error && (
                  <p
                    id="admin-error"
                    role="alert"
                    className="mt-2.5 flex items-start gap-2 text-[12px] leading-relaxed text-red-300"
                  >
                    <Icon name="alert" size={14} className="mt-px shrink-0" />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !password}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#ff3b3b,#d92626_55%,#a81414)] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(255,59,59,0.9)] transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-55"
                >
                  {submitting ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign in
                      <Icon name="arrow-right" size={15} />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-5 flex items-center gap-2 text-[11px] text-faint">
              <Icon name="info" size={12} className="shrink-0" />
              Sessions last 7 days on this browser.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-[12px] text-faint transition-colors hover:text-ink"
        >
          <Icon name="arrow-left" size={13} />
          Back to the portfolio
        </Link>
      </div>
    </div>
  );
}
