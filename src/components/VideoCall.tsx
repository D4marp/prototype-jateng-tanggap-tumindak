"use client";

import { useEffect, useState } from "react";
import { IconUser } from "./icons";
import { Modal } from "./Modal";

type Props = { tanggal: string; jam: string; siapa: string; unit: string; lewat: boolean };

export function VideoCallCard({ tanggal, jam, siapa, unit, lewat }: Props) {
  const [langkah, setLangkah] = useState<"tutup" | "tunggu" | "ruang">("tutup");
  const [detik, setDetik] = useState(0);
  useEffect(() => {
    if (langkah !== "ruang") return;
    const id = setInterval(() => setDetik((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [langkah]);
  const tutup = () => {
    setLangkah("tutup");
    setDetik(0);
  };
  const mm = String(Math.floor(detik / 60)).padStart(2, "0");
  const ss = String(detik % 60).padStart(2, "0");

  return (
    <>
      <div className="card-b grid gap-2.5">
        <div className="text-xl font-bold leading-tight">
          {tanggal}
          <br />
          Pukul {jam} WIB
        </div>
        <div className="text-sm text-muted">{siapa} · {unit}</div>
        <div>
          <button type="button" className="btn btn-pri" disabled={lewat} onClick={() => setLangkah("tunggu")}>Masuk ruang tunggu</button>
        </div>
        <p className="hint m-0">Sesi direkam dan menjadi lampiran berita acara pemeriksaan.</p>
      </div>
      <Modal open={langkah !== "tutup"} onClose={tutup} title={langkah === "ruang" ? "Pemeriksaan berlangsung" : "Ruang tunggu video call"}>
        {langkah === "tunggu" && (
          <>
            <p className="mb-1.5"><b>{siapa}</b><br /><span className="text-muted">{tanggal}, {jam} WIB</span></p>
            <p className="mb-1 mt-3 font-bold">Sebelum masuk, siapkan:</p>
            <ul className="mb-3.5 mt-2 list-disc pl-5 text-sm">
              <li className="mb-1">KTP asli untuk ditunjukkan ke kamera</li>
              <li className="mb-1">Tempat yang tenang dan terang, tanpa orang lain di ruangan</li>
              <li className="mb-1">Sinyal stabil dan baterai cukup</li>
            </ul>
            <button type="button" className="btn btn-pri" onClick={() => setLangkah("ruang")}>Masuk ruang pemeriksaan</button>
            <p className="hint">Simulasi. Pada sistem produksi tombol ini membuka aplikasi konferensi video resmi dengan verifikasi identitas peserta.</p>
          </>
        )}
        {langkah === "ruang" && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-crit"><span className="size-[9px] rounded-full bg-crit" />Merekam</span>
              <span className="font-mono text-muted">{mm}:{ss}</span>
            </div>
            <div className="my-3 grid grid-cols-2 gap-2.5">
              {[`Penyidik ${unit}`, "Anda"].map((n) => (
                <div key={n} className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-xl bg-[#1b2632] text-[#d2dbe3]">
                  <IconUser className="size-11 opacity-70" />
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/45 px-2 py-0.5 text-xs">{n}</span>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-sec" onClick={tutup}>Akhiri sesi</button>
            <p className="hint">Simulasi tampilan. Kamera tidak dinyalakan.</p>
          </>
        )}
      </Modal>
    </>
  );
}
