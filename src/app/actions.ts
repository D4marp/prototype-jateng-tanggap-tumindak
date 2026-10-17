"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { nowMs } from "@/lib/domain/clock";
import { parseWib } from "@/lib/domain/format";
import { berikanAkses, bersihkanGagal, catatGagal, getOrigin, kunciKlien, terkunci } from "@/lib/server/akses";
import { bolehBuatLaporan, getPeran, PERAN_COOKIE, peranSah } from "@/lib/server/peran";
import { buatLaporan, cariTiket, normalisasiTiket, TIKET_RE, turunan } from "@/lib/server/store";
import { qrSvg } from "@/lib/server/views";
import { laporanSchema, verifikasiSchema } from "@/lib/validation";

export async function setPeranAction(fd: FormData) {
  const p = String(fd.get("peran") ?? "");
  const kembali = String(fd.get("kembali") ?? "/");
  if (peranSah(p)) (await cookies()).set(PERAN_COOKIE, p, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 8 });
  redirect(kembali.startsWith("/") && !kembali.startsWith("//") ? kembali : "/");
}

export type LaporState =
  | { status: "idle" }
  | { status: "error"; pesan?: string; errors: Record<string, string>; values: Record<string, string> }
  | { status: "ok"; id: string; lp: string; kodeStpl: string; qr: string; url: string };

export async function buatLaporanAction(_: LaporState, fd: FormData): Promise<LaporState> {
  const values = Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string")) as Record<string, string>;
  if (!bolehBuatLaporan(await getPeran()))
    return { status: "error", pesan: "Hanya petugas SPKT yang dapat membuat laporan.", errors: {}, values };

  const parsed = laporanSchema.safeParse({ ...values, bersediaVideoCall: fd.get("bersediaVideoCall") === "on" });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return { status: "error", errors, values };
  }
  const v = parsed.data;
  const now = nowMs();
  const r = buatLaporan({ ...v, waktu: v.waktu ? parseWib(v.waktu) : null }, now);
  const url = `${await getOrigin()}/progres/${r.id}`;
  return { status: "ok", id: r.id, lp: r.lp, kodeStpl: turunan(r).docs[0].kode, qr: await qrSvg(url, 100), url };
}

export type VerifikasiState = { status: "idle" } | { status: "error"; pesan: string };

const GAGAL = "Kode tiket atau 4 digit terakhir nomor HP tidak cocok.";

export async function verifikasiTiketAction(_: VerifikasiState, fd: FormData): Promise<VerifikasiState> {
  const tiket = normalisasiTiket(String(fd.get("tiket") ?? ""));
  const kunci = await kunciKlien(tiket);
  if (terkunci(kunci)) return { status: "error", pesan: "Terlalu banyak percobaan. Coba lagi dalam 10 menit atau hubungi SPKT." };

  const d = verifikasiSchema.safeParse({ digit: String(fd.get("digit") ?? "") });
  if (!d.success) return { status: "error", pesan: d.error.issues[0].message };

  const r = TIKET_RE.test(tiket) ? cariTiket(tiket) : undefined;
  if (!r || !r.pelapor.hp.endsWith(d.data.digit)) {
    catatGagal(kunci);
    return { status: "error", pesan: GAGAL };
  }
  bersihkanGagal(kunci);
  await berikanAkses(r.id);
  redirect(`/progres/${r.id}`);
}
