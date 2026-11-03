import Image from "next/image";
import { links, site } from "@/config/site";
import { instagramTiles, signatureDishes } from "@/data/signature";
import interior from "@/public/images/interior-1.webp";
import mural from "@/public/images/mural-mumbai-dubai.webp";
import heroPlate from "@/public/images/dishes/chicken-chilli-dry.webp";
import { Eyebrow, Stamp, Steam } from "@/components/brand";
import { ButtonLink } from "@/components/buttons";
import { DishCarousel } from "@/components/dish-carousel";
import { HoursTable, OpenBadge } from "@/components/live-hours";
import { ArrowIcon, BagIcon, ChatIcon, InstagramIcon, PhoneIcon, PinIcon, Stars } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />
      <SignatureBand />
      <Signature />
      <Story />
      <Rating />
      <Instagram />
      <Visit />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden md:min-h-[calc(100svh-4.5rem)]">
      <Image
        src={interior}
        alt="The Uncle's Kitchen dining room in Karama: red and yellow walls, pendant lamps and a Dubai skyline mural"
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        quality={50}
        placeholder="blur"
        className="-z-20 object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-char/75" aria-hidden />
      <div className="pointer-events-none absolute right-[3%] bottom-[14%] hidden w-[min(27vw,26rem)] lg:block" aria-hidden>
        <Steam className="absolute -top-40 left-1/2 h-48 -translate-x-1/2 text-cream/30" />
        <span className="absolute inset-[8%] rounded-full bg-chili" />
        <Image
          src={heroPlate}
          alt=""
          sizes="26rem"
          className="rise-in-delay relative w-full rotate-[-8deg] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-24 pb-20 sm:px-6 md:pb-20">
        <div className="rise-in">
          <OpenBadge />
        </div>
        <h1 id="hero-title" className="display rise-in mt-6 text-[clamp(3.6rem,15vw,10.5rem)] text-cream">
          Mumbai&rsquo;s <span className="block">Desi Chinese.</span>
          <span className="block text-turmeric">In Karama.</span>
        </h1>
        <p className="rise-in-delay mt-6 max-w-xl text-lg font-medium text-cream/90 sm:text-xl">
          Since 1987 <span className="px-1 text-chili" aria-hidden>·</span> Behind BurJuman Metro, Exit 2
        </p>
        <div className="rise-in-delay mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/menu" variant="yellow">
            See the menu <ArrowIcon width={18} height={18} />
          </ButtonLink>
          <ButtonLink href={links.directions} external variant="outline">
            <PinIcon width={18} height={18} /> Get directions
          </ButtonLink>
          {links.zomato ? (
            <ButtonLink href={links.zomato} external variant="red">
              <BagIcon width={18} height={18} /> Order on Zomato
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
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
            Mumbai-style favourites from the family kitchen. Swipe through, then see the full menu.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <DishCarousel dishes={signatureDishes} />
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        <ButtonLink href="/menu" variant="outline">
          Full menu &amp; prices <ArrowIcon width={18} height={18} />
        </ButtonLink>
      </div>
    </section>
  );
}

const timeline = [
  {
    when: "1987",
    where: "Malad West, Mumbai",
    text: "Jerome D'Souza opens Uncle's Kitchen and becomes one of the pioneers of Mumbai's Indo-Chinese food.",
  },
  {
    when: "Next generation",
    where: "Dubai",
    text: "His sons, Sunny and Ronnie D'Souza, bring the family kitchen to Dubai for everyone who misses Mumbai-style Chinese.",
  },
  {
    when: "Today",
    where: "Al Karama",
    text: "Era Building, Exit 2, behind BurJuman Metro. The recipes and the base sauces still come from Mumbai.",
  },
];

