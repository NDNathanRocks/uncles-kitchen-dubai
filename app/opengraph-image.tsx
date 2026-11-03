import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Uncle's Kitchen: Mumbai's desi Chinese in Karama, Dubai, since 1987";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const anton = await readFile(join(process.cwd(), "assets/Anton-Regular.ttf"));
const photo = `data:image/jpeg;base64,${await readFile(join(process.cwd(), "public/images/raw/interior-1.jpg"), "base64")}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#14110F" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={1200} height={900} style={{ position: "absolute", top: -135, left: 0, objectFit: "cover" }} alt="" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,17,15,0.76)", display: "flex" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "64px 72px",
            fontFamily: "Anton",
            color: "#F6EEE0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "flex-start",
              background: "#F2B705",
              color: "#14110F",
              padding: "14px 22px 10px",
              transform: "rotate(-4deg)",
              boxShadow: "6px 6px 0 #E8402C",
              marginBottom: 44,
            }}
          >
            <div style={{ fontSize: 44, lineHeight: 1 }}>UNCLE&apos;S KITCHEN</div>
            <div style={{ fontSize: 18, letterSpacing: 8, borderTop: "3px solid #14110F", marginTop: 6, paddingTop: 4 }}>
              SINCE 1987
            </div>
          </div>
          <div style={{ fontSize: 104, lineHeight: 0.95, display: "flex", flexDirection: "column" }}>
            <span>MUMBAI&apos;S DESI CHINESE.</span>
            <span style={{ color: "#F2B705" }}>IN KARAMA.</span>
          </div>
          <div style={{ fontSize: 30, marginTop: 22, color: "#CDBFAE", letterSpacing: 2 }}>
            BEHIND BURJUMAN METRO · EXIT 2 · DUBAI
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }] },
  );
}
