import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Bars, Kpis, Spark, StackBar, TabelLaporan } from "@/components/DashboardParts";
import { RoleGate } from "@/components/RoleGate";
import { nowMs } from "@/lib/domain/clock";
import { AGREGAT, PER_JENIS, RESPON_MINGGUAN, RESPON_SATKER } from "@/lib/domain/seed";
import { nf } from "@/lib/domain/format";
import { bolehLihatInternal, getPeran } from "@/lib/server/peran";
import { semuaLaporan } from "@/lib/server/store";
import { daftarBaris } from "@/lib/server/views";

export const metadata: Metadata = { title: "Dashboard" };

const FILTER = [["semua", "Semua"], ["perlu", "Perlu tindak lanjut"], ["lidik", "Lidik / gelar"], ["sidik", "Sidik"], ["selesai", "Selesai"]] as const;
const warnaSatker = (v: number) => (v <= 3 ? "var(--ok)" : v <= 6 ? "var(--gold)" : "var(--brand)");

export default async function Dashboard(props: PageProps<"/dashboard">) {
  if (!bolehLihatInternal(await getPeran()))
    return <RoleGate butuh="pimpinan" jalur="/dashboard" alasan="Dashboard memuat seluruh laporan lintas direktorat dan hanya dibuka untuk penyidik dan pimpinan." />;

  const f = String((await props.searchParams).f ?? "semua");
  const laporan = semuaLaporan();
  const baru = laporan.filter((r) => r.baru).length;
  const semua = daftarBaris(laporan, nowMs());
  const perlu = semua.filter((r) => r.flag.tone !== "ok").length;
  const rows = semua.filter((r) => (f === "perlu" ? r.flag.tone !== "ok" : f === "lidik" ? r.stage === 2 || r.stage === 3 : f === "sidik" ? r.stage === 4 : f === "selesai" ? r.stage === 5 : true));

  return (
    <>
      <PageHead judul="Dashboard Bareskrim Polri" sub={`Seluruh direktorat, Oktober 2026. Angka rekap adalah data sintetis; tabel di bawah memuat ${semua.length} laporan contoh yang dapat dibuka.`} />
      <div className="wrap grid gap-5 pt-6">
      <Kpis
        items={[
          { label: "Laporan masuk", nilai: nf(AGREGAT.masuk + baru), catatan: "SPKT Bareskrim Polri" },
          { label: "Menunggu disposisi", nilai: nf(AGREGAT.s01 + baru), catatan: "target ≤ 1×24 jam" },
          { label: "Penyelidikan", nilai: nf(AGREGAT.lidik), catatan: `${AGREGAT.gelar} lainnya di tahap gelar` },
          { label: "Penyidikan", nilai: nf(AGREGAT.sidik), catatan: "SPDP sudah dikirim" },
          { label: "Selesai (P21)", nilai: nf(AGREGAT.selesai), catatan: "Tahap II ke kejaksaan" },
          { label: "Respons pertama", nilai: "2,1 jam", catatan: "rata-rata Bareskrim minggu ini", sorot: true },
        ]}
      />

      <div className="grid gap-5 min-[920px]:grid-cols-2">
        <section className="card"><h2 className="card-h">Sebaran tahap penanganan</h2><div className="card-b">
          <StackBar segs={[["Diterima & disposisi", AGREGAT.s01 + baru, "var(--blue)"], ["Penyelidikan", AGREGAT.lidik, "var(--gold)"], ["Gelar perkara", AGREGAT.gelar, "var(--gelar)"], ["Penyidikan", AGREGAT.sidik, "var(--sid)"], ["Selesai", AGREGAT.selesai, "var(--ok)"]]} />
        </div></section>
        <section className="card"><h2 className="card-h">Respons pertama rata-rata <span className="text-[13px] font-normal text-muted">jam, per minggu</span></h2><div className="card-b">
          <Spark data={RESPON_MINGGUAN} />
          <p className="hint mt-2">Waktu dari laporan masuk sampai disposisi pimpinan.</p>
        </div></section>
        <section className="card"><h2 className="card-h">Respons pertama per direktorat <span className="text-[13px] font-normal text-muted">jam, contoh</span></h2><div className="card-b">
          <Bars rows={RESPON_SATKER} max={8} warna={warnaSatker} satuan="jam" />
          <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-4 gap-y-2 text-[13.5px]">
            {[["var(--ok)", "≤ 3 jam"], ["var(--gold)", "3–6 jam"], ["var(--brand)", "> 6 jam, perlu atensi"]].map(([c, l]) => (<div key={l} className="flex items-center gap-2"><i className="size-2.5 rounded-[3px]" style={{ background: c }} />{l}</div>))}
          </div>
        </div></section>
        <section className="card"><h2 className="card-h">Laporan per jenis perkara</h2><div className="card-b"><Bars rows={PER_JENIS} max={Math.max(...PER_JENIS.map((j) => j[1]))} /></div></section>
      </div>

      <section className="card">
        <h2 className="card-h">
          <span>Laporan terbaru</span>
          <nav aria-label="Filter laporan" className="flex flex-wrap gap-2">
            {FILTER.map(([k, l]) => (
              <Link key={k} href={k === "semua" ? "/dashboard" : `/dashboard?f=${k}`} replace scroll={false} aria-current={f === k ? "true" : undefined} className="rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink no-underline hover:bg-sunk aria-[current=true]:border-ink aria-[current=true]:bg-ink aria-[current=true]:text-white">
                {k === "perlu" ? `${l} (${perlu})` : l}
              </Link>
            ))}
          </nav>
        </h2>
        <TabelLaporan rows={rows} />
      </section>
      </div>
    </>
  );
}