function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-char-2 py-20 md:py-28">
      <Steam className="pointer-events-none absolute -top-4 left-[45%] hidden h-48 text-turmeric/15 lg:block" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Eyebrow className="text-turmeric">Our story</Eyebrow>
          <h2 id="story-title" className="display reveal text-[clamp(2.6rem,7vw,5rem)]">
            From a nook in Mumbai <span className="text-chili">to the heart of Dubai.</span>
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
            <p>
              In 1987, <strong className="font-semibold text-cream">Jerome D&rsquo;Souza</strong> opened Uncle&rsquo;s Kitchen
              in Malad West, Mumbai. He was one of the pioneers of the city&rsquo;s Indo-Chinese cooking: the saucy,
              wok-charred &ldquo;desi Chinese&rdquo; a whole generation grew up on.
            </p>
            <p>
              His sons, <strong className="font-semibold text-cream">Sunny and Ronnie D&rsquo;Souza</strong>, brought it to
              Dubai so Indian expats could get the Mumbai-style Chinese they remember from home. To keep the taste true,
              the family has brought its base sauces over from Mumbai.
            </p>
          </div>
        </div>

        <figure className="reveal self-center">
          <div className="relative -rotate-1 overflow-hidden rounded-2xl ring-1 ring-cream/10">
            <Image
              src={mural}
              alt="Line-drawn mural on the restaurant's yellow wall tracing Mumbai's skyline into Dubai's, with the words 'The Legacy Continues'"
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              className="w-full"
            />
            <div className="absolute bottom-3 left-3">
              <Stamp size="sm" />
            </div>
          </div>
          <figcaption className="mt-4 text-sm text-muted">
            The wall in Karama: Mumbai&rsquo;s skyline running into Dubai&rsquo;s. &ldquo;The legacy continues.&rdquo;
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <ol className="grid gap-0 md:grid-cols-3">
          {timeline.map((t, i) => (
            <li key={t.when} className="reveal relative border-l-2 border-cream/15 pb-10 pl-6 md:border-t-2 md:border-l-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0">
              <span
                aria-hidden
                className={`absolute top-0 -left-[9px] size-4 rotate-45 md:-top-[9px] md:left-0 ${i === 0 ? "bg-chili" : i === 1 ? "bg-turmeric" : "bg-cream"}`}
              />
              <p className="display text-4xl text-cream md:text-5xl">{t.when}</p>
              <p className="mt-1 text-sm font-bold tracking-[0.2em] text-turmeric uppercase">{t.where}</p>
              <p className="mt-3 max-w-sm text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Rating() {
  return (
    <section aria-labelledby="rating-title" className="relative overflow-hidden bg-chili py-16 text-char md:py-20">
      <Steam className="pointer-events-none absolute -bottom-6 left-4 h-52 text-char/15" />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="rating-title" className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="display text-[clamp(5rem,16vw,9rem)] leading-[0.8] text-cream">{site.rating.value}</span>
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
    <section aria-labelledby="ig-title" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-chili">On Instagram</Eyebrow>
            <h2 id="ig-title" className="display text-[clamp(2.2rem,6vw,4rem)] break-all sm:break-normal">
              @{site.instagram.handle}
            </h2>
          </div>
          <ButtonLink href={links.instagram} external variant="outline">
            <InstagramIcon width={18} height={18} /> Follow us
          </ButtonLink>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((t) => (
            <li key={t.alt}>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.alt}. See more on Instagram`}
                className="group relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-char-2 ring-1 ring-cream/10 transition hover:ring-turmeric"
              >
                <Image
                  src={t.image}
                  alt=""
                  sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                  className="w-[88%] transition duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-char/70 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                  <InstagramIcon width={32} height={32} className="text-turmeric" />
                </span>
              </a>
            </li>
          ))}
        </ul>
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

          <div className="mt-10 rounded-2xl bg-char p-5 ring-1 ring-cream/10">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="display text-2xl">Opening hours</h3>
              <OpenBadge className="text-xs" />
            </div>
            <HoursTable />
            <p className="mt-3 text-xs text-muted">Dubai time. Lunch and dinner sittings every day.</p>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl ring-1 ring-cream/10 lg:min-h-full">
          <iframe
            title={`Map showing ${site.name}, ${site.address.building}, ${site.address.area}`}
            src={links.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
