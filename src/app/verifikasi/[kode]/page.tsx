import type { Metadata } from "next";
import { IconCheck } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { fmt } from "@/lib/domain/format";
import { SATKER } from "@/lib/domain/satker";
import { cariDokumen } from "@/lib/server/store";

export const metadata: Metadata = { title: "Verifikasi dokumen" };

export default async function Verifikasi(props: PageProps<"/verifikasi/[kode]">) {
  const kode = decodeURIComponent((await props.params).kode);
  const hit = cariDokumen(kode);
  return (
    <>
      <PageHead judul="Verifikasi dokumen" sub="Pemeriksaan keaslian STPL dan SP2HP dari kode pada kotak tanda tangan elektronik." />
      <div className="wrap pt-6">
        <div className="card max-w-xl">
          <div className="card-b grid gap-3.5">
            {hit ? (
              <>
                <p className="m-0 inline-flex items-center gap-2 font-semibold text-ok"><IconCheck className="size-4" />Kode dikenali oleh sistem</p>
                <dl className="kv">
                  <dt>Kode</dt><dd className="font-mono">{hit.d.kode}</dd>
                  <dt>Jenis dokumen</dt><dd>{hit.d.jenis === "STPL" ? "Surat Tanda Penerimaan Laporan" : `SP2HP ke-${hit.d.ke}`}</dd>
                  <dt>Diterbitkan</dt><dd>{fmt(hit.d.t, false)}</dd>
                  <dt>Satuan</dt><dd>{SATKER[hit.r.satker].nama}</dd>
                </dl>
                <p className="hint m-0">Isi perkara sengaja tidak ditampilkan di halaman ini. Simulasi: pada sistem produksi pemeriksaan dilakukan terhadap sertifikat elektronik dari penyelenggara sertifikasi elektronik, bukan sekadar pencarian kode.</p>
              </>
            ) : (
              <>
                <p className="m-0 font-semibold text-crit">Kode tidak dikenali</p>
                <p className="m-0 text-muted">Dokumen dengan kode ini tidak tercatat. Perlakukan dokumen yang Anda pegang sebagai tidak terverifikasi dan hubungi SPKT terdekat.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
