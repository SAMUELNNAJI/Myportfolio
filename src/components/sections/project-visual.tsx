import type { Project } from "@/lib/project-types";

type ProjectVisualProps = {
  variant: Project["visual"];
  accent: string;
  domain: string;
};

/**
 * Generated browser mockups for the sample projects. Everything is DOM + CSS,
 * so there are no thumbnail images to download and nothing to break.
 */
export function ProjectVisual({ variant, accent, domain }: ProjectVisualProps) {
  const soft = `${accent}33`;
  const medium = `${accent}66`;

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] overflow-hidden bg-[#0a0708] sm:aspect-[16/10]"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 95% at 88% 0%, ${medium}33, transparent 58%), radial-gradient(90% 80% at 6% 100%, ${soft}22, transparent 62%)`,
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-[0.13]" />

      <div className="absolute inset-0 p-4 sm:p-6">
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.11] bg-[#0e0a0b] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.95)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.012]">
          {/* Browser chrome */}
          <div className="flex h-7 shrink-0 items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            </div>
            <div className="mx-auto flex h-4 max-w-[62%] items-center gap-1.5 rounded border border-white/[0.06] bg-white/[0.025] px-2 font-mono text-[7.5px] text-faint">
              <span className="h-1 w-1 rounded-full bg-emerald-400/70" />
              <span className="truncate">{domain}</span>
            </div>
            <div className="w-6" />
          </div>

          {/* Page content */}
          <div className="min-h-0 flex-1">
            {variant === "site" && <SiteMock accent={accent} />}
            {variant === "store" && <StoreMock accent={accent} />}
            {variant === "landing" && <LandingMock accent={accent} />}
            {variant === "app" && <AppMock accent={accent} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-[3px]"
            style={{ backgroundColor: accent }}
          />
          <span className="h-1 w-8 rounded-full bg-white/25" />
        </div>
        <div className="flex items-center gap-2.5">
          {[10, 8, 12].map((width, index) => (
            <span
              key={index}
              className="h-1 rounded-full bg-white/12"
              style={{ width }}
            />
          ))}
          <span className="h-3 w-8 rounded-full border border-white/12" />
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-3 px-4 py-2">
        <div>
          <span className="font-mono text-[6.5px] uppercase tracking-[0.2em] text-white/35">
            Independent studio
          </span>
          <p className="mt-1.5 font-display text-[12px] font-semibold leading-[1.25] text-white/90">
            Design that earns
            <br />
            attention.
          </p>
          <div className="mt-2 space-y-1">
            <span className="block h-1 w-full max-w-[130px] rounded-full bg-white/10" />
            <span className="block h-1 w-3/4 rounded-full bg-white/[0.07]" />
          </div>
          <div className="mt-2.5 flex gap-1.5">
            <span
              className="h-3.5 w-12 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="h-3.5 w-10 rounded-full border border-white/12" />
          </div>
        </div>
        <div
          className="relative aspect-[4/3.2] overflow-hidden rounded-md border border-white/10"
          style={{
            background: `linear-gradient(145deg, ${accent}66, #1a0f10 62%, #0f0a0b)`,
          }}
        >
          <div className="absolute -right-4 -top-4 h-14 w-14 rounded-full border border-white/15" />
          <div
            className="absolute bottom-2 left-2 h-9 w-9 rounded-full border border-white/20"
            style={{ backgroundColor: `${accent}33` }}
          />
          <div className="absolute bottom-3 right-3 h-1 w-6 rounded-full bg-white/30" />
          <div className="absolute bottom-5 right-3 h-1 w-8 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 px-4 pb-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="rounded border border-white/[0.06] bg-white/[0.025] p-1.5"
          >
            <span
              className="block h-1 w-1 rounded-full"
              style={{ backgroundColor: `${accent}bb` }}
            />
            <span className="mt-1 block h-1 w-4/5 rounded-full bg-white/12" />
            <span className="mt-1 block h-1 w-1/2 rounded-full bg-white/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-2">
        <span className="font-display text-[7px] font-semibold tracking-wide text-white/80">
          NORTHWIND
        </span>
        <div className="flex items-center gap-2">
          {[9, 7, 11].map((width, index) => (
            <span
              key={index}
              className="h-1 rounded-full bg-white/12"
              style={{ width }}
            />
          ))}
          <span
            className="grid h-3.5 w-3.5 place-items-center rounded-full"
            style={{ backgroundColor: `${accent}2e` }}
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </span>
        </div>
      </div>

      <div className="flex items-baseline justify-between px-4 pb-2 pt-2.5">
        <span className="font-display text-[8px] font-medium text-white/75">
          New season
        </span>
        <span className="font-mono text-[6px] uppercase tracking-wider text-white/30">
          12 pieces
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 px-3 pb-3">
        {[
          { name: "Linen shirt", price: "$48", shape: "circle" },
          { name: "Field tote", price: "$64", shape: "square" },
          { name: "Wool cap", price: "$32", shape: "arch" },
        ].map((product, index) => (
          <div
            key={product.name}
            className="flex min-h-0 flex-col overflow-hidden rounded border border-white/[0.07] bg-white/[0.025]"
          >
            <div
              className="relative flex-1"
              style={{
                background: `linear-gradient(150deg, ${accent}2e, #160e0f 75%)`,
              }}
            >
              {product.shape === "circle" && (
                <span
                  className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
                  style={{ backgroundColor: `${accent}33` }}
                />
              )}
              {product.shape === "square" && (
                <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[2px] border border-white/20 bg-white/[0.06]" />
              )}
              {product.shape === "arch" && (
                <span
                  className="absolute bottom-1.5 left-1/2 h-6 w-6 -translate-x-1/2 rounded-t-full border border-white/20"
                  style={{ backgroundColor: `${accent}2e` }}
                />
              )}
              {index === 0 && (
                <span
                  className="absolute left-1 top-1 rounded px-1 py-0.5 font-mono text-[4.5px] uppercase tracking-wider text-white/80"
                  style={{ backgroundColor: `${accent}cc` }}
                >
                  New
                </span>
              )}
            </div>
            <div className="space-y-1 px-1.5 py-1.5">
              <span className="block truncate font-mono text-[5.5px] text-white/55">
                {product.name}
              </span>
              <span
                className="block font-mono text-[6px] font-medium"
                style={{ color: accent }}
              >
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LandingMock({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-2">
        <span className="h-1 w-8 rounded-full bg-white/25" />
        <span className="h-3 w-10 rounded-full border border-white/10" />
      </div>

      <span
        className="rounded-full border px-2 py-0.5 font-mono text-[5.5px] uppercase tracking-[0.16em]"
        style={{
          borderColor: `${accent}44`,
          backgroundColor: `${accent}12`,
          color: `${accent}`,
        }}
      >
        Now in beta
      </span>

      <p className="mt-2 font-display text-[13px] font-semibold leading-[1.2] text-white/90">
        Launch in days,
        <br />
        not months.
      </p>
      <div className="mt-2 space-y-1">
        <span className="mx-auto block h-1 w-28 rounded-full bg-white/10" />
        <span className="mx-auto block h-1 w-20 rounded-full bg-white/[0.07]" />
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span
          className="flex h-4 items-center rounded-full px-3 font-mono text-[5.5px] font-medium text-white"
          style={{ backgroundColor: accent }}
        >
          Get started
        </span>
        <span className="flex h-4 items-center rounded-full border border-white/12 px-2.5 font-mono text-[5.5px] text-white/60">
          Watch demo
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 opacity-45">
        {[12, 9, 14, 10].map((width, index) => (
          <span
            key={index}
            className="h-1 rounded-full bg-white/30"
            style={{ width }}
          />
        ))}
      </div>

      <div className="absolute -right-2 bottom-2 w-24 rotate-[-3deg] rounded-md border border-white/10 bg-[#100b0c]/95 p-2 text-left shadow-xl backdrop-blur sm:right-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[4.5px] uppercase tracking-wider text-white/35">
            This week
          </span>
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
        <div className="mt-1.5 flex items-end gap-1">
          {[8, 14, 10, 18, 13, 22, 17].map((height, index) => (
            <span
              key={index}
              className="w-1.5 rounded-sm"
              style={{
                height,
                backgroundColor: index === 5 ? accent : `${accent}33`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full">
      <div className="flex w-9 shrink-0 flex-col items-center gap-2 border-r border-white/[0.06] bg-white/[0.012] py-2.5">
        <span
          className="h-3 w-3 rounded-[3px]"
          style={{ backgroundColor: `${accent}cc` }}
        />
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className="h-2.5 w-2.5 rounded-[2px] bg-white/10"
            style={item === 0 ? { backgroundColor: `${accent}33` } : undefined}
          />
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="block font-mono text-[5px] uppercase tracking-[0.18em] text-white/30">
              Workspace
            </span>
            <span className="mt-0.5 block font-display text-[8px] font-medium text-white/80">
              Overview
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-10 rounded border border-white/[0.08] bg-white/[0.03]" />
            <span
              className="h-3.5 w-3.5 rounded-full"
              style={{ backgroundColor: `${accent}44` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {["Revenue", "Active", "Churn"].map((label, index) => (
            <div
              key={label}
              className="rounded border border-white/[0.07] bg-white/[0.025] p-1.5"
            >
              <span className="block font-mono text-[4.5px] uppercase tracking-wider text-white/30">
                {label}
              </span>
              <span
                className="mt-1 block h-1.5 w-8 rounded-full"
                style={{
                  backgroundColor: index === 0 ? accent : "#ffffff26",
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col rounded border border-white/[0.07] bg-white/[0.015] p-2">
          <div className="flex items-center justify-between">
            <span className="h-1 w-10 rounded-full bg-white/20" />
            <span className="flex gap-1">
              <span className="h-1 w-3 rounded-full bg-white/10" />
              <span className="h-1 w-3 rounded-full bg-white/10" />
            </span>
          </div>
          <div className="mt-2 flex min-h-0 flex-1 items-end gap-1.5">
            {[35, 52, 42, 68, 55, 78, 60, 88, 72].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-[2px]"
                style={{
                  height: `${height}%`,
                  background:
                    index === 7
                      ? `linear-gradient(to top, ${accent}44, ${accent})`
                      : `linear-gradient(to top, #ffffff0d, #ffffff22)`,
                }}
              />
            ))}
          </div>
          <svg
            className="pointer-events-none absolute inset-x-2 bottom-2 h-1/2 w-[calc(100%-1rem)] opacity-60"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 32 C12 30 18 20 28 24 S44 34 54 20 70 10 82 14 94 4 100 6"
              stroke={accent}
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
