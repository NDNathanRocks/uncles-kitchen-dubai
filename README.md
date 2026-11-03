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

- `public/images/raw/` — original downloads (interior photo + 12 printed menu pages).
- `public/images/dishes/` — dish cut-outs taken from the menu pages.
- `scripts/process-images.py` regenerates the WebP assets and the menu PDF;
  `scripts/make-icons.py` regenerates the favicon / app icons from the stamp.
  Both need Python 3 with Pillow: `python scripts/process-images.py .`

The dish photos come from small images on the printed menu, so they are low resolution.
New close-up food photography (especially the chicken lollipop) would lift the site a lot.
