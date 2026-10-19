import { z } from "zod";
import { JENIS } from "@/lib/domain/types";

const digits = (s: string) => s.replace(/\D/g, "");

export const laporanSchema = z.object({
  nama: z.string().trim().min(3, "Isi nama lengkap pelapor."),
  nik: z.string().transform(digits).pipe(z.string().length(16, "NIK harus 16 digit angka.")),
  hp: z.string().transform(digits).pipe(z.string().min(10, "Nomor HP minimal 10 digit.").max(15, "Nomor HP terlalu panjang.")),
  jenis: z.enum(JENIS, { error: "Pilih jenis perkara." }),
  lokasi: z.string().trim().min(3, "Isi lokasi kejadian."),
  kronologi: z.string().trim().min(20, "Tulis kronologi minimal satu kalimat lengkap."),
  waktu: z.string().optional(),
  kerugian: z.string().optional().transform((s) => Number(digits(s ?? "")) || 0),
  bersediaVideoCall: z.boolean(),
});
export type LaporanInput = z.infer<typeof laporanSchema>;

export const verifikasiSchema = z.object({
  digit: z.string().transform(digits).pipe(z.string().length(4, "Isi 4 digit terakhir nomor HP pelapor.")),
});
