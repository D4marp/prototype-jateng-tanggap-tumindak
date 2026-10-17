import type { Metadata } from "next";
import { TiketForm } from "@/components/TiketForm";

export const metadata: Metadata = { title: "Cek progres" };

export default function Progres() {
  return (
    <div className="wrap">
      <header className="pb-2 pt-6">
        <p className="eyebrow m-0">SP2HP online</p>
        <h1 className="mb-2 mt-1.5 font-display text-[clamp(28px,5vw,38px)] font-bold uppercase leading-none">Status laporan</h1>
        <p className="m-0 max-w-[62ch] text-muted">Masukkan kode tiket yang tertera di STPL, atau pindai QR pada STPL. Anda akan diminta 4 digit terakhir nomor HP pelapor.</p>
      </header>
      <TiketForm variant="page" />
    </div>
  );
}
