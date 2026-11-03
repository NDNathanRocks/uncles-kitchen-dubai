import { links, site } from "@/config/site";
import { signatureDishes } from "@/data/signature";
import { menu } from "@/data/menu";
import { MenuPanel } from "@/components/menu-panel";
import heroPlate from "@/public/images/hero/plate-full.webp";
import { HeroPlate } from "@/components/hero-plate";
import { Journey } from "@/components/journey";
import { Tilt } from "@/components/tilt";
import { Eyebrow } from "@/components/brand";
import { ButtonLink, btn } from "@/components/buttons";
import { DishCards } from "@/components/dish-cards";
import { HoursTable, OpenBadge } from "@/components/live-hours";
import { ArrowIcon, BagIcon, ChatIcon, InstagramIcon, PhoneIcon, PinIcon, Stars } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />
      <SignatureBand />
      <Journey chapters={timeline} />
      <Signature />
      <MenuSection />
      <Rating />
      <Instagram />
      <Visit />
    </>
  );
}

function Hero() {
  return (
    <HeroPlate
      image={heroPlate}
      alt="Glossy chicken Manchurian on wok-tossed Hakka noodles with spring onions and sesame, steam rising"
      intro={
        <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 md:pt-14">
          <OpenBadge />
          <h1 id="hero-title" className="display mt-5 text-[clamp(3.2rem,13vw,8.5rem)] text-cream [text-shadow:0_4px_30px_rgb(20_17_15/0.7)]">
            Mumbai&rsquo;s <span className="block">Desi Chinese.</span>
            <span className="block text-turmeric">In Karama.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-cream/90 sm:text-xl">
            Since 1987 <span className="px-1 text-chili" aria-hidden>·</span> Behind BurJuman Metro, Exit 2
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/menu" variant="yellow">
              See the menu <ArrowIcon width={18} height={18} />
            </ButtonLink>
            <ButtonLink href={links.directions} external variant="outline" className="bg-char/60">
              <PinIcon width={18} height={18} /> Get directions
            </ButtonLink>
            {links.zomato ? (
              <ButtonLink href={links.zomato} external variant="red">
                <BagIcon width={18} height={18} /> Order on Zomato
              </ButtonLink>
            ) : null}
          </div>
          <p className="mt-8 hidden items-center gap-3 text-xs font-bold tracking-[0.3em] text-muted uppercase md:flex motion-reduce:hidden" aria-hidden>
            <span className="scroll-cue h-8 w-[2px] bg-turmeric" /> Scroll
          </p>
        </div>
      }
      caption={
        <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 md:pt-14">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-turmeric uppercase">
            <span className="h-0.5 w-8 bg-current" aria-hidden /> Fresh off the wok
          </p>
          <p className="display mt-3 text-[clamp(2.6rem,8vw,6rem)] text-cream [text-shadow:0_4px_30px_rgb(20_17_15/0.8)]">
            Saucy. Smoky. <span className="text-chili">Mumbai.</span>
          </p>
        </div>
      }
    />
  );
}

const bandWords = [
  "Chicken Lollipop",
  "Hakka Noodles",
  "Paneer Chilli",
  "Chicken in Garlic Sauce",
  "Crispy Noodles",
  "Coriander Chicken",
  "Sweet Corn Soup",
];

