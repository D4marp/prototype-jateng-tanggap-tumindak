"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "./icons";
import { ScanButton } from "./ScanButton";

const RE = /^RSK-\d{4}-\d{4}$/;

export function TiketForm({ variant, contoh }: { variant: "band" | "page"; contoh?: string }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  const band = variant === "band";
  return (
    <form
      autoComplete="off"
      noValidate
      className={band ? "mt-[22px] flex max-w-[640px] flex-wrap gap-2" : "mt-3.5 flex flex-wrap gap-2"}
      onSubmit={(e) => {
        e.preventDefault();
        const v = String(new FormData(e.currentTarget).get("tiket") ?? "").trim().toUpperCase();
        if (!RE.test(v)) return setErr("Format kode tiket: RSK-2610-0412 (huruf RSK, empat digit, empat digit).");
        setErr("");
        router.push(`/progres/${v}`);
      }}
    >
      <label htmlFor={`tiket-${variant}`} className="sr-only">Kode tiket</label>
      <input id={`tiket-${variant}`} name="tiket" className="field min-w-0 flex-[1_1_230px] font-mono text-[15px]" placeholder={`Kode tiket, mis. ${contoh ?? "RSK-2610-0412"}`} aria-invalid={!!err} aria-describedby={err ? `err-${variant}` : undefined} />
      <button className="btn btn-pri" type="submit"><IconSearch />Cek progres</button>
      <ScanButton className={`btn ${band ? "btn-band" : "btn-sec"}`} />
      {err && <p id={`err-${variant}`} className={`err basis-full ${band ? "!text-[#ffb4ab]" : ""}`}>{err}</p>}
    </form>
  );
}
