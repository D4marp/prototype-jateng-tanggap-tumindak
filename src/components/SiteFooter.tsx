import { BRAND } from "@/lib/brand";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface pb-[calc(88px+env(safe-area-inset-bottom,0px))] pt-8 text-[13px] text-muted md:pb-8">
      <div className="wrap flex items-start gap-4">
        <Logo tinggi={36} />
        <p className="m-0 max-w-[70ch]">
          Prototipe layanan pemantauan laporan polisi {BRAND.instansi}. Dirancang untuk SPKT Bareskrim Polri. Seluruh nama, nomor, dan kejadian adalah data contoh fiktif. Lambang dipakai sebagai identitas program dan tidak menjadikan situs ini layanan resmi.
        </p>
      </div>
    </footer>
  );
}
