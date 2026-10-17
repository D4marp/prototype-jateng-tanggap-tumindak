"use client";

import { useState } from "react";
import type { DocView } from "@/lib/server/views";
import { IconCheck } from "./icons";
import { Modal } from "./Modal";
import { Rich } from "./Rich";

export function DocPaper({ d }: { d: DocView }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-md border border-line bg-white px-5 pb-5 pt-[22px] font-[Arial,Helvetica,sans-serif] text-[13px] leading-[1.55] text-[#141414]">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid -rotate-[24deg] place-items-center text-[clamp(54px,14vw,96px)] font-bold tracking-[0.12em] text-[rgb(179_38_30/0.09)]">CONTOH</div>
        <div className="text-xs font-bold uppercase leading-[1.35]">
          {d.kop.map((k) => (<div key={k}>{k}</div>))}
        </div>
        <hr className="mb-3.5 mt-2 border-0 border-t-2 border-[#141414]" />
        <p className="m-0 text-center font-bold uppercase underline">{d.judul}</p>
        <p className="mb-3.5 mt-0.5 text-center">Nomor: {d.nomor}</p>
        {d.paragraf.slice(0, 1).map((p) => (<p key={p} className="mb-2.5 sm:text-justify"><Rich text={p} /></p>))}
        {d.butir.length > 0 && (
          <ol type="a" className="mb-2.5 list-[lower-alpha] pl-5">
            {d.butir.map((b) => (<li key={b} className="mb-1 sm:text-justify">{b}</li>))}
          </ol>
        )}
        {d.paragraf.slice(1).map((p) => (<p key={p} className="mb-2.5 sm:text-justify"><Rich text={p} /></p>))}
        <div className="ml-auto mt-3.5 w-[min(270px,100%)] text-center text-[12.5px]">
          {d.kota}, {d.tanggal}
          <br />
          <span className="font-bold uppercase">{d.jabatan}</span>
          <div className="my-2 flex items-center gap-2.5 rounded-md border border-dashed border-[#8a949e] p-2 text-left text-[11px] leading-[1.4]">
            <div className="size-[76px] flex-none bg-white [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: d.qrSvg }} />
            <div>
              Ditandatangani secara elektronik.
              <br />
              Kode verifikasi:
              <br />
              <b className="font-mono text-xs">{d.kode}</b>
            </div>
          </div>
          <b>[NAMA PEJABAT]</b>
          <br />
          [PANGKAT / NRP]
        </div>
      </div>
      <p className="hint">
        Pindai kode pada kotak TTE untuk membuka halaman pemeriksaan keaslian. Pada sistem produksi, dokumen dapat diunduh sebagai PDF bertanda tangan elektronik tersertifikasi.
      </p>
    </>
  );
}

export function DocList({ docs }: { docs: DocView[] }) {
  const [i, setI] = useState<number | null>(null);
  const d = i === null ? null : docs[i];
  return (
    <>
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {docs.map((x, n) => (
          <li key={x.kode} className="grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-md border border-line px-3 py-2.5">
            <span className="grid size-10 place-items-center rounded bg-sunk font-mono text-[10.5px] font-semibold text-muted">PDF</span>
            <div className="min-w-0">
              <div className="min-w-0 text-[14.5px] font-bold">{x.jenis === "STPL" ? "Surat Tanda Penerimaan Laporan" : `SP2HP ke-${x.ke}`}</div>
              <div className="text-[12.5px] tabular-nums text-muted">
                {x.tanggal}
                <span className="ml-1.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-ok"><IconCheck className="size-[13px]" />TTE</span>
              </div>
            </div>
            <button type="button" className="btn btn-sec btn-sm" onClick={() => setI(n)}>Lihat</button>
          </li>
        ))}
      </ul>
      <Modal open={d !== null} onClose={() => setI(null)} title={d?.judulModal ?? ""}>
        {d && <DocPaper d={d} />}
      </Modal>
    </>
  );
}
