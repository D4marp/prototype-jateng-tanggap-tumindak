const BLN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
export const ROMAWI = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const WIB = 7 * 3600e3;
const pad = (n: number) => String(n).padStart(2, "0");

/** Komponen tanggal dalam WIB. */
export const wib = (t: number) => new Date(t + WIB);
export const parseWib = (s: string) => Date.parse(`${s}:00+07:00`);

export function fmt(t: number, jam = true): string {
  const d = wib(t);
  const tgl = `${d.getUTCDate()} ${BLN[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  return jam ? `${tgl}, ${pad(d.getUTCHours())}.${pad(d.getUTCMinutes())} WIB` : tgl;
}
export const jamWib = (t: number) => `${pad(wib(t).getUTCHours())}.${pad(wib(t).getUTCMinutes())}`;

export function dur(ms: number): string {
  const m = Math.max(1, Math.round(ms / 6e4));
  if (m < 60) return `${m} menit`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h < 24) return `${h} jam${mm ? ` ${mm} menit` : ""}`;
  const d = Math.floor(h / 24);
  const hh = h % 24;
  return `${d} hari${hh ? ` ${hh} jam` : ""}`;
}

export function ago(now: number, t: number): string {
  const ms = now - t;
  if (ms < 0) return "akan datang";
  const d = Math.floor(ms / 864e5);
  if (d >= 1) return `${d} hari lalu`;
  const h = Math.floor(ms / 36e5);
  if (h >= 1) return `${h} jam lalu`;
  return `${Math.max(1, Math.floor(ms / 6e4))} menit lalu`;
}

export const nf = (n: number) => n.toLocaleString("id-ID");
export const rp = (n: number) => `Rp${nf(n)}`;
export const desimal = (n: number) => String(n).replace(".", ",");

/** "Rahmat Wibisono" -> "R***** W*********". */
export const maskNama = (n: string) =>
  n
    .split(" ")
    .map((w) => (w.length < 2 ? w : w[0] + "*".repeat(w.length - 1)))
    .join(" ");
/** Pangkat tetap terbaca, nama disamarkan: "Bripka Dwi Hartanto" -> "Bripka D** H******". */
export const maskPenyidik = (p: string) => {
  const a = p.split(" ");
  return `${a[0]} ${maskNama(a.slice(1).join(" "))}`;
};
export const maskNik = (nik: string) => `${nik.slice(0, 4)}${"*".repeat(8)}${nik.slice(12)}`;
export const maskHp = (hp: string) => `${hp.slice(0, 4)}${"*".repeat(Math.max(hp.length - 8, 4))}${hp.slice(-4)}`;
