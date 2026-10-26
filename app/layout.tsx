import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} ${site.descriptor} (demo)`,
  description:
    "A demo landing page for a fictional hair studio: cuts, colour, treatments, bridal styling, hair spa and blowouts. All business details are sample content.",
};

export const viewport: Viewport = {
  themeColor: "#f6f0e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className="antialiased">
      <head>
        {/* Erode, a chiselled wedge serif from Fontshare (free licence), is the page's one family. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=erode@400,500,600&display=swap" />
      </head>
      <body className="min-h-full bg-ivory text-ink">{children}</body>
    </html>
  );
}
