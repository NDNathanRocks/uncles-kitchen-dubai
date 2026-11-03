import Image from "next/image";
import type { Dish } from "@/data/signature";
import { ChilliIcon } from "./icons";
import { Tilt } from "./tilt";

/** Signature dishes as layered 3D cards. Swipes on phones, grid on larger screens. */
export function DishCards({ dishes }: { dishes: Dish[] }) {
  return (
    <ul
      className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-6 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
      aria-label="Signature dishes"
    >
      {dishes.map((d, i) => (
        <li key={d.name} className="reveal w-[80vw] max-w-[21rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
          <Tilt className="h-full rounded-2xl">
            <article className="relative flex h-full min-h-[17rem] flex-col rounded-2xl bg-char-2 p-6 ring-1 ring-cream/10 [transform-style:preserve-3d]">
              {d.image ? (
                <div className="relative -mx-6 -mt-6 mb-5 aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <Image src={d.image} alt={d.alt ?? d.name} fill sizes="(min-width: 1024px) 400px, 80vw" className="object-cover" />
                </div>
              ) : (
                <>
                  <span
                    aria-hidden
                    className="display pointer-events-none absolute top-3 right-5 text-[6.5rem] leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(242_183_5/0.4)] [transform:translateZ(50px)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </>
              )}

              <div className="mt-auto [transform:translateZ(36px)]">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {d.veg !== undefined ? (
                    <span
                      role="img"
                      aria-label={d.veg ? "Vegetarian" : "Non-vegetarian"}
                      className={`grid size-4 place-items-center rounded-[3px] border-2 ${d.veg ? "border-veg" : "border-chili"}`}
                    >
                      {d.veg ? (
                        <span className="size-1.5 rounded-full bg-veg" />
                      ) : (
                        <span className="size-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-chili" />
                      )}
                    </span>
                  ) : null}
                  {d.spice ? (
                    <span className="flex text-chili" role="img" aria-label={d.spice === 2 ? "Spicy" : "Medium spicy"}>
                      <ChilliIcon />
                      {d.spice === 2 ? <ChilliIcon /> : null}
                    </span>
                  ) : null}
                  {d.classic ? (
                    <span className="rounded-sm bg-turmeric px-1.5 py-0.5 text-[0.68rem] font-bold tracking-wider text-char uppercase">
                      Classic of 1987
                    </span>
                  ) : null}
                </div>
                <h3 className="display text-[2.1rem]">{d.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-snug text-muted">{d.line}</p>
                {d.price ? <p className="mt-4 text-sm font-bold tracking-wide text-turmeric">{d.price}</p> : null}
              </div>
            </article>
          </Tilt>
        </li>
      ))}
    </ul>
  );
}
