import type { Metadata } from "next";
import { LaporForm } from "@/components/LaporForm";
import { RoleGate } from "@/components/RoleGate";
import { bolehBuatLaporan, getPeran } from "@/lib/server/peran";

export const metadata: Metadata = { title: "Buat laporan" };

export default async function Lapor() {
  if (!bolehBuatLaporan(await getPeran()))
    return <RoleGate butuh="spkt" jalur="/lapor" alasan="Laporan dibuat oleh petugas SPKT bersama pelapor di front office. Pelapor memantau perkembangannya lewat halaman Cek Progres." />;
  return (
    <div className="wrap">
      <header className="pb-2 pt-6">
        <p className="eyebrow m-0">E-MP front office · SPKT</p>
        <h1 className="mb-2 mt-1.5 font-display text-[clamp(28px,5vw,38px)] font-bold uppercase leading-none">Buat laporan polisi</h1>
        <p className="m-0 max-w-[62ch] text-muted">Diisi petugas SPKT Polda atau Polres bersama pelapor. Setelah disimpan, sistem menerbitkan STPL berbarcode dengan tanda tangan elektronik.</p>
      </header>
      <LaporForm />
    </div>
  );
}
