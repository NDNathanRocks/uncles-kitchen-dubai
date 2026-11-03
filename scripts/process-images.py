"""Process raw images into optimized WebP assets for the site."""
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

root = Path(sys.argv[1])
raw = root / "public/images/raw"
out = root / "public/images"
dishes = out / "dishes"
menu_out = out / "menu"
for d in (dishes, menu_out):
    d.mkdir(parents=True, exist_ok=True)

# (source page, crop box, output name)
PLATES = [
    ("menu-page-11.png", (552, 48, 792, 238), "chicken-hakka-noodles"),
    ("menu-page-04.png", (552, 892, 792, 1075), "veg-hakka-noodles"),
    ("menu-page-04.png", (552, 236, 792, 425), "veg-fried-rice"),
    ("menu-page-04.png", (552, 680, 792, 862), "veg-szechwan-fried-rice"),
    ("menu-page-04.png", (552, 28, 792, 208), "veg-pot-rice"),
    ("menu-page-02.png", (552, 815, 792, 1048), "paneer-chilli"),
    ("menu-page-02.png", (552, 50, 792, 282), "paneer-crispy"),
    ("menu-page-02.png", (552, 595, 792, 788), "potato-black-pepper"),
    ("menu-page-06.png", (28, 12, 262, 182), "chicken-chilli-dry"),
    ("menu-page-06.png", (28, 212, 262, 402), "chicken-garlic-hot-sweet"),
    ("menu-page-06.png", (8, 885, 245, 1068), "chicken-mongolian"),
    ("menu-page-07.png", (552, 55, 792, 278), "fish-fingers"),
    ("menu-page-07.png", (552, 320, 792, 548), "fried-prawns"),
    ("menu-page-07.png", (552, 855, 792, 1048), "prawn-red-chilli"),
    ("menu-page-01.png", (18, 545, 262, 782), "veg-spring-rolls"),
    ("menu-page-01.png", (25, 884, 262, 1045), "sesame-toast-fingers"),
    ("menu-page-01.png", (20, 55, 250, 238), "hot-and-sour-soup"),
    ("menu-page-10.png", (22, 850, 238, 1032), "chicken-szechwan-fried-rice"),
    ("menu-page-11.png", (562, 300, 780, 502), "chicken-american-chop-suey"),
]


def cutout(img: Image.Image, box) -> Image.Image:
    c = img.crop(box).convert("RGB")
    _, s, v = c.convert("HSV").split()
    sat = s.point(lambda x: 255 if x > 95 else 0)
    val = v.point(lambda x: 255 if x > 70 else 0)
    bg = ImageChops.multiply(sat, val)
    w, h = bg.size
    edge = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    edge += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    for p in edge:
        if bg.getpixel(p) == 255:
            ImageDraw.floodfill(bg, p, 128)
    alpha = bg.point(lambda x: 0 if x == 128 else 255)
    alpha = alpha.filter(ImageFilter.MinFilter(3))
    # keep only the region connected to the plate centre (drops dip bowls / wave fragments)
    cx, cy = w // 2, h // 2
    seed = next(
        (cx + dx, cy + dy)
        for r in range(0, min(w, h) // 2)
        for dx, dy in ((r, 0), (-r, 0), (0, r), (0, -r))
        if alpha.getpixel((cx + dx, cy + dy)) == 255
    )
    ImageDraw.floodfill(alpha, seed, 128)
    alpha = alpha.point(lambda x: 255 if x == 128 else 0)
    alpha = alpha.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.7))
    c.putalpha(alpha)
    bbox = alpha.point(lambda x: 255 if x > 20 else 0).getbbox()
    if bbox:
        c = c.crop(bbox)
    # upscale 2x for retina, sharpen lightly
    c = c.resize((c.width * 2, c.height * 2), Image.LANCZOS)
    rgb = c.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.6, percent=60, threshold=2))
    rgb.putalpha(c.getchannel("A"))
    return rgb


pages = {}
for src, box, name in PLATES:
    page = pages.setdefault(src, Image.open(raw / src))
    im = cutout(page, box)
    im.save(dishes / f"{name}.webp", "WEBP", quality=88, method=6)
    print(name, im.size)

# interior hero + mural crop
interior = Image.open(raw / "interior-1.jpg").convert("RGB")
interior.save(out / "interior-1.webp", "WEBP", quality=82, method=6)
interior.crop((700, 300, 1280, 590)).save(out / "mural-mumbai-dubai.webp", "WEBP", quality=85, method=6)

# menu pages -> webp + one PDF for download
page_files = sorted(raw.glob("menu-page-*.png"))
imgs = []
for p in page_files:
    im = Image.open(p).convert("RGB")
    im.save(menu_out / (p.stem + ".webp"), "WEBP", quality=82, method=6)
    imgs.append(im)
pdf = root / "public/uncles-kitchen-menu.pdf"
imgs[0].save(pdf, "PDF", save_all=True, append_images=imgs[1:], resolution=96)
print("pdf", pdf.stat().st_size)
