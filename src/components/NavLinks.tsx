"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChart, IconDoc, IconHome, IconScan } from "./icons";

const ITEM = [
  { href: "/", label: "Beranda", pendek: "Beranda", Icon: IconHome },
  { href: "/lapor", label: "Buat Laporan", pendek: "Lapor", Icon: IconDoc },
  { href: "/progres", label: "Cek Progres", pendek: "Cek progres", Icon: IconScan },
  { href: "/dashboard", label: "Dashboard", pendek: "Dashboard", Icon: IconChart },
];
const aktif = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function TopNav() {
  const path = usePathname();
  return (
    <nav aria-label="Menu utama" className="hidden gap-0.5 md:flex">
      {ITEM.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={aktif(path, href) ? "page" : undefined}
          className="rounded-lg px-3.5 py-2.5 font-semibold text-band-muted hover:text-band-ink aria-[current=page]:bg-white/[0.07] aria-[current=page]:text-band-ink aria-[current=page]:shadow-[inset_0_-2px_0_var(--gold)]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function BottomNav() {
  const path = usePathname();
  return (
    <nav aria-label="Menu utama" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface pb-[env(safe-area-inset-bottom,0px)] md:hidden">
      {ITEM.map(({ href, pendek, Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={aktif(path, href) ? "page" : undefined}
          className="relative flex flex-col items-center gap-[3px] px-0.5 pb-2 pt-[9px] text-[11.5px] font-semibold text-muted aria-[current=page]:text-ink aria-[current=page]:before:absolute aria-[current=page]:before:inset-x-[28%] aria-[current=page]:before:top-0 aria-[current=page]:before:h-[3px] aria-[current=page]:before:rounded-b-[3px] aria-[current=page]:before:bg-gold"
        >
          <Icon className="size-[22px]" />
          {pendek}
        </Link>
      ))}
    </nav>
  );
}
