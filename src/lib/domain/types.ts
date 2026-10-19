export const STAGES = ["Diterima", "Disposisi", "Lidik", "Gelar", "Sidik", "Selesai"] as const;
export type StageIdx = 0 | 1 | 2 | 3 | 4 | 5;

export const JENIS = [
  "Penipuan online",
  "Peretasan dan kebocoran data",
  "Penipuan investasi",
  "Penggelapan",
  "Korupsi",
  "Narkotika",
  "Perdagangan orang",
  "Pertambangan ilegal",
  "Pencurian lintas wilayah",
  "Lainnya",
] as const;
/** Perkara yang rinciannya tidak boleh tampil di jalur publik. [validasi] daftar akhir oleh pimpinan. */
export const JENIS_SENSITIF: readonly string[] = ["Perdagangan orang"];
export type Jenis = (typeof JENIS)[number];

export type Peran = "pelapor" | "spkt" | "penyidik" | "pimpinan";

export interface Satker {
  nama: string;
  /** Baris kop surat. */
  kop: string;
  jabatan: string;
  singkat: string;
  sufiks: string;
  kejaksaan: string;
  kota: string;
}

export interface Pelapor {
  nama: string;
  nik: string;
  hp: string;
}

export interface Milestones {
  lapor: number;
  disp?: number;
  lidik?: number;
  sp1?: number;
  gelar?: number;
  sidik?: number;
  sp2?: number;
  selesai?: number;
}

export interface ExtraLog {
  t: number;
  title: string;
  pub: string;
  int: string;
}

export interface VideoCall {
  t: number;
  siapa: string;
  dibuat: number;
}

export interface Report {
  /** Urutan nomor laporan. Di produksi: urutan resmi dari sistem manajemen penyidikan. */
  no: number;
  /** Kode tiket yang tercetak pada STPL. */
  id: string;
  lp: string;
  satker: string;
  jenis: Jenis;
  judul: string;
  lokasi: string;
  stage: StageIdx;
  pelapor: Pelapor;
  unit: string;
  penyidik: string;
  kerugian: number;
  kejadian: number | null;
  uraian: string;
  kronologi: string;
  rencana: string;
  lidikNote?: string;
  gelarNote?: string;
  m: Milestones;
  extra?: ExtraLog[];
  vcall?: VideoCall;
  baru?: boolean;
}

export interface LogEntry {
  t: number;
  title: string;
  pub: string;
  int: string;
}

export interface DocRef {
  jenis: "STPL" | "SP2HP";
  ke?: number;
  kind?: "awal" | "sidik" | "selesai";
  t: number;
  kode: string;
}

export interface Flag {
  tone: "ok" | "warn" | "crit";
  teks: string;
}
