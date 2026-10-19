import "server-only";
import QRCode from "qrcode";
import { flag } from "@/lib/domain/derive";
import { SLA } from "@/lib/domain/config";
import { ago, dur, fmt, jamWib, maskHp, maskNama, maskNik, maskPenyidik, ROMAWI, rp, wib } from "@/lib/domain/format";
import { posLabel, SATKER } from "@/lib/domain/satker";
import { JENIS_SENSITIF, type DocRef, type Flag, type Report } from "@/lib/domain/types";
import { turunan } from "./store";

export interface DocView {
  jenis: "STPL" | "SP2HP";
  ke?: number;
  kode: string;
  tanggal: string;
  judulModal: string;
  judul: string;
  nomor: string;
  kop: string[];
  paragraf: string[];
  butir: string[];
  kota: string;
  jabatan: string;
  verifyUrl: string;
  qrSvg: string;
}
export interface LogView {
  judul: string;
  waktu: string;
  lalu: string;
  pub: string;
  internal?: string;
}
export interface ReportView {
  level: "pub" | "int";
  id: string;
  lp: string;
  stage: number;
  posisi: string;
  satker: string;
  waktuLapor: string;
  respon: { teks: string; ok: boolean };
  jenis: string;
  lokasi: string;
  kejadian: string;
  judul: string;
  uraian: string;
  kerugian: string | null;
  unit: string;
  penyidik: string;
  pelapor: { nama: string; nik: string; hp: string };
  sumber: string;
  log: LogView[];
  docs: DocView[];
  vcall: null | { tanggal: string; jam: string; siapa: string; unit: string; lewat: boolean };
  /** Hanya terisi untuk level "int". Tidak pernah ikut terkirim ke klien pelapor. */
  internal?: { kronologi: string; rencana: string; flag: Flag; sp2hpTerakhir: string };
}

export async function qrSvg(teks: string, ukuran: number): Promise<string> {
  return QRCode.toString(teks, { type: "svg", margin: 0, width: ukuran, errorCorrectionLevel: "M", color: { dark: "#111111", light: "#ffffff" } });
}

async function dokumen(r: Report, d: DocRef, pub: boolean, tutup: boolean, origin: string): Promise<DocView> {
  const s = SATKER[r.satker];
  const nama = pub ? maskNama(r.pelapor.nama) : r.pelapor.nama;
  const bulan = ROMAWI[wib(d.t).getUTCMonth()];
  const kop = ["Kepolisian Negara Republik Indonesia", "Badan Reserse Kriminal", s.kop];
  const verifyUrl = `${origin}/verifikasi/${d.kode}`;
  const dasar = { kop, kota: s.kota, tanggal: fmt(d.t, false), kode: d.kode, verifyUrl, qrSvg: await qrSvg(verifyUrl, 72), jenis: d.jenis, ke: d.ke };

  if (d.jenis === "STPL") {
    return {
      ...dasar,
      judulModal: "STPL",
      judul: "Surat Tanda Penerimaan Laporan",
      nomor: `STPL/${r.no}/${bulan}/2026/SPKT`,
      jabatan: "Kepala Siaga SPKT",
      paragraf: [
        tutup
          ? `Telah diterima laporan dari Saudara **${nama}**. Rincian perkara tidak dicantumkan pada salinan ini untuk melindungi pihak yang terlibat.`
          : `Telah diterima laporan dari Saudara **${nama}** tentang dugaan tindak pidana **${r.jenis.toLowerCase()}** yang terjadi di ${r.lokasi}${r.kejadian ? `, pada ${fmt(r.kejadian)}` : ""}.`,
        `Laporan tercatat dengan Nomor ${r.lp}. Perkembangan laporan dapat dipantau dengan memindai kode di bawah atau memasukkan kode tiket **${r.id}**.`,
      ],
      butir: [],
    };
  }
  const isi =
    d.kind === "awal"
      ? [`Laporan Saudara telah kami terima dan ditangani oleh ${posLabel(s, r.unit)}.`, "Penyidik telah memulai penyelidikan, termasuk meminta keterangan dan mengumpulkan barang bukti.", `Perkembangan berikutnya akan kami sampaikan paling lambat ${SLA.sp2hpHari} hari sejak surat ini.`]
      : d.kind === "sidik"
        ? [`Gelar perkara tanggal ${fmt(r.m.gelar!, false)} menyatakan perkara memenuhi unsur tindak pidana.`, `Penanganan ditingkatkan ke penyidikan dan SPDP telah dikirim ke ${s.kejaksaan}.`, "Penyidik melanjutkan pemeriksaan saksi dan pemberkasan perkara."]
        : [`Berkas perkara dinyatakan lengkap (P21) oleh ${s.kejaksaan}.`, `Tersangka dan barang bukti telah diserahkan ke Kejaksaan (Tahap II) pada ${fmt(d.t, false)}.`, "Penanganan di tingkat kepolisian selesai dan proses berlanjut ke pengadilan."];
  return {
    ...dasar,
    judulModal: `SP2HP ke-${d.ke}`,
    judul: `Surat Pemberitahuan Perkembangan Hasil ${d.kind === "awal" ? "Penyelidikan" : "Penyidikan"}`,
    nomor: `B/${r.no * 3 + (d.ke ?? 0)}/${bulan}/2026/${s.sufiks}`,
    jabatan: s.jabatan,
    paragraf: [
      `Kepada Yth. Saudara **${nama}**. Sehubungan dengan laporan Saudara Nomor ${r.lp}, bersama ini kami beritahukan perkembangan penanganannya:`,
      `Penanganan dilakukan oleh ${r.unit} dengan penyidik ${pub ? maskPenyidik(r.penyidik) : r.penyidik}. Informasi tambahan dapat Saudara sampaikan kepada penyidik.`,
    ],
    butir: isi,
  };
}

