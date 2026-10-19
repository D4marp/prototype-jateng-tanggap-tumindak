import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { BRAND } from "@/lib/brand";
import { BottomNav } from "@/components/NavLinks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: { default: BRAND.nama, template: `%s · ${BRAND.nama}` },
  description: `Prototipe layanan pemantauan laporan polisi ${BRAND.instansi}. Data contoh fiktif.`,
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
