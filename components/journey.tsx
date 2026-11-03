"use client";

import { useCallback, useRef } from "react";
import { clamp, easeOutCubic, seg, useScrollScene } from "@/lib/use-scroll-scene";

/*
 * "The Journey": a hand-drawn skyline (like the mural on the Karama wall) that
 * draws itself and pans sideways as you scroll: Mumbai -> flight -> Dubai -> Karama.
 * Each path draws while the pen passes over its own x-range, so adding a landmark
 * is just adding a path.
 */

const VB_W = 3300;
const VB_H = 620;
const GROUND = 500;

/** x-range of each drawable in viewBox units, measured once. */
const extents = new WeakMap<Element, [number, number]>();

type Chapter = { when: string; where: string; text: string };

export function Journey({ chapters }: { chapters: Chapter[] }) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<SVGSVGElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const planeRef = useRef<SVGGElement>(null);

  const onFrame = useCallback(
    (p: number) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const vp = viewport.current;
      const svg = track.current;
      if (!vp || !svg) return;
      const prog = reduce ? 1 : p;

      // pen position in viewBox units (a little lead-in and run-out)
      const head = -80 + seg(prog, 0.04, 0.92) * (VB_W + 160);

      // pan so the pen sits ~60% across the visible area
      const scale = svg.clientHeight / VB_H;
      const visible = vp.clientWidth / scale;
      const pan = clamp(head - visible * 0.62, 0, Math.max(0, VB_W - visible));
      svg.style.transform = `translate3d(${-pan * scale}px,0,0)`;

      svg.querySelectorAll<SVGGraphicsElement>("[data-draw]").forEach((el) => {
        let r = extents.get(el);
        if (!r) {
          const b = el.getBBox();
          r = [b.x, b.x + Math.max(b.width, 60)];
          extents.set(el, r);
        }
        const t = clamp((head - r[0]) / (r[1] - r[0]));
        if (el.tagName === "text") el.style.opacity = String(t > 0.2 ? 1 : 0);
        else el.style.strokeDashoffset = String(1 - t);
      });

      // plane rides the flight arc
      if (planeRef.current) {
        const arc = svg.querySelector<SVGPathElement>("#flight");
        if (arc) {
          const b = arc.getBBox();
          const t = clamp((head - b.x) / b.width);
          const len = arc.getTotalLength();
          const pt = arc.getPointAtLength(t * len);
          const pt2 = arc.getPointAtLength(Math.min(len, t * len + 2));
          const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
          planeRef.current.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`);
          planeRef.current.style.opacity = t > 0 && t < 1 ? "1" : "0";
        }
      }

      // chapters
      const n = chapters.length;
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        if (reduce) {
          el.style.opacity = "1";
          el.style.transform = "none";
          return;
        }
        const a = i / n;
        const b = (i + 1) / n;
        const fadeIn = i === 0 ? 1 : easeOutCubic(seg(prog, a - 0.02, a + 0.06));
        const fadeOut = i === n - 1 ? 0 : seg(prog, b - 0.06, b + 0.02);
        const o = Math.min(fadeIn, 1 - fadeOut);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - fadeIn) * 24 - fadeOut * 24}px, 0)`;
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
      });
    },
    [chapters.length],
  );

  useScrollScene(section, onFrame);

  const line = { pathLength: 1, "data-draw": true } as const;

  return (
    <section
      ref={section}
      id="story"
      aria-labelledby="journey-title"
      className="relative h-[420vh] bg-turmeric text-char motion-reduce:h-auto"
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden md:top-[4.5rem] md:h-[calc(100svh-4.5rem)] motion-reduce:static motion-reduce:h-auto">
        <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 md:pt-12">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase">
            <span className="h-0.5 w-8 bg-current" aria-hidden /> Our story
          </p>
          <h2 id="journey-title" className="display mt-3 max-w-4xl text-[clamp(2.2rem,6.5vw,4.8rem)]">
            From a nook in Mumbai <span className="text-[#9c2414]">to the heart of Dubai.</span>
          </h2>

          <div className="relative mt-5 min-h-[9.5rem] max-w-xl sm:min-h-[8rem] motion-reduce:min-h-0 motion-reduce:space-y-6">
            {chapters.map((c, i) => (
              <div
                key={c.when}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className={`absolute inset-x-0 top-0 motion-reduce:static ${i === 0 ? "" : "invisible opacity-0"}`}
              >
                <p className="display text-3xl sm:text-4xl">
                  {c.when} <span className="text-lg tracking-[0.2em] text-[#5a3a00] sm:text-xl">· {c.where}</span>
                </p>
                <p className="mt-2 text-base leading-snug font-medium sm:text-lg">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={viewport} className="relative mt-auto mb-[calc(4.25rem+env(safe-area-inset-bottom))] h-[40svh] overflow-hidden md:mb-0 md:h-[54svh]" aria-hidden>
          <svg
            ref={track}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMinYMax meet"
            className="journey absolute bottom-0 left-0 h-full w-auto max-w-none will-change-transform"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* ground + sea */}
            <path {...line} d={`M0 ${GROUND} H${VB_W}`} />
            <path {...line} strokeWidth={2} d="M900 535 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" />

            {/* MUMBAI: Gateway of India */}
            <path {...line} d="M140 500 V270 H460 V500" />
            <path {...line} d="M140 310 H460 M140 290 H460" />
            <path {...line} d="M250 500 V380 Q300 300 350 380 V500" />
            <path {...line} d="M170 500 V420 Q190 395 210 420 V500 M390 500 V420 Q410 395 430 420 V500" />
            <path {...line} d="M140 270 V215 H185 V270 M415 270 V215 H460 V270" />
            <path {...line} d="M148 215 Q162 180 177 215 M423 215 Q437 180 452 215 M260 270 V245 H340 V270" />
            {/* Taj hotel */}
            <path {...line} d="M520 500 V310 H860 V500" />
            <path {...line} d="M640 310 V270 Q690 170 740 270 V310 M690 205 V180" />
            <path {...line} d="M530 310 Q552 270 574 310 M806 310 Q828 270 850 310" />
            <path {...line} strokeWidth={2} d="M540 350 H840 M540 390 H840 M540 430 H840 M540 470 H840" />
            {/* Bandra-Worli sea link */}
            <path {...line} d="M880 455 H1320" />
            <path {...line} d="M1100 455 V250 M1112 455 V250 M1100 250 H1112" />
            <path {...line} strokeWidth={2} d="M1106 262 L960 455 M1106 282 L1010 455 M1106 302 L1055 455 M1106 262 L1252 455 M1106 282 L1202 455 M1106 302 L1157 455" />
            <text data-draw x="300" y="585" textAnchor="middle" className="journey-label" stroke="none" fill="currentColor">
              Mumbai · 1987
            </text>

            {/* flight */}
            <path id="flight" {...line} strokeWidth={2.5} d="M1330 300 Q1650 40 1960 260" />
            <g ref={planeRef} style={{ opacity: 0 }}>
              <path d="M-16 0 L16 0 M4 0 L-6 -14 M4 0 L-6 14 M-14 0 L-20 -7 M-14 0 L-20 7" strokeWidth={3} />
            </g>
            <text data-draw x="1650" y="140" textAnchor="middle" className="journey-label" stroke="none" fill="currentColor">
              the next generation
            </text>

            {/* DUBAI: Burj Al Arab */}
            <path {...line} d="M1990 500 V190 Q2120 250 2140 500" />
            <path {...line} d="M1990 190 V140 M1990 260 Q2060 290 2100 380 M1990 330 Q2060 350 2120 440" />
            {/* Burj Khalifa */}
            <path {...line} d="M2230 500 V390 H2248 V300 H2264 V215 H2278 V130 H2286 V40 M2346 500 V390 H2328 V300 H2312 V215 H2298 V130 H2290 V40" />
            {/* Museum of the Future */}
            <path {...line} d="M2400 430 a72 92 0 1 0 144 0 a72 92 0 1 0 -144 0" />
            <path {...line} d="M2430 430 a42 58 0 1 0 84 0 a42 58 0 1 0 -84 0" />
            <path {...line} d="M2410 500 L2440 470 M2534 500 L2504 470" />
            {/* Dubai Frame */}
            <path {...line} d="M2600 500 V210 H2730 V500 M2622 500 V232 H2708 V500" />
            <text data-draw x="2330" y="585" textAnchor="middle" className="journey-label" stroke="none" fill="currentColor">
              Dubai
            </text>

            {/* KARAMA: Era Building shop + metro */}
            <path {...line} d="M2820 500 V260 H3110 V500" />
            <path {...line} strokeWidth={2} d="M2840 300 H3090 M2840 340 H3090" />
            <path {...line} d="M2850 410 H3030 L3015 385 H2865 Z" />
            <path {...line} d="M2900 500 V430 H2950 V500 M2975 440 H3020 V475 H2975 Z" />
            <path {...line} strokeWidth={2} d="M2925 380 c-8 -14 8 -20 0 -34 M2955 380 c-8 -14 8 -20 0 -34 M2985 380 c-8 -14 8 -20 0 -34" />
            <path {...line} d="M3200 500 V330 M3200 330 a34 34 0 1 1 0.1 0" />
            <path {...line} strokeWidth={4} d="M3184 315 V285 L3200 302 L3216 285 V315" />
            <text data-draw x="2965" y="585" textAnchor="middle" className="journey-label" stroke="none" fill="currentColor">
              Al Karama · today
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
