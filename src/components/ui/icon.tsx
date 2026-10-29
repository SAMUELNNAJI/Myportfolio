import type { SVGProps } from "react";

export type IconName =
  | "accessibility"
  | "alert"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-up-right"
  | "briefcase"
  | "cart"
  | "check"
  | "check-circle"
  | "clock"
  | "close"
  | "code"
  | "copy"
  | "dashboard"
  | "device"
  | "edit"
  | "external"
  | "eye"
  | "eye-off"
  | "gauge"
  | "github"
  | "info"
  | "linkedin"
  | "lock"
  | "log-out"
  | "mail"
  | "map-pin"
  | "menu"
  | "monitor"
  | "pen"
  | "phone"
  | "plus"
  | "refresh"
  | "rocket"
  | "search"
  | "server"
  | "smartphone"
  | "sparkles"
  | "star"
  | "terminal"
  | "trash"
  | "upload"
  | "wrench"
  | "x";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

/**
 * Small, dependency-free icon set (24×24, 1.6px stroke) so the bundle stays lean.
 * Decorative by default — pass `aria-hidden={false}` plus a `title` when an icon
 * carries meaning on its own.
 */
export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

const icons: Record<IconName, React.ReactNode> = {
  accessibility: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
      <path d="M8 10.6 12 11.6l4-1M12 11.6V16M9 19.4l3-3.8 3 3.8" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16.4h.01" />
    </>
  ),
  "arrow-down": <path d="M12 4.5v15M6 13.5l6 6 6-6" />,
  "arrow-left": <path d="M20 12H5M11 6l-6 6 6 6" />,
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-up": <path d="M12 19.5v-15M6 10.5l6-6 6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  cart: (
    <>
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3.5h2l2.2 11.1a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7.5H6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.8 2.8L16.5 9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.6 5l-3.2 14" />,
  dashboard: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </>
  ),
  device: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  edit: (
    <>
      <path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L8.1 17.9 4 19l1.1-4.1L16.4 3.6ZM14.5 5.5l4 4" />
      <path d="M4 22h16" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  "eye-off": (
    <>
      <path d="M10.6 6.1A10.6 10.6 0 0 1 12 6c6.4 0 10 6 10 6a17.6 17.6 0 0 1-3.3 3.9M6.4 7.7A17.3 17.3 0 0 0 2 12s3.6 6 10 6a10.4 10.4 0 0 0 4.2-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />,
  gauge: (
    <>
      <path d="M3.5 18a8.5 8.5 0 1 1 17 0" />
      <path d="m12 18 4.2-5.4" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
    />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.8h.01" />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-4V9Z"
    />
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14.5v2.5" />
    </>
  ),
  "log-out": (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10.5c0 5.2-8 11.5-8 11.5s-8-6.3-8-11.5a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 20.5h8M12 17v3.5" />
    </>
  ),
  pen: <path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L8.1 17.9 4 19l1.1-4.1L16.4 3.6ZM14.5 5.5l4 4" />,
  phone: (
    <path d="M6.8 3.5h2.6l1.6 4-2 1.4a12.6 12.6 0 0 0 6.1 6.1l1.4-2 4 1.6v2.6a2.4 2.4 0 0 1-2.6 2.4A17.6 17.6 0 0 1 4.4 6.1a2.4 2.4 0 0 1 2.4-2.6Z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  refresh: (
    <>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.5-6" />
      <path d="M20.5 3.5v5h-5" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 5h3M11 18.5h2" />
    </>
  ),
  star: (
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" />
  ),
  sparkles: (
    <>
      <path d="M11.5 3.5 13.2 8l4.5 1.7-4.5 1.7-1.7 4.5-1.7-4.5L5.3 9.7 9.8 8l1.7-4.5Z" />
      <path d="M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M12.5 15H17" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13.5h9L17.5 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" />
      <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  ),
  x: (
    <path
      fill="currentColor"
      stroke="none"
      d="M18.9 2H22l-7.1 8.1L23 22h-6.5l-5.1-6.7L5.6 22H2.4l7.6-8.7L1.5 2H8l4.6 6.1L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z"
    />
  ),
};
