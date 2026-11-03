import Link from "next/link";
import { links } from "@/config/site";
import { LogoLink } from "./brand";
import { btn } from "./buttons";
import { BagIcon, PhoneIcon } from "./icons";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Story" },
  { href: "/#visit", label: "Visit" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-char/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 md:h-[4.5rem]">
        <LogoLink size="sm" />
        <nav aria-label="Main" className="ml-auto md:ml-8">
          <ul className="flex items-center gap-1 sm:gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="rounded-full px-3 py-2 text-sm font-semibold tracking-wide text-cream/90 uppercase transition-colors hover:text-turmeric"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          {links.zomato ? (
            <a href={links.zomato} target="_blank" rel="noopener noreferrer" className={btn("outline", "min-h-10 px-5 text-sm")}>
              <BagIcon width={18} height={18} /> Order
            </a>
          ) : null}
          <a href={links.call} className={btn("red", "min-h-10 px-5 text-sm")}>
            <PhoneIcon width={18} height={18} /> Call
          </a>
        </div>
      </div>
    </header>
  );
}
