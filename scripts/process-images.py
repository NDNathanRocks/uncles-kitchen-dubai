"""Convert the raw downloads into web assets.

- public/images/raw/interior-1.jpg      -> public/images/interior-1.webp
- public/images/raw/menu-page-*.png     -> public/images/menu/*.webp
- all menu pages                        -> public/uncles-kitchen-menu.pdf

Usage: python scripts/process-images.py <project root>
"""
import sys
from pathlib import Path

from PIL import Image

root = Path(sys.argv[1])
raw = root / "public/images/raw"
out = root / "public/images"
menu_out = out / "menu"
menu_out.mkdir(parents=True, exist_ok=True)

Image.open(raw / "interior-1.jpg").convert("RGB").save(out / "interior-1.webp", "WEBP", quality=82, method=6)

pages = []
for p in sorted(raw.glob("menu-page-*.png")):
    im = Image.open(p).convert("RGB")
    im.save(menu_out / (p.stem + ".webp"), "WEBP", quality=82, method=6)
    pages.append(im)

pdf = root / "public/uncles-kitchen-menu.pdf"
pages[0].save(pdf, "PDF", save_all=True, append_images=pages[1:], resolution=96)
print(f"{len(pages)} menu pages, pdf {pdf.stat().st_size} bytes")
