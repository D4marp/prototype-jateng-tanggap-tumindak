import "server-only";
import { BRAND } from "@/lib/brand";
import { derive, type Derived } from "@/lib/domain/derive";
import { kodeTiket, nomorLp } from "@/lib/domain/ids";
import { SEED } from "@/lib/domain/seed";
import { satkerUntuk, unitUntuk } from "@/lib/domain/satker";
import type { Jenis, Report } from "@/lib/domain/types";

/**
 * Penyimpanan memori untuk prototipe. Data hilang saat server dimulai ulang.
 * Antarmuka fungsi di bawah sengaja kecil agar mudah diganti klien ke layanan e-MP/basis data.
 */
const g = globalThis as { __jttStore?: Report[] };
g.__jttStore ??= structuredClone(SEED);
const db = () => g.__jttStore!;

export const TIKET_RE = new RegExp(`^${BRAND.tiketPrefix}-\\d{4}-\\d{4}$`);
export const normalisasiTiket = (s: string) => s.trim().toUpperCase();

export const semuaLaporan = () => db();
export const cariTiket = (q: string) => db().find((r) => r.id === normalisasiTiket(q));
export const turunan = (r: Report): Derived => derive(r);

export function cariDokumen(kode: string) {
  for (const r of db()) {
    const d = derive(r).docs.find((x) => x.kode === kode.trim().toUpperCase());
    if (d) return { r, d };
  }
  return null;
}

export interface LaporanBaru {
  nama: string;
  nik: string;
  hp: string;
  jenis: Jenis;
  lokasi: string;
  kronologi: string;
  waktu: number | null;
  kerugian: number;
  bersediaVideoCall: boolean;
}

export function buatLaporan(v: LaporanBaru, now: number): Report {
  const no = Math.max(...db().map((r) => r.no)) + 1;
  const r: Report = {
    no,
    id: kodeTiket(no, now),
    lp: nomorLp(no, now),
    satker: satkerUntuk(v.jenis),
    jenis: v.jenis,
    judul: v.jenis,
    lokasi: v.lokasi,
    stage: 0,
    pelapor: { nama: v.nama, nik: v.nik, hp: v.hp },
    unit: unitUntuk(v.jenis),
    penyidik: "",
    kerugian: v.kerugian,
    kejadian: v.waktu,
    uraian: v.kronologi.length > 160 ? `${v.kronologi.slice(0, 157)}…` : v.kronologi,
    kronologi: v.kronologi,
    rencana: `Menunggu disposisi pimpinan.${v.bersediaVideoCall ? " Pelapor bersedia diperiksa lewat video call." : ""}`,
    m: { lapor: now },
    baru: true,
  };
  db().unshift(r);
  return r;
}
