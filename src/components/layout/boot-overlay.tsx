"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const leftCode = [
  "const door = createPortal({",
  "  theme: 'samizil-red',",
  "  motion: 'open',",
  "});",
  "",
  "await door.mount();",
  "export default Door;",
  "",
  "// routes",
  "/  /about  /skills",
  "/projects  /contact",
  "",
  "build: 100%",
  "previews: linked",
  "status: ready",
];

const rightCode = [
  "<main data-portfolio>",
  "  <Hero />",
  "  <Projects />",
  "  <Contact />",
  "</main>",
  "",
  ".boot {",
  "  --accent: #dc2626;",
  "  --ember: #ff8a3d;",
  "}",
  "",
  "npm run build",
  "✓ compiled successfully",
  "opening door…",
];

export function BootOverlay() {
  const pathname = usePathname();
  const isDashboard = Boolean(pathname?.startsWith("/dashboard"));
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (isDashboard) return;
    if (typeof document === "undefined") return;
    if (document.documentElement.dataset.boot !== "play") return;

    const start = () => setActive(true);
    const timerStart = window.setTimeout(start, 0);

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setLeaving(true);
      document.documentElement.dataset.boot = "done";
      try {
        sessionStorage.setItem("samizil-boot", "1");
      } catch {
        /* Storage can be blocked — the intro simply plays again next visit. */
      }
      window.setTimeout(() => setDone(true), 800);
    };

    const timer = window.setTimeout(finish, 2300);

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" ||
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "Spacebar"
      ) {
        event.preventDefault();
        finish();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", finish);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(timerStart);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", finish);
    };
  }, [isDashboard]);

  if (done) return null;

  return (
    <div
      data-boot-overlay
      aria-hidden="true"
      className={cn("boot", leaving && "is-leaving", !active && "boot-idle")}
    >
      <div className="boot-door boot-door-left">
        <pre className="boot-code">{leftCode.join("\n")}</pre>
      </div>
      <div className="boot-door boot-door-right">
        <pre className="boot-code boot-code-right">{rightCode.join("\n")}</pre>
      </div>

      <div className="boot-center">
        <div className="boot-terminal">
          <div className="boot-terminal-bar">
            <span className="boot-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>samizil — boot</span>
            <span className="boot-live">
              <i aria-hidden="true" />
              live
            </span>
          </div>

          <div className="boot-terminal-body">
            <p className="boot-line boot-line-1">
              <span className="boot-prompt">$</span> npm run build
            </p>
            <p className="boot-line boot-line-2 boot-muted">
              compiling portfolio…
            </p>
            <p className="boot-line boot-line-3">
              <span className="boot-ok">✓</span> routes ready
            </p>
            <p className="boot-line boot-line-4">
              <span className="boot-ok">✓</span> live previews linked
            </p>
            <p className="boot-line boot-line-5 boot-open">
              opening the door<span className="boot-caret">▌</span>
            </p>
          </div>

          <div className="boot-progress" aria-hidden="true">
            <span />
          </div>
        </div>

        <p className="boot-brand">{siteConfig.brand}</p>
        <p className="boot-hint">Press any key to skip</p>
      </div>
    </div>
  );
}
