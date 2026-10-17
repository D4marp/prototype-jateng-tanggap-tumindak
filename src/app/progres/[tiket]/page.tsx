import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
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
      <>
        <PageHead judul="Buka status laporan" sub={<>Kode tiket <span className="font-mono text-ink">{tiket.slice(0, 20)}</span></>} />
        <div className="wrap pt-6">
          <div className="card max-w-xl"><div className="card-b"><VerifikasiForm tiket={tiket} /></div></div>
          {demo && (
            <p className="mt-4 max-w-xl border-l-[3px] border-gold bg-gold-soft px-3.5 py-2.5 text-[13px]">
              <b>Bantuan demo.</b> 4 digit terakhir HP untuk tiket contoh ini adalah <span className="font-mono">{demo}</span>. Baris ini tidak ada di sistem sebenarnya.
            </p>
          )}
        </div>
      </>
    );
  }

  const v = await bangunView(r, "pub", nowMs(), await getOrigin());
  return (
    <>
      <PageHead judul="Status laporan" sub={`Tampilan pelapor. Sebagian data disamarkan dan akses berlaku ${AKSES_PELAPOR_DETIK / 60} menit.`} />
      <div className="wrap pt-6"><ReportDetail v={v} /></div>
    </>
  );
}
