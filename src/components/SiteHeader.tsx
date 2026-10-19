import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { getPeran } from "@/lib/server/peran";
import { Logo } from "./Logo";
import { TopNav } from "./NavLinks";
import { RoleSwitch } from "./RoleSwitch";

export async function SiteHeader() {
  const peran = await getPeran();
  return (
    <>
      <div className="border-b border-line bg-sunk text-xs text-muted">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5">
          <span>Prototipe uji coba. Seluruh data fiktif, bukan layanan resmi.</span>
          <RoleSwitch peran={peran} />
        </div>
      </div>
      <header className="border-b-[3px] border-brand bg-surface">
        <div className="wrap flex items-center justify-between gap-6 py-3">
          <Link href="/" className="flex items-center gap-3 text-inherit no-underline" aria-label={`${BRAND.nama}, ke beranda`}>
            <Logo tinggi={46} />
            <span className="leading-tight">
              <span className="block text-[17px] font-bold tracking-tight">{BRAND.nama}</span>
              <span className="block text-[12.5px] text-muted">{BRAND.instansi}</span>
            </span>
          </Link>
          <TopNav />
        </div>
      </header>
    </>
  );
}
