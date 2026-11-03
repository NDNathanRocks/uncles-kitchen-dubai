import { links } from "@/config/site";
import { ChatIcon, PhoneIcon, PinIcon } from "./icons";

/** Fixed bottom bar on phones: the main conversion element. */
export function MobileActionBar() {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[0.8rem] font-bold tracking-wide uppercase transition-colors";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-cream/10 bg-char pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a href={links.call} className={`${item} bg-chili text-char active:bg-[#f0563f]`}>
        <PhoneIcon /> Call
      </a>
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={`${item} text-cream active:bg-char-3`}>
        <ChatIcon /> WhatsApp
      </a>
      <a href={links.directions} target="_blank" rel="noopener noreferrer" className={`${item} bg-turmeric text-char active:bg-[#ffc81f]`}>
        <PinIcon /> Directions
      </a>
    </nav>
  );
}
