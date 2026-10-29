"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, used to stagger items in a group. */
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
};

/**
 * Fades content in on first scroll into view using IntersectionObserver.
 * Content stays visible when JavaScript is unavailable or motion is reduced.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  style,
}: RevealProps) {
  return (
    <Tag
      className={cn(className)}
      data-reveal=""
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as CSSProperties
      }
      ref={(node: HTMLElement | null) => {
        if (!node) return;
        observeOnce(node);
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * A shared, module-level observer keeps the number of observers low. As soon as
 * an element is visible it is unobserved and marked `visible` permanently.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-reveal", "visible");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return observer;
}

function observeOnce(node: HTMLElement) {
  if (node.dataset.reveal === "visible") return;
  if (typeof window === "undefined") return;

  // Defer to after paint so layout/intersection measurements are accurate.
  window.requestAnimationFrame(() => {
    if (!node.isConnected || node.dataset.reveal === "visible") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      node.setAttribute("data-reveal", "visible");
      return;
    }

    // Reveal immediately if the element is already in (or above) the viewport,
    // so above-the-fold content is never stuck invisible.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
      node.setAttribute("data-reveal", "visible");
      return;
    }

    getObserver().observe(node);
  });
}

// Safety net: guarantee the page is never left blank. Reveal everything after
// a short delay so content always shows, while still letting the entrance
// animation play for above-the-fold content first.
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          if (el.getAttribute("data-reveal") !== "visible") {
            el.setAttribute("data-reveal", "visible");
          }
        });
      }, 1200);
    });
  });
}
