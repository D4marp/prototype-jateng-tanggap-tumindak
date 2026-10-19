import type { Jenis, Satker } from "./types";

const KEJAKSAAN = "Kejaksaan Agung RI";

function dit(nama: string, kop: string, jabatan: string, singkat: string): Satker {
  return { nama, kop, jabatan, singkat, sufiks: nama, kejaksaan: KEJAKSAAN, kota: "Jakarta" };
}

/** Direktorat di lingkungan Bareskrim. [validasi] nama dan susunan resmi mengikuti organisasi yang berlaku. */
export const SATKER: Record<string, Satker> = {
  Dittipidum: dit("Dittipidum", "Direktorat Tindak Pidana Umum", "Direktur Tindak Pidana Umum", "Dirtipidum"),
  Dittipideksus: dit("Dittipideksus", "Direktorat Tindak Pidana Ekonomi Khusus", "Direktur Tindak Pidana Ekonomi Khusus", "Dirtipideksus"),
  Dittipidsiber: dit("Dittipidsiber", "Direktorat Tindak Pidana Siber", "Direktur Tindak Pidana Siber", "Dirtipidsiber"),
  Dittipidkor: dit("Dittipidkor", "Direktorat Tindak Pidana Korupsi", "Direktur Tindak Pidana Korupsi", "Dirtipidkor"),
  Dittipidnarkoba: dit("Dittipidnarkoba", "Direktorat Tindak Pidana Narkoba", "Direktur Tindak Pidana Narkoba", "Dirtipidnarkoba"),
  "Dittipid PPA-PPO": dit("Dittipid PPA-PPO", "Direktorat Tindak Pidana PPA dan PPO", "Direktur Tindak Pidana PPA dan PPO", "Dirtipid PPA-PPO"),
  Dittipidter: dit("Dittipidter", "Direktorat Tindak Pidana Tertentu", "Direktur Tindak Pidana Tertentu", "Dirtipidter"),
};

/** Direktorat dan subdit tujuan per jenis perkara. Penomoran subdit hanya contoh. */
const RUTE: Record<Jenis, [string, string]> = {
  "Penipuan online": ["Dittipidsiber", "Subdit I"],
  "Peretasan dan kebocoran data": ["Dittipidsiber", "Subdit II"],
  "Penipuan investasi": ["Dittipideksus", "Subdit I"],
  Penggelapan: ["Dittipideksus", "Subdit II"],
  Korupsi: ["Dittipidkor", "Subdit I"],
  Narkotika: ["Dittipidnarkoba", "Subdit I"],
  "Perdagangan orang": ["Dittipid PPA-PPO", "Subdit II"],
  "Pertambangan ilegal": ["Dittipidter", "Subdit I"],
  "Pencurian lintas wilayah": ["Dittipidum", "Subdit I"],
  Lainnya: ["Dittipidum", "Subdit III"],
};

export const satkerUntuk = (j: Jenis) => RUTE[j][0];
export const unitUntuk = (j: Jenis) => RUTE[j][1];
export const posLabel = (s: Satker, unit: string) => `${unit} ${s.nama}`;
