"""Cut the chicken pieces out of the hero plate for the scroll "drop" animation.

Inputs: the full plate image, a white-on-black chicken mask (same size), and
approximate centre points of each piece. Touching pieces are split by nearest
centre. Each piece is saved as a transparent WebP cut from the full image,
plus pieces.json with positions (percent of the plate image) and a soft
white glaze mask used for the moving glint.

Usage: python scripts/extract-pieces.py <full.png> <mask.png> <out_dir> "x,y x,y ..."
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

full_p, mask_p, out_dir, centres_arg = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]), sys.argv[4]
out_dir.mkdir(parents=True, exist_ok=True)
centres = [tuple(int(v) for v in c.split(",")) for c in centres_arg.split()]

full = Image.open(full_p).convert("RGB")
mask = Image.open(mask_p).convert("L").resize(full.size)
W, H = full.size
mp = mask.load()

labels = [Image.new("L", (W, H), 0) for _ in centres]
lps = [l.load() for l in labels]
for y in range(H):
    for x in range(W):
        if mp[x, y] > 127:
            best = min(range(len(centres)), key=lambda i: (x - centres[i][0]) ** 2 + (y - centres[i][1]) ** 2)
            lps[best][x, y] = 255

pieces = []
for i, region in enumerate(labels):
    if not region.getbbox():
        continue
    # keep only the blob around this piece's centre (drops stray flakes), soften cut edges
    cx, cy = centres[i]
    rp = region.load()
    seed = next(
        ((cx + dx, cy + dy) for r in range(0, 120) for dx, dy in ((r, 0), (-r, 0), (0, r), (0, -r))
         if 0 <= cx + dx < W and 0 <= cy + dy < H and rp[cx + dx, cy + dy] == 255),
        None,
    )
    if seed:
        ImageDraw.floodfill(region, seed, 128)
        region = region.point(lambda v: 255 if v == 128 else 0)
    region = region.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.4))
    region = region.point(lambda v: min(255, int(v * 1.25)))
    bbox = region.getbbox()
    pad = 4
    x0, y0, x1, y1 = max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(W, bbox[2] + pad), min(H, bbox[3] + pad)
    alpha = region.crop((x0, y0, x1, y1))
    piece = full.crop((x0, y0, x1, y1)).convert("RGBA")
    piece.putalpha(alpha)
    name = f"piece-{len(pieces) + 1}.webp"
    piece.save(out_dir / name, "WEBP", quality=88, method=6)
    pieces.append(
        {
            "src": name,
            "x": round(x0 / W * 100, 3),
            "y": round(y0 / H * 100, 3),
            "w": round((x1 - x0) / W * 100, 3),
            "h": round((y1 - y0) / H * 100, 3),
        }
    )

# higher pieces (further back) fall first so front pieces land on top
pieces.sort(key=lambda p: p["y"] + p["h"])
(out_dir / "pieces.json").write_text(json.dumps(pieces, indent=2))

glaze = Image.new("RGBA", (W, H), (255, 255, 255, 0))
glaze.putalpha(mask.filter(ImageFilter.GaussianBlur(2)))
glaze.resize((W // 2, H // 2), Image.LANCZOS).save(out_dir / "glaze-mask.png", optimize=True)
print(f"{len(pieces)} pieces")
