import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { TiketForm } from "@/components/TiketForm";

export const metadata: Metadata = { title: "Cek progres" };

export default function Progres() {
  return (
    <>
      <PageHead judul="Cek status laporan" sub="Masukkan kode tiket yang tertera di STPL, atau pindai QR pada STPL. Anda akan diminta 4 digit terakhir nomor HP pelapor." />
      <div className="wrap pt-6"><div className="card max-w-xl"><div className="card-b"><TiketForm id="tiket-cek" /></div></div></div>
    </>
  );
}
