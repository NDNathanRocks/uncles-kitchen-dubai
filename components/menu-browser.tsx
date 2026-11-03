"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { formatPrice, type MenuCategory, type MenuItem } from "@/data/menu";
import { ChilliIcon, SearchIcon } from "./icons";

type Filter = "all" | "veg" | "nonveg";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, " ");

export function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(categories[0]?.id);
  const q = useDeferredValue(query);

  const visible = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter((it) => {
          if (filter === "veg" && !it.veg) return false;
          if (filter === "nonveg" && it.veg) return false;
          if (!terms.length) return true;
          const hay = norm(`${it.name} ${it.description ?? ""} ${c.title}`);
          return terms.every((t) => hay.includes(t));
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, filter, q]);

  const total = visible.reduce((n, c) => n + c.items.length, 0);

  // Highlight the tab of the section currently in view.
  useEffect(() => {
    const els = visible.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id.replace("cat-", ""));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);

  // Keep the active tab scrolled into view in the tab strip.
  useEffect(() => {
    document.getElementById(`tab-${active}`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "auto" });
  }, [active]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "veg", label: "Veg" },
    { id: "nonveg", label: "Non-veg" },
  ];

  return (
    <div>
      <div className="sticky top-16 z-40 border-y border-cream/10 bg-char/95 backdrop-blur-md md:top-[4.5rem]">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
          <label className="relative flex-1">
            <span className="sr-only">Search the menu</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" width={18} height={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes: lollipop, hakka, paneer…"
              className="h-10 w-full rounded-full border border-cream/20 bg-char-2 pr-4 pl-11 text-cream placeholder:text-muted/80 focus:border-turmeric focus:outline-none"
            />
          </label>
          <fieldset className="flex shrink-0 self-start rounded-full sm:self-auto border border-cream/20 bg-char-2 p-1">
            <legend className="sr-only">Show</legend>
            {filters.map((f) => (
              <label
                key={f.id}
                className={`relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-bold transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-turmeric ${
                  filter === f.id ? "bg-turmeric text-char" : "text-cream hover:text-turmeric"
                }`}
              >
                <input
                  type="radio"
                  name="diet"
                  value={f.id}
                  checked={filter === f.id}
                  onChange={() => setFilter(f.id)}
                  className="sr-only"
                />
                {f.label}
              </label>
            ))}
          </fieldset>
        </div>
        <nav aria-label="Menu categories" className="mx-auto max-w-5xl">
          <ul className="no-scrollbar flex gap-1 overflow-x-auto px-4 pb-2.5 sm:px-6">
            {visible.map((c) => (
              <li key={c.id} className="shrink-0">
                <a
                  id={`tab-${c.id}`}
                  href={`#cat-${c.id}`}
                  aria-current={active === c.id ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition ${
                    active === c.id ? "bg-chili text-char" : "text-muted hover:text-cream"
                  }`}
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="sr-only" role="status" aria-live="polite">
          {total} dishes shown
        </p>
        {visible.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display text-4xl">Nothing matches that.</p>
            <p className="mt-3 text-muted">Try another word, or call us and we&rsquo;ll help you choose.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-6 rounded-full border-2 border-cream/40 px-5 py-2 font-bold hover:border-turmeric hover:text-turmeric"
            >
              Clear search
            </button>
          </div>
        ) : null}
        {visible.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} aria-labelledby={`h-${c.id}`} className="scroll-mt-48 pt-12 md:scroll-mt-44">
            <h2 id={`h-${c.id}`} className="display border-b-2 border-chili pb-3 text-4xl sm:text-5xl">
              {c.title}
            </h2>
            {c.note ? <p className="mt-3 text-sm text-muted">{c.note}</p> : null}
            <ul className="divide-y divide-cream/10">
              {c.items.map((it) => (
                <Row key={it.name} item={it} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function DietMark({ veg }: { veg: boolean }) {
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Veg" : "Non-veg"}
      className={`mt-1.5 grid size-4 shrink-0 place-items-center rounded-[3px] border-2 ${veg ? "border-veg" : "border-chili"}`}
    >
      {veg ? (
        <span className="size-1.5 rounded-full bg-veg" />
      ) : (
        <span className="size-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-chili" />
      )}
    </span>
  );
}

function Row({ item }: { item: MenuItem }) {
  const price = formatPrice(item.price);
  return (
    <li className="flex gap-3 py-5">
      <DietMark veg={item.veg} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-lg leading-snug font-bold text-cream">{item.name}</h3>
          {item.spice ? (
            <span className="flex text-chili" role="img" aria-label={item.spice === 2 ? "Spicy" : "Medium spicy"}>
              <ChilliIcon />
              {item.spice === 2 ? <ChilliIcon /> : null}
            </span>
          ) : null}
          {item.classic ? (
            <span className="rounded-sm bg-turmeric px-1.5 py-0.5 text-[0.68rem] font-bold tracking-wider text-char uppercase">
              Classic of 1987
            </span>
          ) : null}
        </div>
        {item.description ? <p className="mt-1 text-[0.95rem] leading-snug text-muted">{item.description}</p> : null}
      </div>
      <p className={`shrink-0 pt-0.5 text-right font-bold tabular-nums ${item.price === null ? "text-muted" : "text-turmeric"} ${Array.isArray(item.price) ? "max-w-[9rem] text-sm leading-6" : ""}`}>
        {Array.isArray(item.price)
          ? item.price.map((p) => (
              <span key={p.label} className="block whitespace-nowrap">
                <span className="font-medium text-muted">{p.label}</span> {p.aed}
              </span>
            ))
          : price}
      </p>
    </li>
  );
}
