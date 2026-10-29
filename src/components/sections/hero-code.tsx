import { hero } from "@/content/site";
import { Icon } from "@/components/ui/icon";

const tones = {
  keyword: "text-[#ff8f8f]",
  string: "text-[#ffcf8a]",
  property: "text-[#ff9f8f]",
  boolean: "text-[#ffb347]",
  operator: "text-[#9a8f8e]",
} as const;

/**
 * A code editor mockup used as the hero visual. Built from DOM elements rather
 * than an image — it stays sharp on every display and adds no image weight.
 */
export function HeroCode() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(255,59,59,0.26),transparent_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="dot-grid absolute -right-6 -top-10 -z-10 h-44 w-44 opacity-25 [mask-image:radial-gradient(closest-side,black,transparent)]"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#080a12]/95 shadow-[0_50px_90px_-45px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <Icon name="code" size={13} className="text-accent-soft/80" />
            {hero.code.filename}
          </div>
          <span className="justify-self-end rounded-md border border-white/[0.08] px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-faint">
            TS
          </span>
        </div>

        <div className="overflow-x-auto px-4 py-5 sm:px-5">
          <pre className="font-mono text-[11.5px] leading-[1.85] sm:text-[12.5px]">
            <code>
              {hero.code.lines.map((line, index) => (
                <span key={index} className="flex">
                  <span
                    aria-hidden="true"
                    className="mr-4 w-5 shrink-0 select-none text-right text-[#3c4359]"
                  >
                    {index + 1}
                  </span>
                  <span className="whitespace-pre text-[#d8cfce]">
                    {"  ".repeat(line.indent)}
                    {line.content.map((part, partIndex) => (
                      <span
                        key={partIndex}
                        className={
                          "tone" in part && part.tone
                            ? tones[part.tone as keyof typeof tones]
                            : undefined
                        }
                      >
                        {part.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
              <span className="flex">
                <span
                  aria-hidden="true"
                  className="mr-4 w-5 shrink-0 select-none text-right text-[#3c4359]"
                >
                  {hero.code.lines.length + 1}
                </span>
                <span className="inline-block h-[1.15em] w-[0.55em] animate-blink bg-accent-soft/80" />
              </span>
            </code>
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-white/[0.015] px-4 py-2.5 font-mono text-[10.5px]">
          <span className="flex items-center gap-2 text-faint">
            <span className="text-accent-soft/70">$</span>
            {hero.code.terminal.command}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300/90">
            <Icon name="check" size={12} />
            {hero.code.terminal.result}
          </span>
        </div>
      </div>

      {/* Floating status chip */}
      <div className="animate-float absolute -right-2 top-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-[#0f0a0b]/90 px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:flex lg:-right-5">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300">
          <Icon name="gauge" size={15} />
        </span>
        <span className="text-[11px] font-medium text-ink">
          Performance-first
          <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
            built for Core Web Vitals
          </span>
        </span>
      </div>

      {/* Floating tech chip */}
      <div
        className="animate-float-slow absolute -bottom-5 left-2 flex items-center gap-2 rounded-full border border-white/10 bg-[#0f0a0b]/90 px-3 py-1.5 font-mono text-[10px] text-muted shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:-left-5"
        style={{ animationDelay: "1.4s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ember/80" />
        TypeScript · React · Next.js
      </div>
    </div>
  );
}
