import type { Metadata } from "next";
import { ReportDetail } from "@/components/ReportDetail";
import { VerifikasiForm } from "@/components/VerifikasiForm";
import { nowMs } from "@/lib/domain/clock";
import { AKSES_PELAPOR_DETIK } from "@/lib/domain/config";
import { getOrigin, punyaAkses } from "@/lib/server/akses";
import { cariTiket, normalisasiTiket, TIKET_RE } from "@/lib/server/store";
import { bangunView } from "@/lib/server/views";

export const metadata: Metadata = { title: "Status laporan" };

export default async function StatusLaporan(props: PageProps<"/progres/[tiket]">) {
  const tiket = normalisasiTiket(decodeURIComponent((await props.params).tiket));
  const r = TIKET_RE.test(tiket) ? cariTiket(tiket) : undefined;

  if (!r || !(await punyaAkses(r.id))) {
    // Pesan sama untuk tiket yang ada maupun tidak, agar kode tidak bisa ditebak lewat halaman ini.
    const demo = process.env.NEXT_PUBLIC_DEMO !== "0" && r ? r.pelapor.hp.slice(-4) : null;
    return (
      <div className="wrap">
        <header className="pb-2 pt-6">
          <p className="eyebrow m-0">Verifikasi pelapor</p>
          <h1 className="mb-2 mt-1.5 font-display text-[clamp(28px,5vw,38px)] font-bold uppercase leading-none">Buka status laporan</h1>
          <p className="m-0 font-mono text-lg">{tiket.slice(0, 20)}</p>
        </header>
        <div className="card mt-3 max-w-xl"><div className="card-b"><VerifikasiForm tiket={tiket} /></div></div>
        {demo && (
          <p className="mt-3 max-w-xl rounded-[10px] border border-dashed border-line px-3.5 py-2.5 text-[13px] text-muted">
            <b className="text-ink">Bantuan demo:</b> 4 digit terakhir HP untuk tiket contoh ini adalah <span className="font-mono">{demo}</span>. Baris ini tidak ada di sistem sebenarnya.
          </p>
        )}
      </div>
    );
  }

  const v = await bangunView(r, "pub", nowMs(), await getOrigin());
  return (
    <div className="wrap">
      <header className="pb-2 pt-6">
        <p className="eyebrow m-0">SP2HP online</p>
        <h1 className="mb-2 mt-1.5 font-display text-[clamp(28px,5vw,38px)] font-bold uppercase leading-none">Status laporan</h1>
        <p className="m-0 text-muted">Tampilan pelapor. Sebagian data disamarkan dan akses berlaku {AKSES_PELAPOR_DETIK / 60} menit.</p>
      </header>
      <div className="mt-4"><ReportDetail v={v} /></div>
    </div>
  );
}
