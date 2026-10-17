"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { setPeranAction } from "@/app/actions";
import type { Peran } from "@/lib/domain/types";

const OPSI: [Peran, string][] = [
  ["pelapor", "Pelapor (publik)"],
  ["spkt", "Petugas SPKT"],
  ["penyidik", "Penyidik"],
  ["pimpinan", "Pimpinan"],
];

/** Pengalih peran khusus demo. Bukan autentikasi. */
export function RoleSwitch({ peran }: { peran: Peran }) {
  const form = useRef<HTMLFormElement>(null);
  const path = usePathname();
  return (
    <form ref={form} action={setPeranAction} className="flex items-center gap-2">
      <input type="hidden" name="kembali" value={path} />
      <label htmlFor="peran">Peran demo</label>
      <select
        key={peran}
        id="peran"
        name="peran"
        defaultValue={peran}
        onChange={() => form.current?.requestSubmit()}
        className="rounded border border-line bg-surface px-1.5 py-0.5 text-xs font-medium text-ink"
      >
        {OPSI.map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
      </select>
    </form>
  );
}
