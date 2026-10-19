import Link from "next/link";
import { IconArrow } from "@/components/icons";
import { TiketForm } from "@/components/TiketForm";
import { SLA } from "@/lib/domain/config";

const ALUR = [
  ["Lapor di SPKT", "Petugas SPKT Bareskrim mencatat laporan langsung ke sistem."],
  ["Terima STPL", "Tanda terima bertanda tangan elektronik, memuat QR ke halaman progres."],
  ["Disposisi", `Pimpinan Bareskrim mendisposisikan ke direktorat dan penyidik, paling lama ${SLA.disposisiJam} jam.`],
  ["Pantau dan diperiksa", "SP2HP terbit berkala. Pemeriksaan saksi dapat lewat video call."],
  ["Perkara tuntas", "Pelapor diberi tahu saat berkas P21 dan diserahkan ke kejaksaan."],
];

const AKSES: [string, string, string][] = [
  ["Tahap, posisi laporan, riwayat tindak lanjut", "Terbuka", "Terbuka"],
  ["Dokumen STPL dan SP2HP bertanda tangan elektronik", "Terbuka", "Terbuka"],
  ["Nama pelapor, NIK, nomor HP", "Disamarkan", "Disamarkan di layar"],
  ["Nama penyidik", "Pangkat saja", "Lengkap"],
  ["Kronologi lengkap dan rencana tindak lanjut", "Tertutup", "Terbuka"],
  ["Catatan internal pada tiap tindak lanjut", "Tertutup", "Terbuka"],
  ["Status kepatuhan layanan", "Tertutup", "Terbuka"],
];

const DEMO = [
  ["Pelapor memantau laporan", "Buka tiket BRK-2610-0412. Halaman memberi tahu 4 digit HP yang dipakai untuk demo.", "/progres/BRK-2610-0412"],
  ["Petugas SPKT menerbitkan STPL", "Pilih peran Petugas SPKT, isi data contoh, simpan.", "/lapor"],
  ["Pimpinan membaca dashboard", "Pilih peran Pimpinan. Lihat laporan yang melewati batas waktu.", "/dashboard"],
  ["Keaslian dokumen diperiksa", "Buka SP2HP, klik tautan verifikasi pada kotak TTE.", "/progres/BRK-2609-0352"],
] as const;

export default function Beranda() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="wrap grid gap-10 py-12 min-[900px]:grid-cols-[1.15fr_1fr] min-[900px]:py-16">
          <div>
            <p className="m-0 text-sm font-semibold text-brand">Layanan pemantauan laporan · Bareskrim Polri</p>
            <h1 className="mb-0 mt-3 text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.08] tracking-tight">
              Pantau laporan polisi Anda dari meja SPKT sampai perkara selesai.
            </h1>
            <p className="mb-0 mt-5 max-w-[52ch] text-base text-muted">
              Setiap laporan di SPKT Bareskrim Polri mendapat STPL berbarcode. Dari kode itu pelapor dapat melihat tindak lanjut penyidik, jadwal pemeriksaan, dan SP2HP tanpa datang ke kantor.
            </p>
            <dl className="m-0 mt-8 grid max-w-[560px] grid-cols-3 gap-4 border-t border-line pt-5">
              {[[`≤ ${SLA.disposisiJam} jam`, "sampai disposisi"], [`${SLA.sp2hpHari} hari`, "antar-SP2HP"], ["Tanpa datang", "cek dan pemeriksaan"]].map(([b, s]) => (
                <div key={b}><dt className="text-xl font-bold tracking-tight">{b}</dt><dd className="m-0 text-[13px] text-muted">{s}</dd></div>
              ))}
            </dl>
            <p className="hint mt-3">Angka target masih contoh dan menunggu penetapan pimpinan.</p>
          </div>

          <div className="self-start rounded-lg border border-line bg-panel p-5">
            <h2 className="h2 mb-1">Cek status laporan</h2>
            <p className="mb-4 mt-0 text-sm text-muted">Ketik kode tiket di STPL atau pindai QR-nya. Anda akan diminta 4 digit terakhir nomor HP pelapor.</p>
            <TiketForm id="tiket-beranda" />
            <div className="mt-5 border-t border-line pt-4">
              <div className="mb-2 text-[13px] text-muted">Tiket contoh</div>
              <ul className="m-0 grid list-none gap-1.5 p-0">
                {["BRK-2610-0412", "BRK-2610-0398", "BRK-2609-0352"].map((k) => (
                  <li key={k}><Link href={`/progres/${k}`} className="inline-flex items-center gap-1.5 font-mono text-[13.5px] text-ink underline decoration-line underline-offset-4 hover:decoration-brand">{k}<IconArrow className="size-3.5 text-brand" /></Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pt-12">
        <h2 className="h2 mb-5">Alur layanan</h2>
        <ol className="m-0 grid list-none gap-x-6 gap-y-5 p-0 min-[900px]:grid-cols-5">
          {ALUR.map(([j, d], i) => (
            <li key={j} className="border-t-2 border-ink pt-3">
              <span className="font-mono text-[13px] text-brand">{String(i + 1).padStart(2, "0")}</span>
              <b className="mt-1 block">{j}</b>
              <span className="text-[13.5px] text-muted">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap pt-12">
        <h2 className="h2">Siapa melihat apa</h2>
        <p className="mb-4 mt-1.5 max-w-[66ch] text-sm text-muted">Pembatasan dilakukan di server. Peramban pelapor tidak pernah menerima kronologi lengkap, catatan internal, atau identitas utuh.</p>
        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <thead className="bg-panel"><tr><th scope="col" className="th">Informasi</th><th scope="col" className="th">Pelapor terverifikasi</th><th scope="col" className="th">Penyidik dan pimpinan</th></tr></thead>
            <tbody>
              {AKSES.map(([a, b, c]) => (
                <tr key={a} className="border-b border-line last:border-0">
                  <th scope="row" className="px-3 py-2.5 text-left font-medium">{a}</th>
                  <td className={`px-3 py-2.5 ${b === "Tertutup" ? "text-muted" : ""}`}>{b}</td>
                  <td className="px-3 py-2.5">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap pt-12">
        <div className="rounded-lg border border-dashed border-muted/50 p-5">
          <h2 className="h2">Panduan demo</h2>
          <p className="mb-4 mt-1 text-sm text-muted">Gunakan pengalih peran di bagian atas halaman untuk berganti sudut pandang.</p>
          <ol className="m-0 grid list-none gap-x-8 gap-y-1 p-0 min-[760px]:grid-cols-2">
            {DEMO.map(([j, d, href], i) => (
              <li key={j}>
                <Link href={href} className="group flex gap-3 rounded-md p-2.5 text-inherit no-underline hover:bg-sunk">
                  <span className="font-mono text-[13px] text-brand">{i + 1}</span>
                  <span><b className="block group-hover:underline">{j}</b><span className="text-[13.5px] text-muted">{d}</span></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
