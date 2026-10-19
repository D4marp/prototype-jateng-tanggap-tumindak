import { SLA } from "@/lib/domain/config";
import type { ReportView } from "@/lib/server/views";
import { IconLock } from "./icons";
import { DocList } from "./DocViewer";
import { FlagText, StagePill, Stepper } from "./Status";
import { VideoCallCard } from "./VideoCall";

/** Tampilan satu laporan. Dipakai untuk pelapor (level pub) dan penyidik (level int). */
export function ReportDetail({ v }: { v: ReportView }) {
  const pub = v.level === "pub";
  const int = v.internal;
  return (
    <div className="grid gap-5 min-[960px]:grid-cols-[1.5fr_1fr]">
      <div className="grid min-w-0 content-start gap-5">
        <section className="card">
          <div className="card-b grid gap-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[13px] text-muted">Kode tiket</div>
                <div className="font-mono text-2xl font-semibold tracking-tight">{v.id}</div>
                <div className="mt-1 font-mono text-xs text-muted [overflow-wrap:anywhere]">{v.lp}</div>
              </div>
              <StagePill stage={v.stage} />
            </div>
            <Stepper stage={v.stage} />
            <dl className="kv border-t border-line pt-4">
              <dt>Posisi laporan</dt><dd className="font-semibold">{v.posisi}</dd>
              <dt>Direktorat</dt><dd>{v.satker}</dd>
              <dt>Waktu lapor</dt><dd className="tabular-nums">{v.waktuLapor}</dd>
              <dt>Respons pertama</dt>
              <dd className="tabular-nums">
                {v.respon.ok ? (<><span className="font-semibold text-ok">{v.respon.teks}</span> <span className="text-muted">(target ≤ {SLA.disposisiJam} jam)</span></>) : (<span className="text-muted">{v.respon.teks}</span>)}
              </dd>
              <dt>Jenis perkara</dt><dd>{v.jenis}</dd>
              <dt>Lokasi kejadian</dt><dd>{v.lokasi}</dd>
              <dt>Waktu kejadian</dt><dd className="tabular-nums">{v.kejadian}</dd>
              {int && (<><dt>Status layanan</dt><dd><FlagText flag={int.flag} /></dd></>)}
            </dl>
          </div>
        </section>

        <section className="card">
          <h2 className="card-h">Detail laporan</h2>
          <div className="card-b">
            <p className="m-0"><b>{v.judul}.</b> {v.uraian}</p>
            {v.kerugian && <p className="mb-0 mt-2 text-sm text-muted">Perkiraan kerugian: <span className="tabular-nums">{v.kerugian}</span></p>}
            {int ? (
              <div className="mt-4 grid gap-3">
                <div className="border-l-[3px] border-sid bg-panel px-3.5 py-2.5 text-[14.5px]"><b className="mb-0.5 block text-[13px] text-sid">Kronologi lengkap (internal)</b>{int.kronologi}</div>
                <div className="border-l-[3px] border-sid bg-panel px-3.5 py-2.5 text-[14.5px]"><b className="mb-0.5 block text-[13px] text-sid">Rencana tindak lanjut (internal)</b>{int.rencana}</div>
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-2.5 border-t border-line pt-3.5 text-[13.5px] text-muted">
                <IconLock className="mt-0.5 size-4 flex-none" />
                <span>Kronologi lengkap, hasil penyelidikan, dan rencana tindak lanjut hanya terlihat oleh penyidik dan pimpinan.</span>
              </div>
            )}
          </div>
        </section>

        <section className="card">
          <h2 className="card-h">Riwayat tindak lanjut <span className="text-[13px] font-normal text-muted">{v.log.length} catatan</span></h2>
          <ol className="m-0 list-none p-0">
            {v.log.map((e) => (
              <li key={e.judul + e.waktu} className="grid gap-x-5 gap-y-1 border-b border-line px-4 py-3.5 last:border-0 sm:grid-cols-[150px_1fr]">
                <div className="text-[13px] tabular-nums text-muted">{e.waktu}<span className="block text-xs">{e.lalu}</span></div>
                <div>
                  <b className="block">{e.judul}</b>
                  <p className="m-0 mt-0.5 text-[14.5px]">{e.pub}</p>
                  {e.internal && (<div className="mt-2 border-l-[3px] border-sid bg-panel px-3 py-1.5 text-[13px]"><b className="text-sid">Internal.</b> {e.internal}</div>)}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="grid min-w-0 content-start gap-5">
        <section className="card">
          <h2 className="card-h">Penanganan</h2>
          <div className="card-b">
            <dl className="kv">
              <dt>Unit</dt><dd>{v.unit}</dd>
              <dt>Penyidik</dt><dd>{v.penyidik}</dd>
              {int && (<><dt>SP2HP terakhir</dt><dd className="tabular-nums">{int.sp2hpTerakhir}</dd></>)}
            </dl>
          </div>
        </section>

        {v.vcall && (
          <section className="card">
            <h2 className="card-h">Pemeriksaan lewat video call</h2>
            <VideoCallCard {...v.vcall} />
          </section>
        )}

        <section className="card">
          <h2 className="card-h">Dokumen</h2>
          <div className="card-b"><DocList docs={v.docs} /></div>
        </section>

        <section className="card">
          <h2 className="card-h">Pelapor</h2>
          <div className="card-b">
            <dl className="kv">
              <dt>Nama</dt><dd>{v.pelapor.nama}</dd>
              <dt>NIK</dt><dd className="font-mono text-[13.5px] tabular-nums">{v.pelapor.nik}</dd>
              <dt>Nomor HP</dt><dd className="font-mono text-[13.5px] tabular-nums">{v.pelapor.hp}</dd>
              <dt>Sumber</dt><dd>{v.sumber}</dd>
            </dl>
            <p className="hint">{pub ? "Identitas disamarkan sebagian untuk melindungi pelapor." : "Identitas tetap disamarkan sebagian di layar. Data utuh hanya di sistem sumber."}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
