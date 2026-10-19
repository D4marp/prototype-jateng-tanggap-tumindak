import Link from "next/link";
import { desimal, nf } from "@/lib/domain/format";
import type { BarisDaftar } from "@/lib/server/views";
import { FlagText, StagePill } from "./Status";

export function Kpis({ items }: { items: { label: string; nilai: string; catatan: string; sorot?: boolean }[] }) {
  return (
    <dl className="m-0 grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-surface min-[640px]:grid-cols-3 min-[1000px]:grid-cols-6">
      {items.map((k) => (
        <div key={k.label} className={`border-b border-r border-line px-4 py-3.5 ${k.sorot ? "border-t-[3px] border-t-brand pt-[11px]" : ""}`}>
          <dt className="text-[13px] text-muted">{k.label}</dt>
          <dd className="m-0 mt-1 text-[30px] font-bold leading-none tabular-nums tracking-tight">{k.nilai}</dd>
          <dd className="m-0 mt-1.5 text-xs text-muted">{k.catatan}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StackBar({ segs }: { segs: [string, number, string][] }) {
  const tot = segs.reduce((a, s) => a + s[1], 0);
  return (
    <>
      <div role="img" aria-label="Sebaran tahap penanganan" className="flex h-3 gap-0.5 overflow-hidden rounded-sm bg-sunk">
        {segs.map(([n, v, c]) => (<i key={n} className="block h-full" style={{ width: `${(v / tot) * 100}%`, background: c }} />))}
      </div>
      <ul className="m-0 mt-4 grid list-none grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-4 gap-y-2 p-0 text-sm">
        {segs.map(([n, v, c]) => (
          <li key={n} className="flex items-center gap-2"><i className="size-2.5 flex-none rounded-[2px]" style={{ background: c }} />{n}<b className="ml-auto tabular-nums">{nf(v)}</b></li>
        ))}
      </ul>
      <p className="hint mt-3">Total {nf(tot)} laporan di seluruh direktorat.</p>
    </>
  );
}

export function Bars({ rows, max, warna, satuan }: { rows: [string, number][]; max: number; warna?: (v: number) => string; satuan?: "jam" }) {
  return (
    <div className="grid gap-2.5">
      {rows.map(([n, v]) => (
        <div key={n} className="grid grid-cols-[minmax(110px,38%)_1fr_44px] items-center gap-3 text-sm">
          <span>{n}</span>
          <div className="h-2 overflow-hidden rounded-sm bg-sunk"><div className="h-full rounded-sm" style={{ width: `${(v / max) * 100}%`, background: warna ? warna(v) : "var(--ink)" }} /></div>
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
      <polyline points={pts} className="fill-none stroke-ink" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={d[0]}>
          <circle cx={X(i)} cy={Y(d[1])} r={i === li ? 5 : 3} className={i === li ? "fill-brand stroke-surface" : "fill-ink"} strokeWidth={2} />
          <text x={X(i)} y={H - 12} textAnchor={i === 0 ? "start" : i === li ? "end" : "middle"} className="fill-muted text-[10px]">{d[0]}</text>
        </g>
      ))}
      <text x={X(li) - 8} y={Y(data[li][1]) - 10} textAnchor="end" className="fill-brand text-[11px] font-bold">{desimal(data[li][1])} jam</text>
      <text x={X(0) + 8} y={Y(data[0][1]) - 8} className="fill-muted text-[11px] font-semibold">{desimal(data[0][1])} jam</text>
    </svg>
  );
}

export function TabelLaporan({ rows }: { rows: BarisDaftar[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[940px] border-collapse text-sm">
        <thead className="bg-panel">
          <tr>{["Tiket", "Direktorat", "Perkara", "Tahap", "Penyidik", "SP2HP terakhir", "Status layanan", ""].map((h) => (<th key={h} scope="col" className="th">{h}</th>))}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && (<tr><td colSpan={8} className="px-3 py-4 text-muted">Tidak ada laporan pada filter ini.</td></tr>)}
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line align-top last:border-0 hover:bg-panel">
              <td className="min-w-[150px] whitespace-nowrap px-3 py-3">
                <span className="font-mono text-[13.5px]">{r.id}</span>
                {r.baru && <span className="ml-1.5 rounded-sm bg-brand px-1.5 py-px align-[1px] text-[10.5px] font-bold text-white">BARU</span>}
                <span className="block text-[12.5px] tabular-nums text-muted">{r.tglLapor}</span>
              </td>
              <td className="min-w-[130px] px-3 py-3">{r.satker}</td>
              <td className="px-3 py-3">{r.jenis}<span className="block text-[12.5px] text-muted">{r.lokasi}</span></td>
              <td className="px-3 py-3"><StagePill stage={r.stage} /></td>
              <td className="px-3 py-3">{r.penyidik ? (<>{r.penyidik}<span className="block text-[12.5px] text-muted">{r.unit}</span></>) : (<span className="text-muted">Belum ditunjuk</span>)}</td>
              <td className="whitespace-nowrap px-3 py-3 tabular-nums">{r.sp2hp}<span className="block text-[12.5px] text-muted">{r.sp2hpLalu}</span></td>
              <td className="px-3 py-3"><FlagText flag={r.flag} /></td>
              <td className="px-3 py-3"><Link className="btn btn-sec btn-sm" href={`/dashboard/${r.id}`}>Buka</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