function SignatureBand() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {bandWords.map((w) => (
        <li key={w} className="display flex items-center text-2xl text-char sm:text-3xl">
          <span className="px-5">{w}</span>
          <span className="size-2 rotate-45 bg-chili" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-turmeric py-4">
      <h2 className="sr-only">House favourites</h2>
      <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function Signature() {
  return (
    <section aria-labelledby="sig-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Eyebrow className="text-chili">The classics</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="sig-title" className="display reveal max-w-3xl text-[clamp(2.8rem,8vw,5.5rem)]">
            Wok-tossed <span className="text-turmeric">since 1987</span>
          </h2>
          <p className="max-w-sm text-muted">
            Mumbai-style favourites from the family kitchen, with today&rsquo;s menu prices.
          </p>
        </div>
      </div>
      <div className="mt-12">
        <DishCards dishes={signatureDishes} />
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-chili">The full menu</Eyebrow>
            <h2 id="menu-title" className="display reveal text-[clamp(2.6rem,7vw,4.8rem)]">
              Pick a <span className="text-turmeric">craving.</span>
            </h2>
          </div>
          <ButtonLink href="/menu" variant="outline">
            Menu page &amp; PDF <ArrowIcon width={18} height={18} />
          </ButtonLink>
        </div>
        <MenuPanel categories={menu} idPrefix="home-menu" />
      </div>
    </section>
  );
}

const timeline = [
  {
    when: "1987",
    where: "Malad West, Mumbai",
    text: "Jerome D'Souza opens Uncle's Kitchen and becomes one of the pioneers of Mumbai's Indo-Chinese food: saucy, wok-charred “desi Chinese”.",
  },
  {
    when: "Next generation",
    where: "Dubai",
    text: "His sons, Sunny and Ronnie D'Souza, bring it to Dubai so Indian expats can get the Mumbai-style Chinese they grew up with.",
  },
  {
    when: "Today",
    where: "Al Karama",
    text: "Era Building, Exit 2, behind BurJuman Metro. To keep the taste the same, the base sauces come over from Mumbai.",
  },
];

function Rating() {
  return (
    <section aria-labelledby="rating-title" className="relative overflow-hidden bg-chili py-16 text-char md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="rating-title" className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="display reveal text-[clamp(5rem,16vw,9rem)] leading-[0.8] text-cream [text-shadow:0_1px_0_#c9301e,0_2px_0_#b72a1a,0_3px_0_#a42416,0_4px_0_#911f12,0_10px_24px_rgb(0_0_0/0.35)]">{site.rating.value}</span>
            <span className="pb-1">
              <Stars value={site.rating.value} className="mb-2 block text-2xl text-char" />
              <span className="display block text-3xl sm:text-4xl">
                on Google · {site.rating.count} reviews
              </span>
            </span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="mb-5 text-lg font-medium">
            See what Dubai says about us, then come and taste it for yourself.
          </p>
          <ButtonLink href={links.reviews} external variant="dark">
            Read reviews on Google <ArrowIcon width={18} height={18} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section aria-labelledby="ig-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Tilt max={5} className="reveal rounded-3xl">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-8 rounded-3xl bg-char-2 p-6 ring-1 ring-cream/10 transition hover:ring-turmeric/60 sm:p-12 md:flex-row md:items-end md:justify-between"
          >
            <div className="[transform:translateZ(40px)]">
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-chili uppercase">
                <span className="h-0.5 w-8 bg-current" aria-hidden /> On Instagram
              </p>
              <h2 id="ig-title" className="display mt-4 text-[clamp(1.9rem,8.5vw,4.5rem)] leading-[1.05]">
                @
                {site.instagram.handle.split("_").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 ? (
                      <>
                        _<wbr />
                      </>
                    ) : null}
                  </span>
                ))}
              </h2>
              <p className="mt-3 max-w-md text-muted">New dishes, the wok in action and what&rsquo;s cooking in Karama.</p>
            </div>
            <span className={`${btn("yellow")} self-start [transform:translateZ(60px)] md:self-auto`}>
              <InstagramIcon width={18} height={18} /> Follow us
            </span>
          </a>
        </Tilt>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-cream/10 bg-char-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow className="text-turmeric">Visit us</Eyebrow>
          <h2 id="visit-title" className="display reveal text-[clamp(2.8rem,8vw,5.5rem)]">
            Come <span className="text-chili">hungry.</span>
          </h2>
          <address className="mt-8 text-xl leading-relaxed text-cream not-italic">
            {site.address.building}
            <br />
            <mark className="my-1 inline-block -rotate-1 bg-turmeric px-2 py-0.5 font-bold text-char">
              Exit 2, behind BurJuman Metro
            </mark>
            <br />
            {site.address.area}, {site.address.city}
          </address>
          <p className="mt-3 text-muted">
            Take the Metro to BurJuman, leave by Exit 2 and we&rsquo;re right behind the station.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={links.call} variant="red">
              <PhoneIcon width={18} height={18} /> Call {site.phone.display}
            </ButtonLink>
            <ButtonLink href={links.whatsapp} external variant="outline">
              <ChatIcon width={18} height={18} /> WhatsApp
            </ButtonLink>
            <ButtonLink href={links.directions} external variant="yellow">
              <PinIcon width={18} height={18} /> Directions
            </ButtonLink>
          </div>

          <Tilt max={4} lift={10} className="mt-10 rounded-2xl">
          <div className="rounded-2xl bg-char p-5 ring-1 ring-cream/10">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="display text-2xl">Opening hours</h3>
              <OpenBadge className="text-xs" />
            </div>
            <HoursTable />
            <p className="mt-3 text-xs text-muted">Dubai time. Lunch and dinner sittings every day.</p>
          </div>
          </Tilt>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl ring-1 ring-cream/10 lg:min-h-full">
          <iframe
            title={`Map showing ${site.name}, ${site.address.building}, ${site.address.area}`}
            src={links.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-embed absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
