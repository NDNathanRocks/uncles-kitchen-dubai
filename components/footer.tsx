import Link from "next/link";
import { links, site } from "@/config/site";
import { formatTime, groupedHours } from "@/lib/hours";
import { Stamp, Steam } from "./brand";
import { InstagramIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-char-2">
      <Steam className="pointer-events-none absolute -right-6 bottom-0 h-56 text-cream/5" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Stamp size="md" />
          <p className="mt-6 max-w-xs text-muted">{site.secondaryLine}.</p>
        </div>
        <div>
          <h2 className="display mb-3 text-xl text-turmeric">Find us</h2>
          <address className="leading-relaxed text-muted not-italic">
            {site.address.building}
            <br />
            {site.address.landmark}
            <br />
            {site.address.area}, {site.address.city}
          </address>
          <a href={links.directions} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-cream underline decoration-turmeric decoration-2 underline-offset-4 hover:text-turmeric">
            Get directions
          </a>
        </div>
        <div>
          <h2 className="display mb-3 text-xl text-turmeric">Hours</h2>
          <dl className="space-y-2 text-muted">
            {groupedHours().map((g) => (
              <div key={g.label}>
                <dt className="font-semibold text-cream">{g.label}</dt>
                <dd>{g.windows.map((w) => `${formatTime(w.open)} – ${formatTime(w.close)}`).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="display mb-3 text-xl text-turmeric">Say hello</h2>
          <ul className="space-y-2">
            <li>
              <a href={links.call} className="font-semibold text-cream hover:text-turmeric">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-turmeric">
                <InstagramIcon width={18} height={18} /> @{site.instagram.handle}
              </a>
            </li>
            <li>
              <Link href="/menu" className="text-muted hover:text-turmeric">
                Full menu
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm text-muted sm:px-6">© {site.name} · Since {site.foundedYear}</p>
      </div>
    </footer>
  );
}
