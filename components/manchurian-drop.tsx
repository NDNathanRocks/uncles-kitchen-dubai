"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useRef, type ReactNode } from "react";
import { easeOutCubic, seg, useScrollScene } from "@/lib/use-scroll-scene";

export type Piece = { src: StaticImageData; x: number; y: number; w: number; h: number };

type Props = {
  plateEmpty: StaticImageData;
  plateFull: StaticImageData;
  /** White-on-transparent mask of the chicken, used to keep the glint on the glaze */
  glazeMask: StaticImageData;
  pieces: Piece[];
  /** Headline block shown at the start, lifts away as the chicken falls */
  intro: ReactNode;
  /** Caption that appears once the plate is full */
  outro: ReactNode;
};

// Timeline (0..1 of the pinned scroll)
const INTRO_OUT: [number, number] = [0.02, 0.2];
const DROP_START = 0.14;
const DROP_SPAN = 0.62; // all pieces fall inside this window
const FALL = 0.2; // each piece's fall duration
const SWAP: [number, number] = [0.8, 0.9]; // pieces -> real full-plate photo
const OUTRO_IN: [number, number] = [0.84, 0.96];

// Deterministic per-piece spin so server and client agree.
const spin = (i: number) => ((i * 137) % 70) - 35;
const drift = (i: number) => ((i * 53) % 24) - 12;

export function ManchurianDrop({ plateEmpty, plateFull, glazeMask, pieces, intro, outro }: Props) {
  const section = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sheenRef = useRef<HTMLDivElement>(null);

  const onFrame = useCallback(
    (p: number, vh: number) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stage = stageRef.current;
      if (!stage) return;
      const stageBox = stage.getBoundingClientRect();

      // Intro lifts and fades
      const io = reduce ? 1 : easeOutCubic(seg(p, ...INTRO_OUT));
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - io);
        introRef.current.style.transform = `translate3d(0, ${-io * 18}vh, 0) scale(${1 - io * 0.08})`;
      }

      // Dive: on wide screens the plate starts beside the headline, then centres and grows
      if (!reduce && window.innerWidth >= 768) {
        const d = easeOutCubic(seg(p, 0, 0.22));
        stage.style.transform = `translate3d(${(1 - d) * 26}%, ${(1 - d) * 6}%, 0) scale(${0.78 + d * 0.22})`;
      } else {
        stage.style.transform = "";
      }

      // Pieces fall in order, gravity in, small squash on landing
      const n = pieces.length;
      pieceRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = DROP_START + (n > 1 ? (i / (n - 1)) * (DROP_SPAN - FALL) : 0);
        const t = reduce ? 1 : seg(p, start, start + FALL);
        const pieceTop = stageBox.top + (pieces[i].y / 100) * stageBox.height;
        const dist = pieceTop + vh * 0.35; // start fully above the viewport
        const y = -dist * (1 - t * t);
        const rot = spin(i) * (1 - t);
        const x = drift(i) * (1 - t);
        const land = seg(t, 0.92, 1);
        const squash = t >= 1 ? 1 : 1 - Math.sin(land * Math.PI) * 0.08;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${1 / squash}, ${squash})`;
        el.style.opacity = t <= 0 ? "0" : "1";
      });

      // Swap to the real plated photo, then sweep a glint across it
      const s = reduce ? 1 : seg(p, ...SWAP);
      if (fullRef.current) fullRef.current.style.opacity = String(s);
      pieceRefs.current.forEach((el) => {
        if (el && s > 0) el.style.opacity = String(1 - s);
      });
      if (sheenRef.current) {
        const g = reduce ? 0 : seg(p, 0.86, 1);
        sheenRef.current.style.opacity = g > 0 && g < 1 ? "1" : "0";
        sheenRef.current.style.setProperty("--sx", `${-60 + g * 220}%`);
      }

      const o = reduce ? 1 : easeOutCubic(seg(p, ...OUTRO_IN));
      if (outroRef.current) {
        outroRef.current.style.opacity = String(o);
        outroRef.current.style.transform = `translate3d(0, ${(1 - o) * 30}px, 0)`;
      }
    },
    [pieces],
  );

  useScrollScene(section, onFrame);

  return (
    <section ref={section} aria-labelledby="hero-title" className="relative h-[340vh] motion-reduce:h-auto">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden md:top-[4.5rem] md:h-[calc(100svh-4.5rem)] motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-[calc(100svh-4rem)]">
        {/* plate stage */}
        <div className="absolute inset-x-0 bottom-[calc(3.25rem+env(safe-area-inset-bottom))] flex justify-center md:bottom-[-10%]">
          <div ref={stageRef} className="relative aspect-square origin-bottom will-change-transform w-[min(118vw,84svh,980px)] md:w-[min(92vw,96svh,1040px)]">
            <div className="absolute inset-0 [mask-image:radial-gradient(closest-side,#000_78%,transparent_100%)]">
            <Image
              src={plateEmpty}
              alt=""
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 768px) 1040px, 118vw"
              className="object-contain"
            />
            </div>
            {pieces.map((pc, i) => (
              <div
                key={i}
                ref={(el) => {
                  pieceRefs.current[i] = el;
                }}
                className="absolute opacity-0 will-change-transform"
                style={{ left: `${pc.x}%`, top: `${pc.y}%`, width: `${pc.w}%`, height: `${pc.h}%` }}
                aria-hidden
              >
                <Image src={pc.src} alt="" fill sizes="20vw" className="object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.45)]" />
              </div>
            ))}
            <div ref={fullRef} className="absolute inset-0 opacity-0 [mask-image:radial-gradient(closest-side,#000_78%,transparent_100%)] motion-reduce:opacity-100">
              <Image
                src={plateFull}
                alt="Glossy chicken Manchurian on wok-tossed Hakka noodles with spring onions and sesame"
                fill
                loading="eager"
                sizes="(min-width: 768px) 1040px, 118vw"
                className="object-contain"
              />
              <div
                ref={sheenRef}
                aria-hidden
                className="sheen pointer-events-none absolute inset-0 opacity-0 mix-blend-screen"
                style={{ maskImage: `url(${glazeMask.src})`, WebkitMaskImage: `url(${glazeMask.src})` }}
              />
              <div
                aria-hidden
                className="sheen glisten pointer-events-none absolute inset-0 opacity-0 mix-blend-screen"
                style={{ maskImage: `url(${glazeMask.src})`, WebkitMaskImage: `url(${glazeMask.src})` }}
              />
            </div>
          </div>
        </div>

        {/* intro copy */}
        <div ref={introRef} className="relative z-10 will-change-transform motion-reduce:!opacity-100 motion-reduce:!transform-none">
          {intro}
        </div>

        {/* outro caption */}
        <div ref={outroRef} className="pointer-events-none absolute inset-x-0 top-0 z-10 opacity-0 motion-reduce:hidden">
          {outro}
        </div>
      </div>
    </section>
  );
}
