import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const ChatIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z" />
    <path d="M9 10h.01M12.5 10h.01M16 10h.01" strokeWidth={2.6} />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" strokeWidth={2.6} />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 7h12l1 14H5z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);

export const DownloadIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const ChilliIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M14.5 3.5c.9-.9 2.3-1 3.2-.2l-1 1.1c.9.6 1.5 1.6 1.5 2.8 0 7-6.6 13.3-14.2 13.3-1 0-1.6-1.1-1-1.9C6.6 14 8.3 9.6 11.2 7.4c1.1-.8 2.4-1.2 3.6-1.1.1-1 .3-2 .7-2.8z"
    />
  </svg>
);

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (
    <span className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-[1em] shrink-0" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z"
          />
        </svg>
      ))}
    </span>
  );
  return (
    <span className={`relative inline-block ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      <span className="opacity-30">{row}</span>
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row}
      </span>
    </span>
  );
}
