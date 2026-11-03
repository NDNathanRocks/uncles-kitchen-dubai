"use client";

import { useEffect, type RefObject } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** progress of p inside [start, end] -> 0..1 */
export const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Calls `onFrame(progress)` (0 at section top, 1 when its end reaches the viewport bottom)
 * on scroll / resize, throttled to animation frames. Writes `--p` on the section too.
 * Writes the DOM directly so React never re-renders while scrolling.
 */
export function useScrollScene(ref: RefObject<HTMLElement | null>, onFrame: (p: number, vh: number) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const p = total > 0 ? clamp(-r.top / total) : 1;
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      el.style.setProperty("--p", p.toFixed(4));
      onFrame(p, vh);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    const resize = () => {
      last = -1;
      queue();
    };
    run();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onFrame]);
}
