"use client";

import { useEffect, type RefObject } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** progress of p inside [start, end] -> 0..1 */
export const seg = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Calls `onFrame(progress)` (0 at section top, 1 when its end reaches the viewport bottom).
 * Progress eases toward the real scroll position each frame, so motion glides instead of snapping.
 * Writes the DOM directly so React never re-renders while scrolling.
 */
export function useScrollScene(ref: RefObject<HTMLElement | null>, onFrame: (p: number, vh: number) => void, ease = 0.12) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let target = 0;
    let cur = -1;
    const read = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      target = total > 0 ? clamp(-r.top / total) : 1;
    };
    const tick = () => {
      cur = cur < 0 || reduce ? target : cur + (target - cur) * ease;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      el.style.setProperty("--p", cur.toFixed(4));
      onFrame(cur, innerHeight);
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    };
    const queue = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    queue();
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    return () => {
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onFrame, ease]);
}
