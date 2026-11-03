import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { RestaurantJsonLd } from "@/components/json-ld";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

const description =
  "Mumbai-style Indo-Chinese in Al Karama, Dubai, since 1987. Chicken lollipop, Hakka noodles, paneer chilli and more. Exit 2, behind BurJuman Metro. Call, WhatsApp or get directions.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Uncle's Kitchen | Indo-Chinese Restaurant in Karama, Dubai · Since 1987",
    template: "%s | Uncle's Kitchen, Karama",
  },
  description,
  keywords: [
    "Indo Chinese restaurant Karama",
    "Chinese near BurJuman",
    "Mumbai Chinese Dubai",
    "desi Chinese Dubai",
    "chicken lollipop Dubai",
    "Hakka noodles Karama",
    "Uncle's Kitchen Dubai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    title: "Uncle's Kitchen · Mumbai's Desi Chinese, in Karama",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle's Kitchen · Mumbai's Desi Chinese, in Karama",
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14110F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-dvh pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-turmeric focus:px-4 focus:py-2 focus:font-semibold focus:text-char"
        >
          Skip to content
        </a>
        <RestaurantJsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
