import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ivory & Ash Hair Studio (demo)",
  description:
    "A demo landing page for a fictional hair studio: cuts, colour, treatments, bridal styling, hair spa and blowouts. All business details are sample content.",
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${bodoni.variable} ${hanken.variable} antialiased`}
    >
      <body className="min-h-full bg-ivory text-charcoal">{children}</body>
    </html>
  );
}
