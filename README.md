# Uncle's Kitchen — website

Marketing site for Uncle's Kitchen, Mumbai-style Indo-Chinese in Al Karama, Dubai (since 1987).
Next.js (App Router, TypeScript) + Tailwind CSS. Every page is prerendered as static HTML.

## Edit business details

Everything the owner may need to change lives in **`config/site.ts`**:
phone, WhatsApp number and message, address, map query, opening hours, Google rating,
Instagram, and `ZOMATO_URL` (leave empty to hide every "Order" button).

The menu lives in **`data/menu.ts`** (transcribed from the printed menu pages in
`public/images/raw/`). Featured dishes on the homepage are in `data/signature.ts`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Images

- `public/images/raw/`: original downloads (interior photo + 12 printed menu pages).
- `public/images/menu/` and `public/uncles-kitchen-menu.pdf`: made by `python scripts/process-images.py .`
- `public/images/hero/plate-full.webp`: the hero plate. It is AI-generated (Stability AI on Bedrock,
  via `scripts/gen-image.py`) and is a stand-in until real food photography arrives.
- `public/images/banner-wok.webp` (from `raw/banner-wok.jpg`): dark banner behind the menu page header.
- `scripts/make-icons.py` regenerates the favicon / app icons from the stamp.

To add real dish photos: put full-frame photos in `public/images/`, import them in
`data/signature.ts` and set `image` (and `alt`) on a dish. The card shows the photo automatically.

## Motion

- Smooth scrolling: Lenis (`components/smooth-scroll.tsx`).
- 3D hero with ember glow, steam and heat shimmer: `components/hero-plate.tsx`.
- Pointer-tilt 3D cards: `components/tilt.tsx`.
- Drawn Mumbai-to-Dubai journey: `components/journey.tsx`.
- Tabbed menu panel (one category at a time, search, veg filter): `components/menu-panel.tsx`,
  used on the homepage and on `/menu`.
- Everything respects `prefers-reduced-motion`.
