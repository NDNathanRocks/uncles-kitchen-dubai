"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 3D tilt toward the pointer with a soft moving glare.
 * Eases every frame (no snapping); off for touch and reduced motion.
 */
export function Tilt({
  children,
  className = "",
  max = 7,
  lift = 18,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0, h: 0 };
    const cur = { x: 0, y: 0, h: 0 };
    let raf = 0;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      cur.h += (target.h - cur.h) * 0.12;
      el.style.transform = `perspective(900px) rotateX(${(-cur.y * max).toFixed(2)}deg) rotateY(${(cur.x * max).toFixed(2)}deg) translateZ(${(cur.h * lift).toFixed(1)}px)`;
      if (glareRef.current) {
        glareRef.current.style.opacity = (cur.h * 0.55).toFixed(3);
        glareRef.current.style.setProperty("--gx", `${50 + cur.x * 50}%`);
        glareRef.current.style.setProperty("--gy", `${50 + cur.y * 50}%`);
      }
      const settled =
        Math.abs(target.x - cur.x) < 0.001 && Math.abs(target.y - cur.y) < 0.001 && Math.abs(target.h - cur.h) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.h = 1;
      kick();
    };
    const leave = () => {
      target.x = 0;
      target.y = 0;
      target.h = 0;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, lift]);

  return (
    <div ref={ref} className={`relative [transform-style:preserve-3d] will-change-transform ${className}`}>
      {children}
      {glare ? (
        <span
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgb(255_240_215/0.55),transparent_55%)]"
        />
      ) : null}
    </div>
  );
}
