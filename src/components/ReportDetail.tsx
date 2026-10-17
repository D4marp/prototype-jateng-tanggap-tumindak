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
    <div className="grid gap-4 min-[920px]:grid-cols-[1.45fr_1fr]">
      <div className="grid min-w-0 content-start gap-4">
        <section className="card">
          <div className="card-b grid gap-4">
            <div className="flex flex-wrap items-start justify-between gap-2.5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Nomor tiket</div>
                <div className="font-mono text-[22px] font-semibold">{v.id}</div>
                <div className="mt-1 font-mono text-xs text-muted [overflow-wrap:anywhere]">{v.lp}</div>
              </div>
              <StagePill stage={v.stage} />
            </div>
            <Stepper stage={v.stage} />
            <dl className="kv">
              <dt>Posisi laporan</dt>
              <dd><span className="inline-block rounded-md bg-ok-soft px-2 py-1 text-[12.5px] font-bold uppercase leading-snug text-ok">{v.posisi}</span></dd>
              <dt>Satker</dt><dd>{v.satker}</dd>
              <dt>Waktu lapor</dt><dd className="tabular-nums">{v.waktuLapor}</dd>
              <dt>Respons pertama</dt>
              <dd className="tabular-nums">
                {v.respon.ok ? (<><span className="font-semibold text-ok">{v.respon.teks}</span> <span className="text-muted">· target ≤ {SLA.disposisiJam} jam</span></>) : (<span className="text-muted">{v.respon.teks}</span>)}
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
            <p className="m-0 text-[14.5px]"><b>{v.judul}.</b> {v.uraian}</p>
            {v.kerugian && <p className="mt-2 text-sm text-muted">Perkiraan kerugian: <span className="tabular-nums">{v.kerugian}</span></p>}
            {int ? (
              <>
                <div className="mt-3 rounded-[10px] bg-sunk px-3.5 py-3 text-[14.5px]"><b className="mb-1 block">Kronologi lengkap</b>{int.kronologi}</div>
                <div className="mt-3 rounded-[10px] bg-sunk px-3.5 py-3 text-[14.5px]"><b className="mb-1 block">Rencana tindak lanjut</b>{int.rencana}</div>
              </>
            ) : (
              <div className="mt-3 flex items-start gap-2.5 rounded-[10px] border border-dashed border-line px-3 py-[11px] text-[13.5px] text-muted">
                <IconLock className="mt-0.5 size-[18px] flex-none" />
                <span>Kronologi lengkap, hasil penyelidikan, dan rencana tindak lanjut hanya terlihat oleh penyidik dan pimpinan.</span>
              </div>
            )}
          </div>
        </section>

        <section className="card">
          <h2 className="card-h">Riwayat tindak lanjut <span className="text-[13px] font-medium text-muted">{v.log.length} catatan</span></h2>
          <div className="card-b">
            <ol className="m-0 list-none p-0">
              {v.log.map((e, i) => (
                <li key={e.judul + e.waktu} className={`relative pl-7 ${i < v.log.length - 1 ? "pb-[18px] before:absolute before:bottom-[-6px] before:left-1.5 before:top-2.5 before:w-0.5 before:bg-line" : ""} after:absolute after:left-px after:top-1.5 after:size-3 after:rounded-full ${i === 0 ? "after:bg-gold after:shadow-[0_0_0_3px_var(--gold-soft)]" : "after:bg-info after:shadow-[0_0_0_3px_var(--info-soft)]"}`}>
                  <b className="block text-[15px]">{e.judul}</b>
                  <span className="text-[12.5px] tabular-nums text-muted">{e.waktu} · {e.lalu}</span>
                  <p className="mb-0 mt-1 text-sm">{e.pub}</p>
                  {e.internal && (
                    <div className="mt-1.5 rounded-lg bg-sid-soft px-2.5 py-[7px] text-[13px]"><i className="mr-1 font-bold not-italic text-sid">Catatan internal</i>{e.internal}</div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="grid min-w-0 content-start gap-4">
        <section className="card">
          <h2 className="card-h">Informasi pelapor</h2>
          <div className="card-b">
            <dl className="kv">
              <dt>Nama</dt><dd>{v.pelapor.nama}</dd>
              <dt>NIK</dt><dd className="font-mono tabular-nums">{v.pelapor.nik}</dd>
              <dt>Nomor HP</dt><dd className="font-mono tabular-nums">{v.pelapor.hp}</dd>
              <dt>Sumber</dt><dd>{v.sumber}</dd>
            </dl>
            {!pub && <p className="hint">Identitas tetap disamarkan sebagian di layar. Data utuh hanya di sistem sumber.</p>}
          </div>
        </section>

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
      </div>
    </div>
  );
}
