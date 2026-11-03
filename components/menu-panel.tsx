"use client";

import { useDeferredValue, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { formatPrice, type MenuCategory, type MenuItem } from "@/data/menu";
import { ChevronIcon, ChilliIcon, SearchIcon } from "./icons";

type Filter = "all" | "veg" | "nonveg";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, " ");

/**
 * The menu as one compact element: pick a category and only that category shows.
 * Search looks across everything. Veg / non-veg filter applies to both.
 */
export function MenuPanel({ categories, idPrefix = "m" }: { categories: MenuCategory[]; idPrefix?: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const q = useDeferredValue(query);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const uid = useId();

  const filtered = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          items: c.items.filter((it) => (filter === "veg" ? it.veg : filter === "nonveg" ? !it.veg : true)),
        }))
        .filter((c) => c.items.length > 0),
    [categories, filter],
  );

  const terms = norm(q).split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const results = useMemo(() => {
    if (!searching) return [];
    return filtered
      .map((c) => ({
        ...c,
        items: c.items.filter((it) => {
          const hay = norm(`${it.name} ${it.description ?? ""} ${c.title}`);
          return terms.every((t) => hay.includes(t));
        }),
      }))
      .filter((c) => c.items.length > 0);
    // terms derives from q
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, q]);

  const active = filtered.find((c) => c.id === activeId) ?? filtered[0];
  const index = active ? filtered.indexOf(active) : -1;
  const prev = index > 0 ? filtered[index - 1] : null;
  const next = index >= 0 && index < filtered.length - 1 ? filtered[index + 1] : null;

  const select = (id: string, focus = false) => {
    setActiveId(id);
    if (focus) tabRefs.current[id]?.focus();
    tabRefs.current[id]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    // keep the top of the panel in view (useful on phones after prev / next)
    const top = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 60) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
      if (lenis && panelRef.current) lenis.scrollTo(panelRef.current, { offset: -140 });
      else panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key) || index < 0) return;
    e.preventDefault();
    let i = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") i = (index + 1) % filtered.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") i = (index - 1 + filtered.length) % filtered.length;
    if (e.key === "Home") i = 0;
    if (e.key === "End") i = filtered.length - 1;
    select(filtered[i].id, true);
  };

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "veg", label: "Veg" },
    { id: "nonveg", label: "Non-veg" },
  ];
  const panelId = `${idPrefix}-panel`;
  const resultCount = results.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="rounded-3xl bg-char-2 ring-1 ring-cream/10">
      {/* controls */}
      <div className="flex flex-col gap-3 border-b border-cream/10 p-4 sm:flex-row sm:items-center sm:p-5">
        <label className="relative flex-1">
          <span className="sr-only">Search the menu</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" width={18} height={18} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: lollipop, hakka, paneer…"
            className="h-11 w-full rounded-full border border-cream/20 bg-char pr-4 pl-11 text-cream placeholder:text-muted/80 focus:border-turmeric focus:outline-none"
          />
        </label>
        <fieldset className="flex shrink-0 self-start rounded-full border border-cream/20 bg-char p-1 sm:self-auto">
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
                name={`${uid}-diet`}
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

      <div className="lg:grid lg:grid-cols-[17rem_1fr]">
        {/* category tabs: chips on phones, a list on desktop */}
        <div
          role="tablist"
          aria-label="Menu categories"
          aria-orientation="vertical"
          className={`no-scrollbar flex gap-1.5 overflow-x-auto border-b border-cream/10 p-3 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0 lg:p-4 ${
            searching ? "opacity-40" : ""
          }`}
        >
          {filtered.map((c) => {
            const on = !searching && c.id === active?.id;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[c.id] = el;
                }}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${c.id}`}
                aria-selected={on}
                aria-controls={panelId}
                tabIndex={on || (searching && c === filtered[0]) ? 0 : -1}
                onClick={() => {
                  setQuery("");
                  select(c.id);
                }}
                onKeyDown={onTabKey}
                className={`flex shrink-0 items-center justify-between gap-3 rounded-full px-3.5 py-2 text-left text-sm font-semibold whitespace-nowrap transition lg:rounded-xl lg:whitespace-normal ${
                  on ? "bg-chili text-char" : "text-muted hover:bg-char hover:text-cream"
                }`}
              >
                {c.title}
                <span className={`hidden text-xs tabular-nums lg:inline ${on ? "text-char/70" : "text-muted/70"}`}>{c.items.length}</span>
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div
          ref={panelRef}
          id={panelId}
          role="tabpanel"
          aria-labelledby={searching || !active ? undefined : `${idPrefix}-tab-${active.id}`}
          aria-label={searching ? `Search results for ${q}` : undefined}
          className="min-w-0 scroll-mt-40 p-4 sm:p-6 lg:p-8"
        >
          <p className="sr-only" role="status" aria-live="polite">
            {searching ? `${resultCount} dishes found` : active ? `${active.title}, ${active.items.length} dishes` : ""}
          </p>

          {searching ? (
            results.length === 0 ? (
              <div className="py-16 text-center">
                <p className="display text-3xl">Nothing matches that.</p>
                <p className="mt-2 text-muted">Try another word, or call us and we&rsquo;ll help you choose.</p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-5 rounded-full border-2 border-cream/40 px-5 py-2 font-bold hover:border-turmeric hover:text-turmeric"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div key={`s-${q}`} className="panel-in space-y-8">
                <p className="text-sm text-muted">
                  {resultCount} {resultCount === 1 ? "dish" : "dishes"} for &ldquo;{q}&rdquo;
                </p>
                {results.map((c) => (
                  <div key={c.id}>
                    <h3 className="display text-2xl text-turmeric">{c.title}</h3>
                    <Items items={c.items} />
                  </div>
                ))}
              </div>
            )
          ) : active ? (
            <div key={active.id} className="panel-in">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-chili pb-3">
                <h3 className="display text-4xl sm:text-5xl">{active.title}</h3>
                <p className="text-sm text-muted">{active.items.length} dishes</p>
              </div>
              {active.note ? <p className="mt-3 text-sm text-muted">{active.note}</p> : null}
              <Items items={active.items} />

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 pt-5">
                {prev ? (
                  <button type="button" onClick={() => select(prev.id)} className="group inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-cream">
                    <ChevronIcon className="rotate-180 transition group-hover:-translate-x-0.5" width={18} height={18} /> {prev.title}
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button
                    type="button"
                    onClick={() => select(next.id)}
                    className="group inline-flex items-center gap-2 rounded-full bg-turmeric px-4 py-2 text-sm font-bold text-char hover:bg-[#ffc81f]"
                  >
                    Next: {next.title} <ChevronIcon className="transition group-hover:translate-x-0.5" width={18} height={18} />
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Items({ items }: { items: MenuItem[] }) {
  return (
    <ul className="grid gap-x-10 xl:grid-cols-2">
      {items.map((it) => (
        <Row key={it.name} item={it} />
      ))}
    </ul>
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
  return (
    <li className="flex gap-3 border-b border-cream/10 py-4">
      <DietMark veg={item.veg} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h4 className="leading-snug font-bold text-cream">{item.name}</h4>
          {item.spice ? (
            <span className="flex text-chili" role="img" aria-label={item.spice === 2 ? "Spicy" : "Medium spicy"}>
              <ChilliIcon />
              {item.spice === 2 ? <ChilliIcon /> : null}
            </span>
          ) : null}
          {item.classic ? (
            <span className="rounded-sm bg-turmeric px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-char uppercase">
              Classic of 1987
            </span>
          ) : null}
        </div>
        {item.description ? <p className="mt-1 text-sm leading-snug text-muted">{item.description}</p> : null}
      </div>
      <p
        className={`shrink-0 pt-0.5 text-right font-bold tabular-nums ${item.price === null ? "text-muted" : "text-turmeric"} ${
          Array.isArray(item.price) ? "text-sm leading-6" : ""
        }`}
      >
        {Array.isArray(item.price)
          ? item.price.map((p) => (
              <span key={p.label} className="block whitespace-nowrap">
                <span className="font-medium text-muted">{p.label}</span> {p.aed}
              </span>
            ))
          : formatPrice(item.price)}
      </p>
    </li>
  );
}
