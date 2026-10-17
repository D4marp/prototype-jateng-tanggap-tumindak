import type { Metadata } from "next";
import { IconCheck } from "@/components/icons";
import { fmt } from "@/lib/domain/format";
import { SATKER } from "@/lib/domain/satker";
import { cariDokumen } from "@/lib/server/store";

export const metadata: Metadata = { title: "Verifikasi dokumen" };

export default async function Verifikasi(props: PageProps<"/verifikasi/[kode]">) {
  const kode = decodeURIComponent((await props.params).kode);
  const hit = cariDokumen(kode);
  return (
    <div className="wrap">
      <header className="pb-2 pt-6">
        <p className="eyebrow m-0">Pemeriksaan keaslian</p>
        <h1 className="mb-2 mt-1.5 font-display text-[clamp(28px,5vw,38px)] font-bold uppercase leading-none">Verifikasi dokumen</h1>
      </header>
      <div className="card mt-3 max-w-xl">
        <div className="card-b grid gap-3">
          {hit ? (
            <>
              <p className="m-0 inline-flex items-center gap-2 font-bold text-ok"><IconCheck className="size-4" />Kode dikenali oleh sistem</p>
              <dl className="kv">
                <dt>Kode</dt><dd className="font-mono">{hit.d.kode}</dd>
                <dt>Jenis dokumen</dt><dd>{hit.d.jenis === "STPL" ? "Surat Tanda Penerimaan Laporan" : `SP2HP ke-${hit.d.ke}`}</dd>
                <dt>Diterbitkan</dt><dd>{fmt(hit.d.t, false)}</dd>
                <dt>Satuan</dt><dd>{SATKER[hit.r.satker].nama}</dd>
              </dl>
              <p className="hint m-0">Isi perkara sengaja tidak ditampilkan di halaman ini. Simulasi: pada sistem produksi pemeriksaan dilakukan terhadap sertifikat elektronik yang diterbitkan penyelenggara sertifikasi elektronik, bukan sekadar pencarian kode.</p>
            </>
          ) : (
            <>
              <p className="m-0 font-bold text-crit">Kode tidak dikenali</p>
              <p className="m-0 text-muted">Dokumen dengan kode ini tidak tercatat. Perlakukan dokumen yang Anda pegang sebagai tidak terverifikasi dan hubungi SPKT terdekat.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
