"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-faint transition-colors hover:border-white/20 hover:text-ink"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      <Icon name={copied ? "check" : "copy"} size={11} />
      {copied ? "Copied" : "Copy"}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
