import type { Metadata } from "next";
import { LaporForm } from "@/components/LaporForm";
import { PageHead } from "@/components/PageHead";
import { RoleGate } from "@/components/RoleGate";
import { bolehBuatLaporan, getPeran } from "@/lib/server/peran";

export const metadata: Metadata = { title: "Buat laporan" };

export default async function Lapor() {
  if (!bolehBuatLaporan(await getPeran()))
    return <RoleGate butuh="spkt" jalur="/lapor" alasan="Laporan dibuat oleh petugas SPKT bersama pelapor di front office. Pelapor memantau perkembangannya lewat halaman Cek Progres." />;
  return (
    <>
      <PageHead judul="Buat laporan polisi" sub="Diisi petugas SPKT Bareskrim bersama pelapor. Setelah disimpan, sistem menerbitkan STPL berbarcode dengan tanda tangan elektronik." />
      <div className="wrap pt-6"><LaporForm /></div>
    </>
  );
}
