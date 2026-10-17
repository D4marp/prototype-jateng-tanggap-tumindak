"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "./icons";
import { ScanButton } from "./ScanButton";

const RE = /^RSK-\d{4}-\d{4}$/;

export function TiketForm({ id = "tiket" }: { id?: string }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  return (
    <form
      autoComplete="off"
      noValidate
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const v = String(new FormData(e.currentTarget).get("tiket") ?? "").trim().toUpperCase();
        if (!RE.test(v)) return setErr("Format kode tiket: RSK-2610-0412 (RSK, empat digit, empat digit).");
        setErr("");
        router.push(`/progres/${v}`);
      }}
    >
      <div>
        <label htmlFor={id} className="lbl">Kode tiket pada STPL</label>
        <input id={id} name="tiket" className="field font-mono text-[15px]" placeholder="RSK-2610-0412" aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} />
        {err && <p id={`${id}-err`} className="err">{err}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-pri" type="submit"><IconSearch />Cek progres</button>
        <ScanButton className="btn btn-sec" />
      </div>
    </form>
  );
}
