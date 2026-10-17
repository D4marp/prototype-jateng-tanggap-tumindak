/**
 * Parameter layanan. Semua angka di sini MASIH CONTOH dan menunggu penetapan pimpinan.
 * Ubah di satu tempat ini, seluruh tampilan, bendera keterlambatan, dan dashboard ikut berubah.
 */
export const SLA = {
  /** Batas waktu laporan masuk sampai disposisi (jam). */
  disposisiJam: 24,
  /** Selang maksimum antar-SP2HP (hari). */
  sp2hpHari: 14,
} as const;

/** Batas percobaan salah saat verifikasi tiket publik. */
export const LOOKUP = { maksGagal: 5, jendelaMs: 10 * 60_000 } as const;

/** Masa berlaku akses pelapor setelah verifikasi. */
export const AKSES_PELAPOR_DETIK = 30 * 60;

/** Waktu acuan demo (WIB). Jam demo berjalan maju dari titik ini sejak server hidup. */
export const ANCHOR_DEMO = "2026-10-17T09:00:00+07:00";
