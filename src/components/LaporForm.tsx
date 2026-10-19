"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { buatLaporanAction, type LaporState } from "@/app/actions";
import { JENIS, type Jenis } from "@/lib/domain/types";
import { satkerUntuk } from "@/lib/domain/satker";
import { IconCheck } from "./icons";

const CONTOH: Record<string, string> = {
  nama: "Siti Aminah", nik: "3171000000000001", hp: "081200001234", jenis: "Peretasan dan kebocoran data",
  lokasi: "Setiabudi, Jakarta Selatan", waktu: "2026-10-16T21:15",
  kronologi: "Akun surel dan dompet digital pelapor diambil alih setelah pelapor mengeklik tautan yang mengaku dari penyedia layanan. Saldo dompet digital terkuras dan data kontak pelapor dipakai untuk menipu orang lain.",
  kerugian: "15000000", bersediaVideoCall: "on",
};

export function LaporForm() {
  const [contoh, setContoh] = useState<{ n: number; v: Record<string, string> } | null>(null);
  const [jenisPilih, setJenisPilih] = useState("");
  const [s, action, pending] = useActionState<LaporState, FormData>(async (prev, fd) => {
    const hasil = await buatLaporanAction(prev, fd);
    if (hasil.status === "ok") setContoh(null);
    return hasil;
  }, { status: "idle" });
  const val = (k: string) => contoh?.v[k] ?? (s.status === "error" ? s.values[k] : undefined) ?? "";
  const jenisEff = jenisPilih || val("jenis");
  const e = (k: string) => (s.status === "error" ? s.errors[k] : undefined);
  const err = (k: string) => (e(k) ? <p id={`e-${k}`} className="err">{e(k)}</p> : null);
  const inv = (k: string) => ({ "aria-invalid": !!e(k), "aria-describedby": e(k) ? `e-${k}` : undefined });

  return (
    <div className="grid items-start gap-5 min-[920px]:grid-cols-[1.3fr_1fr]">
      <section className="card">
        <div className="card-h">
          <h2 className="m-0 text-[15px] font-semibold">Data laporan</h2>
          <button type="button" className="btn btn-sec btn-sm" onClick={() => { setJenisPilih(""); setContoh({ n: (contoh?.n ?? 0) + 1, v: CONTOH }); }}>Isi data contoh</button>
        </div>
        <div className="card-b">
          <form key={contoh?.n ?? 0} action={action} noValidate autoComplete="off" className="grid gap-3.5">
            {s.status === "error" && s.pesan && <p role="alert" className="err m-0">{s.pesan}</p>}
            <div className="grid gap-3.5 min-[560px]:grid-cols-2">
              <div><label className="lbl" htmlFor="nama">Nama pelapor</label><input id="nama" name="nama" className="field" defaultValue={val("nama")} {...inv("nama")} />{err("nama")}</div>
              <div><label className="lbl" htmlFor="nik">NIK</label><input id="nik" name="nik" className="field font-mono" inputMode="numeric" maxLength={16} placeholder="16 digit" defaultValue={val("nik")} {...inv("nik")} />{err("nik")}</div>
            </div>
            <div className="grid gap-3.5 min-[560px]:grid-cols-2">
              <div><label className="lbl" htmlFor="hp">Nomor HP / WhatsApp</label><input id="hp" name="hp" className="field font-mono" inputMode="tel" placeholder="08…" defaultValue={val("hp")} {...inv("hp")} />{err("hp")}</div>
              <div>
                <label className="lbl" htmlFor="jenis">Jenis perkara</label>
                <select id="jenis" name="jenis" className="field" defaultValue={val("jenis")} onChange={(ev) => setJenisPilih(ev.target.value || "-")} {...inv("jenis")}>
                  <option value="">Pilih</option>
                  {JENIS.map((j) => (<option key={j}>{j}</option>))}
                </select>
                {err("jenis")}
              </div>
            </div>
            <div className="grid gap-3.5 min-[560px]:grid-cols-2">
              <div><label className="lbl" htmlFor="waktu">Waktu kejadian</label><input id="waktu" name="waktu" type="datetime-local" className="field" defaultValue={val("waktu")} /></div>
              <div>
                <span className="lbl">Direktorat tujuan</span>
                <div className="flex min-h-[42px] items-center rounded-md border border-dashed border-line bg-panel px-3 text-sm">
                  {(JENIS as readonly string[]).includes(jenisEff) ? satkerUntuk(jenisEff as Jenis) : <span className="text-muted">Mengikuti jenis perkara</span>}
                </div>
                <p className="hint">Perkiraan awal. Pimpinan menetapkan lewat disposisi.</p>
              </div>
            </div>
            <div><label className="lbl" htmlFor="lokasi">Lokasi kejadian</label><input id="lokasi" name="lokasi" className="field" placeholder="Kecamatan, kota/kabupaten, provinsi" defaultValue={val("lokasi")} {...inv("lokasi")} />{err("lokasi")}</div>
            <div><label className="lbl" htmlFor="kronologi">Kronologi singkat</label><textarea id="kronologi" name="kronologi" className="field" placeholder="Apa yang terjadi, kapan, di mana, siapa yang terlibat, apa yang hilang atau rusak" defaultValue={val("kronologi")} {...inv("kronologi")} />{err("kronologi")}</div>
            <div><label className="lbl" htmlFor="kerugian">Perkiraan kerugian (Rp)</label><input id="kerugian" name="kerugian" className="field font-mono" inputMode="numeric" placeholder="Boleh dikosongkan" defaultValue={val("kerugian")} /></div>
            <label className="flex items-start gap-2.5 text-sm"><input type="checkbox" name="bersediaVideoCall" defaultChecked={val("bersediaVideoCall") === "on"} className="mt-px size-5 flex-none accent-brand" />Pelapor bersedia diperiksa lewat video call bila diperlukan</label>
            <div><button className="btn btn-pri" type="submit" disabled={pending}>{pending ? "Menyimpan…" : "Simpan dan terbitkan STPL"}</button></div>
            <p className="hint">Prototipe: data disimpan di memori server dan hilang saat server dimulai ulang. NIK dan nomor HP tidak ditampilkan utuh di layar mana pun.</p>
          </form>
        </div>
      </section>

      <div className="grid min-w-0 gap-4">
        {s.status === "ok" && (
          <section className="card" aria-live="polite">
            <h2 className="card-h">STPL terbit <span className="text-[13px] font-semibold text-ok">Tersimpan</span></h2>
            <div className="card-b grid gap-3.5">
              <div className="grid grid-cols-[auto_1fr] items-center gap-3.5">
                <div className="size-28 rounded-md border border-line bg-white p-1.5 [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: s.qr }} />
                <div className="min-w-0">
                  <div className="text-[13px] text-muted">Kode tiket</div>
                  <div className="font-mono text-[21px] font-semibold">{s.id}</div>
                  <div className="mt-1 font-mono text-xs text-muted [overflow-wrap:anywhere]">{s.lp}</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-ok"><IconCheck className="size-[13px]" />Ditandatangani elektronik · {s.kodeStpl}</div>
                </div>
              </div>
              <p className="hint m-0">QR berisi tautan halaman progres. Pelapor membukanya dengan kamera ponsel dan memasukkan 4 digit terakhir nomor HP.</p>
              <div className="flex flex-wrap gap-2.5">
                <Link href={`/dashboard/${s.id}`} className="btn btn-pri btn-sm">Buka di dashboard</Link>
                <Link href={`/progres/${s.id}`} className="btn btn-sec btn-sm">Tampilan pelapor</Link>
              </div>
            </div>
          </section>
        )}
        <section className="card">
          <h2 className="card-h">Setelah laporan disimpan</h2>
          <div className="card-b text-[13.5px] text-muted">
            <ol className="m-0 mt-0 list-decimal pl-[18px]">
              <li className="mb-1.5">Nomor LP dan kode tiket dibuat otomatis.</li>
              <li className="mb-1.5">STPL terbit dengan barcode dan TTE petugas SPKT.</li>
              <li className="mb-1.5">Laporan langsung muncul di dashboard pimpinan untuk disposisi ke direktorat.</li>
              <li className="mb-1.5">Pelapor memantau progres dengan memindai barcode di STPL.</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
