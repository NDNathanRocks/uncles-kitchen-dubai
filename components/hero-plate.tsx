"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, easeOutCubic, seg } from "@/lib/use-scroll-scene";

/**
 * Pinned 3D hero. As you scroll, the plate lifts from a low angle toward you
 * and the headline drifts back. It also turns gently with the pointer.
 * Everything eases toward its target each frame, so motion never snaps.
 * Heat: ember glow behind the plate, rising steam, and a light heat shimmer.
 */
export function HeroPlate({
  image,
  alt,
  intro,
  caption,
}: {
  image: StaticImageData;
  alt: string;
  intro: ReactNode;
  caption: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

    const target = { p: 0, mx: 0, my: 0 };
    const cur = { p: 0, mx: 0, my: 0 };
    let raf = 0;
    let visible = true;

    const readScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      target.p = total > 0 ? clamp(-r.top / total) : 0;
    };

    const apply = () => {
      const e = easeOutCubic(cur.p);
      const wide = innerWidth >= 768;
      if (plate.current) {
        const rx = 38 * (1 - e) + cur.my * -5;
        const ry = cur.mx * 7;
        const ty = (1 - e) * (wide ? 10 : 6);
        const tx = wide ? (1 - e) * 18 : 0;
        const s = (wide ? 0.82 : 0.9) + e * (wide ? 0.34 : 0.22);
        plate.current.style.transform = `translate3d(${tx}%, ${ty}%, 0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      }
      if (shadow.current) {
        shadow.current.style.opacity = (0.55 - e * 0.25).toFixed(3);
        shadow.current.style.transform = `translate3d(${cur.mx * -18}px, 0, 0) scale(${(1 + e * 0.15).toFixed(3)}, ${(0.5 - e * 0.2).toFixed(3)})`;
      }
      if (introRef.current) {
        const o = 1 - seg(cur.p, 0.28, 0.62);
        introRef.current.style.opacity = o.toFixed(3);
        introRef.current.style.transform = `translate3d(0, ${(-cur.p * 22).toFixed(2)}vh, 0) scale(${(1 - cur.p * 0.06).toFixed(3)})`;
        introRef.current.style.visibility = o < 0.01 ? "hidden" : "visible";
      }
      if (captionRef.current) {
        const c = easeOutCubic(seg(cur.p, 0.6, 0.92));
        captionRef.current.style.opacity = c.toFixed(3);
        captionRef.current.style.transform = `translate3d(0, ${((1 - c) * 24).toFixed(1)}px, 0)`;
      }
      if (glow.current) {
        glow.current.style.transform = `translate3d(${cur.mx * 20}px, ${cur.my * 14}px, 0) scale(${(0.9 + e * 0.25).toFixed(3)})`;
      }
    };

    const tick = () => {
      cur.p += (target.p - cur.p) * 0.1;
      cur.mx += (target.mx - cur.mx) * 0.06;
      cur.my += (target.my - cur.my) * 0.06;
      apply();
      const settled =
        Math.abs(target.p - cur.p) < 0.0005 && Math.abs(target.mx - cur.mx) < 0.001 && Math.abs(target.my - cur.my) < 0.001;
      raf = settled || !visible ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      readScroll();
      kick();
    };
    const onPointer = (ev: PointerEvent) => {
      target.mx = (ev.clientX / innerWidth) * 2 - 1;
      target.my = (ev.clientY / innerHeight) * 2 - 1;
      kick();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(el);

    readScroll();
    cur.p = target.p;
    apply();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    if (finePointer) addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("pointermove", onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={section} aria-labelledby="hero-title" className="relative h-[230vh] motion-reduce:h-auto">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden [perspective:1300px] md:top-[4.5rem] md:h-[calc(100svh-4.5rem)] motion-reduce:static">
        {/* ember glow */}
        <div
          ref={glow}
          aria-hidden
          className="ember pointer-events-none absolute bottom-[2%] left-1/2 -ml-[min(62vw,560px)] aspect-square w-[min(124vw,1120px)] rounded-full md:bottom-[-18%]"
        />

        {/* plate */}
        <div className="absolute inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] flex justify-center md:bottom-[-14%]">
          <div className="relative aspect-square w-[min(112vw,80svh,960px)] md:w-[min(86vw,98svh,1000px)]">
            <div
              ref={shadow}
              aria-hidden
              className="absolute inset-x-[14%] bottom-[4%] h-[40%] rounded-[50%] bg-black/80 opacity-50 blur-3xl"
            />
            <div
              ref={plate}
              className="relative size-full origin-[50%_70%] [transform-style:preserve-3d] will-change-transform motion-reduce:!transform-none"
              style={{ transform: "translate3d(0,6%,0) rotateX(38deg) scale(0.9)" }}
            >
              <div className="absolute inset-0 [mask-image:radial-gradient(closest-side,#000_80%,transparent_100%)]">
                <Image src={image} alt={alt} fill preload fetchPriority="high" sizes="(min-width: 768px) 1000px, 112vw" className="object-cover" />
                {/* heat shimmer over the upper half (desktop, motion on) */}
                <div aria-hidden className="heat absolute inset-0 hidden md:block motion-reduce:!hidden">
                  <Image src={image} alt="" fill sizes="1000px" className="object-cover" />
                </div>
                {/* slow glint, only shows on the bright, glossy parts */}
                <div
                  aria-hidden
                  className="glint absolute inset-0 hidden md:block motion-reduce:!hidden"
                  style={{ maskImage: `url(${image.src})`, WebkitMaskImage: `url(${image.src})` }}
                />
              </div>
              {/* steam floats above the plate in 3D */}
              <svg
                aria-hidden
                viewBox="0 0 300 260"
                className="steam-3d pointer-events-none absolute top-[2%] left-1/2 w-[46%] -translate-x-1/2 [transform:translateZ(90px)] motion-reduce:hidden"
                fill="none"
                stroke="white"
                strokeLinecap="round"
              >
                <path className="wisp" d="M100 250 C80 200 130 170 105 120 C85 80 125 50 110 10" strokeWidth="10" />
                <path className="wisp" d="M155 250 C135 205 185 175 158 125 C138 85 178 55 162 15" strokeWidth="12" />
                <path className="wisp" d="M205 250 C188 210 232 178 208 132 C190 95 226 62 212 22" strokeWidth="9" />
              </svg>
            </div>
          </div>
        </div>

        <div ref={introRef} className="relative z-10 will-change-transform">
          {intro}
        </div>

        <div
          ref={captionRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 opacity-0 will-change-transform motion-reduce:hidden"
        >
          {caption}
        </div>
      </div>

      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <filter id="heat-haze" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.045" numOctaves="2" seed="7">
            <animate attributeName="baseFrequency" values="0.008 0.045;0.0095 0.06;0.008 0.05;0.008 0.045" dur="5s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </section>
  );
}