/**
 * Satu-satunya tempat data kasus diubah menjadi bentuk yang dikirim ke peramban.
 * Redaksi dilakukan di server: pada level "pub" kronologi, rencana, catatan internal, dan identitas utuh tidak dibangun sama sekali.
 */
export async function bangunView(r: Report, level: "pub" | "int", now: number, origin: string): Promise<ReportView> {
  const pub = level === "pub";
  const s = SATKER[r.satker];
  const { log, docs, lastDoc } = turunan(r);
  const tutup = pub && JENIS_SENSITIF.includes(r.jenis);
  const posisi = r.stage === 0 ? "SPKT Bareskrim Polri" : r.stage === 5 ? s.kejaksaan : posLabel(s, r.unit);
  const v = r.vcall;

  const view: ReportView = {
    level,
    id: r.id,
    lp: r.lp,
    stage: r.stage,
    posisi,
    satker: s.nama,
    waktuLapor: fmt(r.m.lapor),
    respon: r.m.disp
      ? { teks: dur(r.m.disp - r.m.lapor), ok: true }
      : { teks: `Belum ada disposisi (${dur(now - r.m.lapor)} sejak lapor)`, ok: false },
    jenis: tutup ? "Perkara dengan perlindungan khusus" : r.jenis,
    lokasi: tutup ? "Tidak ditampilkan" : r.lokasi,
    kejadian: tutup || !r.kejadian ? "-" : fmt(r.kejadian),
    judul: tutup ? "Perkara dengan perlindungan khusus" : r.judul,
    uraian: tutup ? "Rincian perkara tidak ditampilkan di jalur publik untuk melindungi pihak yang terlibat. Hubungi penyidik untuk informasi lebih lanjut." : r.uraian,
    kerugian: r.kerugian && !tutup ? rp(r.kerugian) : null,
    unit: r.stage === 0 ? "Menunggu disposisi" : r.unit,
    penyidik: r.penyidik ? (pub ? maskPenyidik(r.penyidik) : r.penyidik) : "Belum ditunjuk",
    pelapor: pub
      ? { nama: maskNama(r.pelapor.nama), nik: `${r.pelapor.nik.slice(0, 4)}************`, hp: `${r.pelapor.hp.slice(0, 4)}********` }
      : { nama: r.pelapor.nama, nik: maskNik(r.pelapor.nik), hp: maskHp(r.pelapor.hp) },
    sumber: "SPKT Bareskrim Polri",
    log: log.map((e) => ({ judul: e.title, waktu: fmt(e.t), lalu: ago(now, e.t), pub: e.pub, ...(pub ? {} : { internal: e.int }) })),
    docs: await Promise.all(docs.map((d) => dokumen(r, d, pub, tutup, origin))),
    vcall: v ? { tanggal: fmt(v.t, false), jam: jamWib(v.t), siapa: v.siapa, unit: r.unit, lewat: v.t < now } : null,
  };
  if (!pub)
    view.internal = {
      kronologi: r.kronologi,
      rencana: r.rencana,
      flag: flag(r, lastDoc, now),
      sp2hpTerakhir: `${fmt(lastDoc, false)} (${ago(now, lastDoc)})`,
    };
  return view;
}

export interface BarisDaftar {
  id: string;
  baru: boolean;
  tglLapor: string;
  satker: string;
  jenis: string;
  lokasi: string;
  stage: number;
  penyidik: string | null;
  unit: string;
  sp2hp: string;
  sp2hpLalu: string;
  flag: Flag;
}

/** Baris tabel dashboard (khusus peran internal). */
export function daftarBaris(laporan: Report[], now: number): BarisDaftar[] {
  return laporan
    .slice()
    .sort((a, b) => b.m.lapor - a.m.lapor)
    .map((r) => {
      const { lastDoc } = turunan(r);
      return {
        id: r.id,
        baru: !!r.baru,
        tglLapor: fmt(r.m.lapor, false),
        satker: SATKER[r.satker].nama,
        jenis: r.jenis,
        lokasi: r.lokasi,
        stage: r.stage,
        penyidik: r.penyidik || null,
        unit: r.unit,
        sp2hp: fmt(lastDoc, false),
        sp2hpLalu: ago(now, lastDoc),
        flag: flag(r, lastDoc, now),
      };
    });
}
