"""Render the tilted yellow stamp into favicon / app icons.

Usage: python scripts/make-icons.py <project root>
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(sys.argv[1])
font_path = root / "assets/Anton-Regular.ttf"
YELLOW, CHAR = (242, 183, 5), (20, 17, 15)


def stamp(size: int, bg=None) -> Image.Image:
    s = size * 4  # supersample
    im = Image.new("RGBA", (s, s), bg or (0, 0, 0, 0))
    card = Image.new("RGBA", (int(s * 0.8), int(s * 0.8)), (0, 0, 0, 0))
    d = ImageDraw.Draw(card)
    w = card.width
    d.rounded_rectangle((0, 0, w - 1, w - 1), radius=int(w * 0.06), fill=YELLOW)
    inset = int(w * 0.06)
    d.rounded_rectangle(
        (inset, inset, w - inset, w - inset), radius=int(w * 0.03), outline=CHAR, width=max(2, int(w * 0.025))
    )
    big = ImageFont.truetype(str(font_path), int(w * 0.5))
    small = ImageFont.truetype(str(font_path), int(w * 0.17))
    d.text((w / 2, w * 0.44), "UK", font=big, fill=CHAR, anchor="mm")
    d.text((w / 2, w * 0.78), "1987", font=small, fill=CHAR, anchor="mm")
    card = card.rotate(6, resample=Image.BICUBIC, expand=True)
    im.alpha_composite(card, ((s - card.width) // 2, (s - card.height) // 2))
    return im.resize((size, size), Image.LANCZOS)


app = root / "app"
stamp(512).save(app / "icon.png")
stamp(180, bg=(20, 17, 15, 255)).save(app / "apple-icon.png")
stamp(48).save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("icons written")
