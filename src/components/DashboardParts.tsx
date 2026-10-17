import Link from "next/link";
import { desimal, nf } from "@/lib/domain/format";
import type { BarisDaftar } from "@/lib/server/views";
import { FlagText, StagePill } from "./Status";

export function Kpis({ items }: { items: { label: string; nilai: string; catatan: string; sorot?: boolean }[] }) {
  return (
    <div className="mt-1.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
      {items.map((k) => (
        <div key={k.label} className={`flex flex-col gap-1.5 rounded-xl border bg-surface px-4 py-3.5 ${k.sorot ? "border-gold shadow-[inset_0_3px_0_var(--gold)]" : "border-line"}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.07em] text-muted">{k.label}</span>
          <b className="font-display text-[38px] font-bold leading-none tabular-nums">{k.nilai}</b>
          <small className="text-[12.5px] text-muted">{k.catatan}</small>
        </div>
      ))}
    </div>
  );
}

export function StackBar({ segs }: { segs: [string, number, string][] }) {
  const tot = segs.reduce((a, s) => a + s[1], 0);
  return (
    <>
      <div role="img" aria-label="Sebaran tahap penanganan" className="flex h-[18px] gap-0.5 overflow-hidden rounded-[9px] bg-sunk">
        {segs.map(([n, v, c]) => (<i key={n} className="block h-full" style={{ width: `${(v / tot) * 100}%`, background: c }} />))}
      </div>
      <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-3.5 gap-y-2 text-[13.5px]">
        {segs.map(([n, v, c]) => (
          <div key={n} className="flex items-center gap-2"><i className="size-2.5 flex-none rounded-[3px]" style={{ background: c }} />{n}<b className="ml-auto tabular-nums">{nf(v)}</b></div>
        ))}
      </div>
      <p className="hint mt-3">Total {nf(tot)} laporan di seluruh satker.</p>
    </>
  );
}

export function Bars({ rows, max, warna, satuan }: { rows: [string, number][]; max: number; warna?: (v: number) => string; satuan?: "jam" }) {
  return (
    <div className="grid gap-[9px]">
      {rows.map(([n, v]) => (
        <div key={n} className="grid grid-cols-[minmax(110px,40%)_1fr_40px] items-center gap-2.5 text-[13.5px]">
          <span>{n}</span>
          <div className="h-2.5 overflow-hidden rounded-[5px] bg-sunk"><div className="h-full rounded-[5px]" style={{ width: `${(v / max) * 100}%`, background: warna ? warna(v) : "var(--gold)" }} /></div>
          <b className="text-right tabular-nums">{satuan === "jam" ? desimal(v) : nf(v)}</b>
        </div>
      ))}
    </div>
  );
}

export function Spark({ data }: { data: [string, number][] }) {
  const W = 320, H = 150, x0 = 30, x1 = W - 14, y0 = 18, y1 = H - 30, vmax = 8;
  const X = (i: number) => x0 + (i * (x1 - x0)) / (data.length - 1);
  const Y = (v: number) => y1 - (v / vmax) * (y1 - y0);
  const pts = data.map((d, i) => `${X(i).toFixed(1)},${Y(d[1]).toFixed(1)}`).join(" ");
  const li = data.length - 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Respons pertama turun dari ${desimal(data[0][1])} jam ke ${desimal(data[li][1])} jam`}>
      {[0, 2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line x1={x0} x2={x1} y1={Y(v)} y2={Y(v)} className="stroke-line" />
          <text x={x0 - 6} y={Y(v) + 3.5} textAnchor="end" className="fill-muted text-[10px]">{v}</text>
        </g>
      ))}
      <polygon points={`${X(0)},${y1} ${pts} ${X(li)},${y1}`} className="fill-gold/15" />
      <polyline points={pts} className="fill-none stroke-gold" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <text key={d[0]} x={X(i)} y={H - 12} textAnchor={i === 0 ? "start" : i === li ? "end" : "middle"} className="fill-muted text-[10px]">{d[0]}</text>
      ))}
      <circle cx={X(li)} cy={Y(data[li][1])} r={5} className="fill-gold stroke-surface" strokeWidth={2} />
      <text x={X(li) - 8} y={Y(data[li][1]) - 10} textAnchor="end" className="fill-ink text-[11px] font-bold">{desimal(data[li][1])} jam</text>
      <text x={X(0) + 8} y={Y(data[0][1]) - 8} className="fill-muted text-[11px] font-semibold">{desimal(data[0][1])} jam</text>
    </svg>
  );
}

export function TabelLaporan({ rows }: { rows: BarisDaftar[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[940px] border-collapse text-sm">
        <thead>
          <tr>
            {["Tiket", "Satker", "Perkara", "Tahap", "Penyidik", "SP2HP terakhir", "Status layanan", ""].map((h) => (
              <th key={h} scope="col" className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-[0.07em] text-muted">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (<tr><td colSpan={8} className="px-3 py-3 text-muted">Tidak ada laporan pada filter ini.</td></tr>)}
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line align-top last:border-0">
              <td className="px-3 py-[11px]">
                <span className="font-mono">{r.id}</span>
                {r.baru && <span className="ml-1.5 inline-block rounded bg-gold px-[5px] py-px align-[2px] text-[10.5px] font-bold tracking-[0.06em] text-on-gold">BARU</span>}
                <span className="block text-[12.5px] tabular-nums text-muted">{r.tglLapor}</span>
              </td>
              <td className="px-3 py-[11px]">{r.satker}</td>
              <td className="px-3 py-[11px]">{r.jenis}<span className="block text-[12.5px] text-muted">{r.lokasi}</span></td>
              <td className="px-3 py-[11px]"><StagePill stage={r.stage} /></td>
              <td className="px-3 py-[11px]">{r.penyidik ? (<>{r.penyidik}<span className="block text-[12.5px] text-muted">{r.unit}</span></>) : (<span className="text-muted">Belum ditunjuk</span>)}</td>
              <td className="px-3 py-[11px] tabular-nums">{r.sp2hp}<span className="block text-[12.5px] text-muted">{r.sp2hpLalu}</span></td>
              <td className="px-3 py-[11px]"><FlagText flag={r.flag} /></td>
              <td className="px-3 py-[11px]"><Link className="btn btn-sec btn-sm" href={`/dashboard/${r.id}`}>Buka</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
