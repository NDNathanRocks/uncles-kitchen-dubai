import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "red" | "yellow" | "outline" | "dark";

const styles: Record<Variant, string> = {
  // Charcoal text on chili red keeps 4.6:1 contrast (cream on red would fail AA at body size).
  red: "bg-chili text-char hover:bg-[#f0563f]",
  yellow: "bg-turmeric text-char hover:bg-[#ffc81f]",
  outline: "border-2 border-cream/70 text-cream hover:border-turmeric hover:text-turmeric",
  dark: "bg-char text-cream hover:bg-char-3",
};

export const btn = (variant: Variant = "red", extra = "") =>
  `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-bold tracking-wide transition duration-200 hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${extra}`;

type Props = { variant?: Variant; className?: string; children: ReactNode; external?: boolean } & Omit<
  ComponentProps<"a">,
  "className"
>;

export function ButtonLink({ variant = "red", className = "", children, external, href = "#", ...rest }: Props) {
  const cls = btn(variant, className);
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
