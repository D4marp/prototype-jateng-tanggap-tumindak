import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, JetBrains_Mono, Public_Sans } from "next/font/google";
import { BottomNav } from "@/components/NavLinks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const barlow = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["600", "700"] });
const public_ = Public_Sans({ variable: "--font-public", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: { default: "Jateng Tanggap Tumindak", template: "%s · Jateng Tanggap Tumindak" },
  description: "Prototipe layanan pemantauan laporan polisi Polda Jawa Tengah dan Polres jajaran. Data contoh fiktif.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${barlow.variable} ${public_.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
