import Link from "next/link";

/** The tilted yellow "UNCLE'S KITCHEN / SINCE 1987" stamp. */
export function Stamp({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const s = {
    sm: "text-[1.05rem] px-2.5 pt-1.5 pb-1 [--sub:0.55rem]",
    md: "text-[1.35rem] px-3 pt-2 pb-1.5 [--sub:0.62rem]",
    lg: "text-[2.6rem] px-5 pt-3.5 pb-3 [--sub:1.05rem]",
  }[size];
  return (
    <span
      className={`inline-flex -rotate-[4deg] flex-col items-center rounded-[3px] bg-turmeric text-char shadow-[3px_3px_0_0_var(--color-chili)] ${s} ${className}`}
    >
      <span className="display leading-none whitespace-nowrap">Uncle&rsquo;s Kitchen</span>
      <span className="mt-1 flex w-full items-center gap-1.5 border-t-2 border-char/80 pt-0.5 text-[length:var(--sub)] font-bold tracking-[0.28em] uppercase">
        <span className="mx-auto">Since 1987</span>
      </span>
    </span>
  );
}

export function LogoLink({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <Link href="/" aria-label="Uncle's Kitchen, home" className="stamp-3d inline-block rounded-sm">
      <Stamp size={size} />
    </Link>
  );
}

/** Rising-steam line motif. Decorative only. */
export function Steam({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={`steam ${className}`}
      aria-hidden
    >
      <path d="M30 155c-14-20 14-32 0-52s14-32 0-52 14-30 0-48" />
      <path d="M60 155c-14-20 14-32 0-52s14-32 0-52 14-30 0-48" opacity=".75" />
      <path d="M90 155c-14-20 14-32 0-52s14-32 0-52 14-30 0-48" opacity=".5" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase ${className}`}>
      <span className="h-0.5 w-8 bg-current" aria-hidden />
      {children}
    </p>
  );
}
