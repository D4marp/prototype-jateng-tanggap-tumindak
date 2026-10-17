"use client";

import { useActionState } from "react";
import { verifikasiTiketAction, type VerifikasiState } from "@/app/actions";
import { IconLock } from "./icons";

export function VerifikasiForm({ tiket }: { tiket: string }) {
  const [s, action, pending] = useActionState<VerifikasiState, FormData>(verifikasiTiketAction, { status: "idle" });
  return (
    <form action={action} className="grid gap-3.5" autoComplete="off">
      <input type="hidden" name="tiket" value={tiket} />
      <div>
        <label className="lbl" htmlFor="digit">4 digit terakhir nomor HP pelapor</label>
        <input id="digit" name="digit" inputMode="numeric" maxLength={4} pattern="\d{4}" required className="field w-40 font-mono text-lg tracking-[0.3em]" aria-invalid={s.status === "error"} aria-describedby={s.status === "error" ? "verif-err" : "verif-hint"} />
        {s.status === "error" ? <p id="verif-err" role="alert" className="err">{s.pesan}</p> : <p id="verif-hint" className="hint">Nomor HP yang didaftarkan saat laporan dibuat di SPKT.</p>}
      </div>
      <div><button className="btn btn-pri" type="submit" disabled={pending}><IconLock />{pending ? "Memeriksa…" : "Buka status laporan"}</button></div>
    </form>
  );
}
