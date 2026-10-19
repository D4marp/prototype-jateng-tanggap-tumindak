import { SLA } from "./config";
import { kodeTte } from "./ids";
import { posLabel, SATKER } from "./satker";
import type { DocRef, Flag, LogEntry, Report } from "./types";

export interface Derived {
  log: LogEntry[];
  docs: DocRef[];
  lastDoc: number;
}

/** Riwayat tindak lanjut dan dokumen diturunkan dari tonggak waktu, bukan disimpan ganda. */
export function derive(r: Report): Derived {
  const m = r.m;
  const s = SATKER[r.satker];
  const log: LogEntry[] = [];
  const docs: DocRef[] = [];

  log.push({
    t: m.lapor,
    title: "Laporan masuk di SPKT",
    pub: `Laporan dicatat di SPKT Bareskrim Polri. STPL berbarcode diterbitkan dengan tanda tangan elektronik.`,
    int: "Diterima piket SPKT dan diteruskan ke pimpinan Bareskrim untuk disposisi.",
  });
  docs.push({ jenis: "STPL", t: m.lapor, kode: "" });

  if (m.disp)
    log.push({ t: m.disp, title: "Disposisi pimpinan", pub: `Laporan diteruskan ke ${posLabel(s, r.unit)} dan penyidik sudah ditunjuk.`, int: `Sprin penyelidikan terbit. Penyidik: ${r.penyidik}.` });
  if (m.lidik)
    log.push({ t: m.lidik, title: "Penyelidikan dimulai", pub: "Penyidik meminta keterangan dan mengumpulkan barang bukti.", int: r.lidikNote ?? "Cek TKP dan permintaan keterangan pelapor." });

  let k = 0;
  const sp = (kind: "awal" | "sidik" | "selesai", t: number, pub: string) => {
    k++;
    docs.push({ jenis: "SP2HP", ke: k, kind, t, kode: "" });
    log.push({ t, title: `SP2HP ke-${k} dikirim`, pub, int: `SP2HP ke-${k} ditandatangani elektronik oleh ${s.singkat}.` });
  };
  if (m.sp1) sp("awal", m.sp1, "Pemberitahuan perkembangan penanganan dikirim ke pelapor.");
  if (m.gelar) log.push({ t: m.gelar, title: "Gelar perkara", pub: "Hasil penyelidikan dibahas dalam gelar perkara.", int: r.gelarNote ?? `Gelar perkara dipimpin ${s.singkat}.` });
  if (m.sidik) log.push({ t: m.sidik, title: "Naik ke penyidikan", pub: "Perkara memenuhi unsur pidana dan ditingkatkan ke penyidikan.", int: `SPDP dikirim ke ${s.kejaksaan}.` });
  if (m.sp2) sp("sidik", m.sp2, "Pemberitahuan peningkatan status ke penyidikan dikirim ke pelapor.");
  if (m.selesai) {
    sp("selesai", m.selesai, `Tersangka dan barang bukti diserahkan ke Kejaksaan. SP2HP ke-${k + 1} dikirim.`);
    log[log.length - 1].title = "Berkas lengkap (P21) dan Tahap II";
    log[log.length - 1].int = "Penanganan di tingkat Bareskrim ditutup.";
  }
  r.extra?.forEach((e) => log.push(e));
  if (r.vcall)
    log.push({
      t: r.vcall.dibuat,
      title: "Jadwal pemeriksaan lewat video call",
      pub: `Pemeriksaan ${r.vcall.siapa.toLowerCase()} dijadwalkan.`,
      int: "Ruang BAP virtual disiapkan. Sesi direkam untuk lampiran berita acara.",
    });

  log.sort((a, b) => b.t - a.t);
  docs.sort((a, b) => a.t - b.t).forEach((d) => (d.kode = kodeTte(`${r.id}${d.jenis}${d.ke ?? 0}`)));
  const lastDoc = Math.max(...docs.map((d) => d.t));
  return { log, docs, lastDoc };
}

/** Penilaian kepatuhan layanan terhadap parameter SLA. */
export function flag(r: Report, lastDoc: number, now: number): Flag {
  if (r.stage === 5) return { tone: "ok", teks: "Selesai" };
  if (r.stage === 0) {
    const lewat = now - r.m.lapor > SLA.disposisiJam * 36e5;
    return lewat ? { tone: "crit", teks: `Lewat ${SLA.disposisiJam} jam, belum disposisi` } : { tone: "warn", teks: "Menunggu disposisi" };
  }
  if ((now - lastDoc) / 864e5 > SLA.sp2hpHari) return { tone: "warn", teks: `SP2HP lewat ${SLA.sp2hpHari} hari` };
  return { tone: "ok", teks: "Sesuai jadwal" };
}

export { posLabel };
