import "server-only";
import { cookies } from "next/headers";
import type { Peran } from "@/lib/domain/types";

/**
 * SIMULASI PERAN untuk demo. Produksi: autentikasi petugas (SSO institusi + MFA) dan otorisasi per direktorat.
 * Cookie ini TIDAK aman dan hanya dipakai agar pemaparan bisa berpindah sudut pandang.
 */
export const PERAN_COOKIE = "jtt_peran";
export const PERAN_LABEL: Record<Peran, string> = {
  pelapor: "Pelapor (publik)",
  spkt: "Petugas SPKT",
  penyidik: "Penyidik",
  pimpinan: "Pimpinan",
};
const SAH = Object.keys(PERAN_LABEL) as Peran[];
export const peranSah = (v: string): v is Peran => (SAH as string[]).includes(v);

export async function getPeran(): Promise<Peran> {
  const v = (await cookies()).get(PERAN_COOKIE)?.value ?? "pelapor";
  return peranSah(v) ? v : "pelapor";
}

export const bolehBuatLaporan = (p: Peran) => p === "spkt";
export const bolehLihatInternal = (p: Peran) => p === "penyidik" || p === "pimpinan";
