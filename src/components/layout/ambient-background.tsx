/**
 * Fixed, decorative background. Uses large soft gradients plus a masked grid and
 * a faint noise layer for depth — all CSS, so it costs no network requests.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-canvas" />

      {/* Top spotlight */}
      <div className="absolute left-1/2 top-[-28rem] h-[52rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,59,59,0.20),transparent_78%)]" />

      {/* Cool accent, lower left */}
      <div className="absolute bottom-[-16rem] left-[-22rem] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,138,61,0.09),transparent_75%)]" />

      {/* Warm ember, right edge */}
      <div className="absolute right-[-24rem] top-[38%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,60,0.07),transparent_72%)]" />

      <div className="absolute inset-0 grid-fade opacity-60" />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
    </div>
  );
}
