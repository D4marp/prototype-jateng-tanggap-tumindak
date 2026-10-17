import type { Jenis, Satker } from "./types";

function polres(nama: string, kop: string, kejari: string, kota: string): Satker {
  return {
    nama,
    polda: false,
    kop,
    lp: nama.toUpperCase(),
    reskrim: `Satreskrim ${nama}`,
    jabatan: "Kepala Satuan Reserse Kriminal",
    singkat: "Kasat Reskrim",
    sufiks: "Reskrim",
    kejaksaan: kejari,
    kota,
  };
}

export const SATKER: Record<string, Satker> = {
  "Ditreskrimum Polda Jateng": {
    nama: "Ditreskrimum Polda Jateng",
    polda: true,
    kop: "Direktorat Reserse Kriminal Umum",
    lp: "",
    reskrim: "Ditreskrimum Polda Jateng",
    jabatan: "Direktur Reserse Kriminal Umum",
    singkat: "Dirreskrimum",
    sufiks: "Ditreskrimum",
    kejaksaan: "Kejaksaan Tinggi Jawa Tengah",
    kota: "Semarang",
  },
  "Polrestabes Semarang": polres("Polrestabes Semarang", "Resor Kota Besar Semarang", "Kejaksaan Negeri Kota Semarang", "Semarang"),
  "Polresta Surakarta": polres("Polresta Surakarta", "Resor Kota Surakarta", "Kejaksaan Negeri Surakarta", "Surakarta"),
  "Polresta Banyumas": polres("Polresta Banyumas", "Resor Kota Banyumas", "Kejaksaan Negeri Banyumas", "Banyumas"),
  "Polres Blora": polres("Polres Blora", "Resor Blora", "Kejaksaan Negeri Blora", "Blora"),
  "Polres Boyolali": polres("Polres Boyolali", "Resor Boyolali", "Kejaksaan Negeri Boyolali", "Boyolali"),
  "Polres Demak": polres("Polres Demak", "Resor Demak", "Kejaksaan Negeri Demak", "Demak"),
  "Polres Grobogan": polres("Polres Grobogan", "Resor Grobogan", "Kejaksaan Negeri Grobogan", "Purwodadi"),
  "Polres Jepara": polres("Polres Jepara", "Resor Jepara", "Kejaksaan Negeri Jepara", "Jepara"),
  "Polres Kendal": polres("Polres Kendal", "Resor Kendal", "Kejaksaan Negeri Kendal", "Kendal"),
  "Polres Klaten": polres("Polres Klaten", "Resor Klaten", "Kejaksaan Negeri Klaten", "Klaten"),
  "Polres Kudus": polres("Polres Kudus", "Resor Kudus", "Kejaksaan Negeri Kudus", "Kudus"),
  "Polres Sragen": polres("Polres Sragen", "Resor Sragen", "Kejaksaan Negeri Sragen", "Sragen"),
};
export const NAMA_SATKER = Object.keys(SATKER);

/** Unit di Polres. */
export const UNIT_POLRES: Record<Jenis, string> = {
  "Penipuan online": "Unit Ekonomi",
  Penggelapan: "Unit Ekonomi",
  Pencurian: "Unit Resmob",
  "Pencurian kendaraan bermotor": "Unit Resmob",
  "Pencurian ternak": "Unit Resmob",
  Penganiayaan: "Unit Pidum",
  Perusakan: "Unit Pidum",
  Lainnya: "Unit Pidum",
};
/** Subdit di Ditreskrimum Polda. */
export const SUBDIT_POLDA: Record<Jenis, string> = {
  "Penipuan online": "Subdit II Harda Bangtah",
  Penggelapan: "Subdit II Harda Bangtah",
  Pencurian: "Subdit III Jatanras",
  "Pencurian kendaraan bermotor": "Subdit III Jatanras",
  "Pencurian ternak": "Subdit III Jatanras",
  Penganiayaan: "Subdit III Jatanras",
  Perusakan: "Subdit III Jatanras",
  Lainnya: "Subdit III Jatanras",
};

export const unitUntuk = (s: Satker, j: Jenis) => (s.polda ? SUBDIT_POLDA[j] : UNIT_POLRES[j]);
export const posLabel = (s: Satker, unit: string) => (s.polda ? `${unit} ${s.nama}` : `${unit} ${s.reskrim}`);
