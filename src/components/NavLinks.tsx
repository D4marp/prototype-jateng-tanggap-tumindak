"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChart, IconDoc, IconHome, IconScan } from "./icons";

const ITEM = [
  { href: "/", label: "Beranda", pendek: "Beranda", Icon: IconHome },
  { href: "/lapor", label: "Buat laporan", pendek: "Lapor", Icon: IconDoc },
  { href: "/progres", label: "Cek progres", pendek: "Cek progres", Icon: IconScan },
  { href: "/dashboard", label: "Dashboard", pendek: "Dashboard", Icon: IconChart },
];
const aktif = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function TopNav() {
  const path = usePathname();
  return (
    <nav aria-label="Menu utama" className="hidden gap-1 md:flex">
      {ITEM.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={aktif(path, href) ? "page" : undefined}
          className="relative rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-sunk hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-[15px] aria-[current=page]:after:h-[3px] aria-[current=page]:after:bg-ink"
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
          className="flex flex-col items-center gap-0.5 px-1 pb-2 pt-2.5 text-[11.5px] font-medium text-muted aria-[current=page]:text-brand"
        >
          <Icon className="size-[22px]" />
          {pendek}
        </Link>
      ))}
    </nav>
  );
}
