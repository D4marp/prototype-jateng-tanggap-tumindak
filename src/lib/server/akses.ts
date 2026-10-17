import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { AKSES_PELAPOR_DETIK, LOOKUP } from "@/lib/domain/config";

const SECRET = process.env.JTT_SECRET ?? "dev-only-ganti-di-produksi";
const nama = (tiket: string) => `jtt_akses_${tiket}`;
const tanda = (tiket: string) => createHmac("sha256", SECRET).update(tiket).digest("hex").slice(0, 32);

export async function berikanAkses(tiket: string) {
  (await cookies()).set(nama(tiket), tanda(tiket), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AKSES_PELAPOR_DETIK,
  });
}

export async function punyaAkses(tiket: string): Promise<boolean> {
  const v = (await cookies()).get(nama(tiket))?.value;
  if (!v) return false;
  const a = Buffer.from(v);
  const b = Buffer.from(tanda(tiket));
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Pembatas percobaan salah per klien + tiket. Memori proses; produksi: Redis/gateway. */
const gagal = new Map<string, { n: number; reset: number }>();

export async function kunciKlien(tiket: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "lokal";
  return `${ip}|${tiket}`;
}
export function terkunci(kunci: string, now = Date.now()): boolean {
  const e = gagal.get(kunci);
  return !!e && e.reset > now && e.n >= LOOKUP.maksGagal;
}
export function catatGagal(kunci: string, now = Date.now()) {
  const e = gagal.get(kunci);
  if (!e || e.reset <= now) gagal.set(kunci, { n: 1, reset: now + LOOKUP.jendelaMs });
  else e.n++;
}
export const bersihkanGagal = (kunci: string) => void gagal.delete(kunci);

export async function getOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
