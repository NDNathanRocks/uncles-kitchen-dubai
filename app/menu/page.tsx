import type { Metadata } from "next";
import Image from "next/image";
import { links, site } from "@/config/site";
import { menu, menuNotes, menuPages } from "@/data/menu";
import { Eyebrow, Steam } from "@/components/brand";
import { ButtonLink } from "@/components/buttons";
import { ChatIcon, ChilliIcon, DownloadIcon, PhoneIcon } from "@/components/icons";
import { MenuBrowser } from "@/components/menu-browser";

export const metadata: Metadata = {
  title: "Menu & Prices",
  description:
    "The full Uncle's Kitchen menu with prices in AED: chicken lollipop, Hakka noodles, paneer chilli, Manchurian, Szechwan rice and more. Mumbai-style Indo-Chinese in Karama, near BurJuman.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu", title: "Uncle's Kitchen Menu · Mumbai-style Indo-Chinese in Karama" },
};

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-14 pb-10 md:pt-20">
        <Steam className="pointer-events-none absolute top-6 right-4 h-44 text-turmeric/20 md:right-[12%]" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Eyebrow className="text-chili">Since 1987</Eyebrow>
          <h1 className="display text-[clamp(3.6rem,14vw,8rem)]">
            The <span className="text-turmeric">menu</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Every price in AED, straight from our printed menu. Dishes marked <em className="text-cream not-italic">Classic of 1987</em>{" "}
            have been with us since Mumbai.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="grid size-4 place-items-center rounded-[3px] border-2 border-veg"><span className="size-1.5 rounded-full bg-veg" /></span> Veg
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="grid size-4 place-items-center rounded-[3px] border-2 border-chili"><span className="size-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-chili" /></span> Non-veg
            </span>
            <span className="inline-flex items-center gap-1 text-chili"><ChilliIcon /> <span className="text-muted">Medium spicy</span></span>
            <span className="inline-flex items-center gap-0 text-chili"><ChilliIcon /><ChilliIcon /> <span className="ml-1 text-muted">Spicy</span></span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={links.menuPdf} variant="yellow" download>
              <DownloadIcon width={18} height={18} /> Download menu (PDF)
            </ButtonLink>
            <ButtonLink href="#menu-pages" variant="outline">
              View printed pages
            </ButtonLink>
          </div>
        </div>
      </section>

      <MenuBrowser categories={menu} />

      <section aria-labelledby="notes-title" className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl bg-turmeric p-6 text-char sm:p-8">
          <h2 id="notes-title" className="display text-3xl">Good to know</h2>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 font-medium">
            {menuNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="menu-pages" aria-labelledby="pages-title" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6">
        <h2 id="pages-title" className="display text-4xl sm:text-5xl">The printed menu</h2>
        <p className="mt-3 text-muted">Tap a page to open the full-size original.</p>
        <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {menuPages.map((p) => (
            <li key={p.page}>
              <a
                href={p.original}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg ring-1 ring-cream/10 transition hover:-translate-y-1 hover:ring-turmeric"
              >
                <Image
                  src={p.src}
                  alt={`${site.name} printed menu, page ${p.page}`}
                  width={793}
                  height={1122}
                  sizes="(min-width: 768px) 150px, 30vw"
                  className="h-auto w-full"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Floating call / WhatsApp (desktop and tablet; phones use the bottom action bar) */}
      <div className="fixed right-5 bottom-5 z-40 hidden flex-col gap-3 md:flex">
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          className="grid size-14 place-items-center rounded-full bg-cream text-char shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:bg-turmeric"
        >
          <ChatIcon width={24} height={24} />
        </a>
        <a
          href={links.call}
          aria-label={`Call ${site.name}`}
          className="grid size-14 place-items-center rounded-full bg-chili text-char shadow-lg shadow-black/40 transition hover:-translate-y-0.5"
        >
          <PhoneIcon width={24} height={24} />
        </a>
      </div>
    </>
  );
}
