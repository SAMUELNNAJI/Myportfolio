"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectVisual } from "@/components/sections/project-visual";
import { Icon } from "@/components/ui/icon";
import { hostnameOf, safeHttpUrl, type Project } from "@/lib/project-types";
import { cn } from "@/lib/utils";

type Device = "desktop" | "mobile";

type ProjectPreviewProps = {
  title: string;
  liveUrl: string;
  visual: Project["visual"];
  accent: string;
  domain: string;
};

const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 390;

export function ProjectPreview({
  title,
  liveUrl,
  visual,
  accent,
  domain,
}: ProjectPreviewProps) {
  const rawUrl = safeHttpUrl(liveUrl);
  const [device, setDevice] = useState<Device>("desktop");
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [useProxy, setUseProxy] = useState(true);
  const autoSwitched = useRef(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const update = () => setCardWidth(node.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const url = rawUrl
    ? useProxy
      ? `/api/preview?url=${encodeURIComponent(rawUrl)}`
      : rawUrl
    : "";

  // Auto-fallback to the proxy if the direct embed does not load.
  useEffect(() => {
    if (!rawUrl || useProxy || failed || autoSwitched.current) return;
    const timer = window.setTimeout(() => {
      if (!loaded) {
        autoSwitched.current = true;
        setUseProxy(true);
        setLoaded(false);
        setFailed(false);
      }
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [rawUrl, useProxy, failed]);

  if (!rawUrl) {
    return (
      <div className="relative">
        <ProjectVisual variant={visual} accent={accent} domain={domain} />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-canvas/75 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint backdrop-blur-md sm:bottom-4 sm:left-4">
          <Icon name="edit" size={10} />
          Mockup — add a live URL
        </span>
      </div>
    );
  }

  const host = hostnameOf(rawUrl);
  const baseWidth = device === "desktop" ? DESKTOP_WIDTH : MOBILE_WIDTH;
  const scale = cardWidth > 0 ? cardWidth / baseWidth : 1;

  const iframeProps = {
    key: `${device}-${useProxy ? "proxy" : "direct"}`,
    src: url,
    title: `Live preview of ${title}`,
    loading: "lazy" as const,
    onLoad: () => setLoaded(true),
    onError: () => setFailed(true),
    sandbox:
      "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-pointer-lock",
    referrerPolicy: "no-referrer" as const,
    className: "h-full w-full border-0 bg-white",
  };

  return (
    <>
      <div className="relative overflow-hidden border-b border-white/[0.07] bg-[#0a0708]">
        <div className="flex h-9 items-center gap-2 border-b border-white/[0.07] bg-white/[0.025] px-3">
          <div aria-hidden="true" className="hidden items-center gap-1 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          </div>

          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex min-w-0 max-w-[40%] items-center gap-1.5 rounded border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[8.5px] text-faint transition-colors hover:border-white/20 hover:text-ink sm:max-w-[52%]"
            title={`Open ${host} in a new tab`}
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-400/70" />
            <span className="truncate">{host}</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          <div
            role="group"
            aria-label={`Preview size for ${title}`}
            className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/[0.09] bg-white/[0.03] p-0.5"
          >
            {(["desktop", "mobile"] as const).map((option) => {
              const isActive = device === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setDevice(option);
                    setLoaded(false);
                    setFailed(false);
                  }}
                  aria-pressed={isActive}
                  title={option === "desktop" ? "Desktop view" : "Mobile view"}
                  className={cn(
                    "grid h-6 w-7 place-items-center rounded-full transition-colors duration-200",
                    isActive
                      ? "bg-accent/20 text-accent-soft"
                      : "text-faint hover:text-ink",
                  )}
                >
                  <Icon
                    name={option === "desktop" ? "monitor" : "smartphone"}
                    size={13}
                  />
                  <span className="sr-only">
                    {option === "desktop" ? "Desktop view" : "Mobile view"}
                  </span>
                </button>
              );
            })}
          </div>

          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
            aria-label={`Open ${title} in a new tab`}
            title="Open in new tab"
          >
            <Icon name="arrow-up-right" size={12} />
          </a>
        </div>

        <div ref={cardRef} className="relative aspect-[4/3] overflow-hidden bg-[#0a0708] sm:aspect-[16/10] lg:aspect-[16/9]">
          {device === "mobile" ? (
            <div className="absolute inset-0 grid place-items-center bg-[#0a0708] p-2">
              <div
                className="relative overflow-hidden rounded-[1.4rem] border border-white/15 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] ring-1 ring-black/40"
                style={{
                  height: "90%",
                  width: "50%",
                  maxWidth: "14rem",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-black/60"
                />
                <div
                  className="absolute left-1/2 top-1/2 overflow-hidden bg-white"
                  style={{
                    transform: `translate(-50%, -50%) scale(${cardWidth > 0 ? Math.min((cardWidth * 0.5) / MOBILE_WIDTH, (cardWidth * 0.8) / (MOBILE_WIDTH * (16 / 9))) : 1})`,
                    width: `${MOBILE_WIDTH}px`,
                    height: `${Math.round(MOBILE_WIDTH * (16 / 9))}px`,
                  }}
                >
                  <iframe {...iframeProps} className="h-full w-full border-0 bg-white" />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="absolute inset-0 overflow-hidden bg-white"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: `${baseWidth}px`,
                height: `${Math.round(baseWidth * 0.75)}px`,
              }}
            >
              <iframe {...iframeProps} className="h-full w-full border-0 bg-white" />
            </div>
          )}

          {!loaded && !failed && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#0a0708]">
              <span className="flex flex-col items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-white/15 border-t-accent"
                />
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-faint">
                  Loading live preview
                </span>
              </span>
            </div>
          )}

          {failed && (
            <div className="absolute inset-0 grid place-items-center bg-[#0a0708] p-6 text-center">
              <span className="max-w-xs">
                <Icon
                  name="info"
                  size={18}
                  className="mx-auto mb-2 text-accent-soft/80"
                />
                <span className="block text-[12px] font-medium text-ink">
                  This site can't be embedded here.
                </span>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFailed(false);
                      setLoaded(false);
                      setUseProxy((v) => !v);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-ink transition-colors hover:border-white/30"
                  >
                    <Icon name="refresh" size={11} />
                    Try alternate view
                  </button>
                  <a
                    href={rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-accent-soft hover:text-ink"
                  >
                    Open in new tab
                    <Icon name="arrow-up-right" size={11} />
                  </a>
                </div>
              </span>
            </div>
          )}
        </div>

        <p className="flex items-start gap-2 border-t border-white/[0.06] bg-white/[0.015] px-3 py-1.5 text-[9.5px] leading-snug text-faint">
          <Icon name="info" size={11} className="mt-px shrink-0 text-accent-soft/60" />
          <span>
            Live preview of the project. Some sites block embedding — use "Open in new tab" if it won't load.
          </span>
        </p>
      </div>
    </>
  );
}
