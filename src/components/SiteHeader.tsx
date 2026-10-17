import Link from "next/link";
import { getPeran } from "@/lib/server/peran";
import { IconShield } from "./icons";
import { TopNav } from "./NavLinks";
import { RoleSwitch } from "./RoleSwitch";

export async function SiteHeader() {
  const peran = await getPeran();
  return (
    <>
      <div role="note" className="bg-gold text-[12.5px] font-semibold text-on-gold">
        <div className="wrap flex flex-wrap items-center gap-x-3 gap-y-1 py-[7px]">
          <b className="text-[11.5px] uppercase tracking-[0.08em]">Prototipe uji coba</b>
          <span>Seluruh nama, nomor, dan kejadian adalah data contoh fiktif. Bukan layanan resmi.</span>
          <span className="ml-auto"><RoleSwitch peran={peran} /></span>
        </div>
      </div>
      <header className="border-b border-white/[0.07] bg-band text-band-ink">
        <div className="wrap flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-2.5 text-inherit no-underline" aria-label="Ke beranda">
            <span className="grid size-9 flex-none place-items-center rounded-[9px] bg-gold text-on-gold"><IconShield className="size-5" /></span>
            <span>
              <span className="block font-display text-[clamp(18px,5vw,23px)] font-bold leading-none tracking-[0.05em]">JATENG TANGGAP TUMINDAK</span>
              <span className="mt-[3px] block text-xs leading-[1.2] text-band-muted">Polda Jawa Tengah dan Polres jajaran</span>
            </span>
          </Link>
          <TopNav />
        </div>
      </header>
    </>
  );
}
