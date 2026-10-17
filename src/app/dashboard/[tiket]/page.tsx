import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/PageHead";
import { ReportDetail } from "@/components/ReportDetail";
import { RoleGate } from "@/components/RoleGate";
import { nowMs } from "@/lib/domain/clock";
import { getOrigin } from "@/lib/server/akses";
import { bolehLihatInternal, getPeran } from "@/lib/server/peran";
import { cariTiket } from "@/lib/server/store";
import { bangunView } from "@/lib/server/views";

export const metadata: Metadata = { title: "Detail laporan" };

export default async function DetailInternal(props: PageProps<"/dashboard/[tiket]">) {
  const { tiket } = await props.params;
  if (!bolehLihatInternal(await getPeran()))
    return <RoleGate butuh="penyidik" jalur={`/dashboard/${tiket}`} alasan="Detail internal laporan hanya dibuka untuk penyidik dan pimpinan." />;

  const r = cariTiket(decodeURIComponent(tiket));
  if (!r) notFound();
  const sebagaiPelapor = (await props.searchParams).tampilan === "pelapor";
  const v = await bangunView(r, sebagaiPelapor ? "pub" : "int", nowMs(), await getOrigin());
  const seg = "rounded px-3.5 py-1.5 text-[13.5px] font-medium text-muted no-underline aria-[current=true]:bg-surface aria-[current=true]:text-ink aria-[current=true]:shadow-sm";

  return (
    <>
      <PageHead judul="Detail laporan" balik={{ href: "/dashboard", teks: "Kembali ke dashboard" }} />
      <div className="wrap pt-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-md border border-line bg-sunk p-[3px]" role="group" aria-label="Pilih tampilan">
            <Link href={`/dashboard/${r.id}`} replace aria-current={!sebagaiPelapor} className={seg}>Tampilan penyidik</Link>
            <Link href={`/dashboard/${r.id}?tampilan=pelapor`} replace aria-current={sebagaiPelapor} className={seg}>Tampilan pelapor</Link>
          </div>
          <span className="text-[13px] text-muted">{sebagaiPelapor ? "Pratinjau persis data yang diterima peramban pelapor." : "Data penuh terlihat. Akses seperti ini harus tercatat di log audit."}</span>
        </div>
        <ReportDetail v={v} />
      </div>
    </>
  );
}
