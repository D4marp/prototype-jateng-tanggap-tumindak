import { BRAND } from "@/lib/brand";
import { ROMAWI, wib } from "./format";

/** Kode tiket yang tercetak di STPL. Produksi: ganti dengan kode acak tak-berurutan + digit pemeriksa. */
export function kodeTiket(no: number, tLapor: number): string {
  const d = wib(tLapor);
  const yy = String(d.getUTCFullYear()).slice(2);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${BRAND.tiketPrefix}-${yy}${mm}-${String(no).padStart(4, "0")}`;
}

export function nomorLp(no: number, tLapor: number): string {
  const d = wib(tLapor);
  return `LP/B/${no}/${ROMAWI[d.getUTCMonth()]}/${d.getUTCFullYear()}/SPKT/BARESKRIM POLRI`;
}

/** Kode verifikasi dokumen (simulasi). Produksi: nomor seri sertifikat elektronik penyelenggara TTE. */
export function kodeTte(seed: string): string {
  let h = 2166136261;
  for (const c of seed) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  const x = (h >>> 0).toString(16).toUpperCase().padStart(8, "0");
  return `TTE-${x.slice(0, 4)}-${x.slice(4)}`;
}
