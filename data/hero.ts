/* Generated from public/images/hero/pieces/pieces.json by hand-run of scripts/extract-pieces.py. */
import type { Piece } from "@/components/manchurian-drop";
import plateEmpty from "@/public/images/hero/plate-empty.webp";
import plateFull from "@/public/images/hero/plate-full.webp";
import glazeMask from "@/public/images/hero/pieces/glaze-mask.png";
import p0 from "@/public/images/hero/pieces/piece-2.webp";
import p1 from "@/public/images/hero/pieces/piece-1.webp";
import p2 from "@/public/images/hero/pieces/piece-3.webp";
import p3 from "@/public/images/hero/pieces/piece-5.webp";
import p4 from "@/public/images/hero/pieces/piece-7.webp";
import p5 from "@/public/images/hero/pieces/piece-6.webp";
import p6 from "@/public/images/hero/pieces/piece-8.webp";
import p7 from "@/public/images/hero/pieces/piece-4.webp";
import p8 from "@/public/images/hero/pieces/piece-11.webp";
import p9 from "@/public/images/hero/pieces/piece-9.webp";
import p10 from "@/public/images/hero/pieces/piece-10.webp";

export { plateEmpty, plateFull, glazeMask };

/** Positions are percent of the plate image; order = fall order. */
export const heroPieces: Piece[] = [
  { src: p0, x: 44.043, y: 20.898, w: 19.043, h: 15.332 },
  { src: p1, x: 25.586, y: 25.293, w: 17.578, h: 14.941 },
  { src: p2, x: 59.18, y: 26.66, w: 18.457, h: 15.625 },
  { src: p3, x: 30.469, y: 30.078, w: 18.066, h: 19.434 },
  { src: p4, x: 47.949, y: 32.129, w: 17.969, h: 19.434 },
  { src: p5, x: 39.551, y: 35.059, w: 17.871, h: 20.41 },
  { src: p6, x: 63.867, y: 35.938, w: 17.773, h: 19.531 },
  { src: p7, x: 20.02, y: 37.793, w: 17.578, h: 17.969 },
  { src: p8, x: 57.227, y: 44.922, w: 23.047, h: 20.996 },
  { src: p9, x: 27.734, y: 48.242, w: 20.508, h: 21.68 },
  { src: p10, x: 45.898, y: 50.391, w: 17.383, h: 20.508 },
];
