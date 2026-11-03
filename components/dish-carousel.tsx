"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Dish } from "@/data/signature";
import { ChevronIcon } from "./icons";

export function DishCarousel({ dishes }: { dishes: Dish[] }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border-2 border-cream/30 text-cream transition hover:border-turmeric hover:text-turmeric";

  return (
    <div>
      <div className="mx-auto mb-6 hidden max-w-7xl justify-end gap-3 px-4 sm:px-6 md:flex">
        <button type="button" className={arrow} onClick={() => scroll(-1)} aria-label="Previous dishes">
          <ChevronIcon className="rotate-180" />
        </button>
        <button type="button" className={arrow} onClick={() => scroll(1)} aria-label="Next dishes">
          <ChevronIcon />
        </button>
      </div>
      <ul
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 xl:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] xl:scroll-px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        aria-label="Signature dishes"
        tabIndex={0}
      >
        {dishes.map((d, i) => (
          <li
            key={d.name}
            className="group relative w-[78vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-char-2 ring-1 ring-cream/10 transition duration-300 hover:-translate-y-1 hover:ring-turmeric/60 sm:w-[20rem]"
          >
            <div className="relative grid aspect-[4/3.4] place-items-center overflow-hidden">
              <span
                aria-hidden
                className={`absolute top-1/2 left-1/2 size-[68%] -translate-1/2 rounded-full ${i % 2 ? "bg-turmeric/90" : "bg-chili/90"}`}
              />
              <Image
                src={d.image}
                alt={d.alt}
                sizes="(min-width: 640px) 300px, 74vw"
                className="relative w-[86%] drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)] transition duration-500 group-hover:scale-105 group-hover:-rotate-2"
              />
            </div>
            <div className="p-5 pt-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-[1.7rem]">{d.name}</h3>
              </div>
              <p className="mt-2 min-h-[3rem] text-[0.95rem] leading-snug text-muted">{d.line}</p>
              {d.price ? <p className="mt-4 text-sm font-bold tracking-wide text-turmeric">{d.price}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
