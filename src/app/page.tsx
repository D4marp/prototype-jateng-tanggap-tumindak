import Link from "next/link";
import { SLA } from "@/lib/domain/config";
import { TiketForm } from "@/components/TiketForm";

const ALUR = [
  ["Lapor di SPKT", "Petugas front office Polda atau Polres mencatat laporan langsung ke sistem."],
  ["Terima STPL berbarcode", "Tanda terima laporan bertanda tangan elektronik, memuat QR ke halaman progres."],
  [`Disposisi ≤ ${SLA.disposisiJam} jam`, "Kasat Reskrim atau Direktur menunjuk unit dan penyidik."],
  ["Pantau dan diperiksa", "SP2HP terbit berkala. Pemeriksaan saksi dapat lewat video call."],
  ["Perkara tuntas", "Pelapor diberi tahu saat berkas P21 dan diserahkan ke kejaksaan."],
];

const AKSES: [string, string, string][] = [
  ["Tahap, posisi laporan, riwayat tindak lanjut", "Terbuka", "Terbuka"],
  ["Dokumen STPL dan SP2HP bertanda tangan elektronik", "Terbuka", "Terbuka"],
  ["Nama pelapor, NIK, nomor HP", "Disamarkan", "Disamarkan di layar"],
  ["Nama penyidik", "Pangkat saja, nama disamarkan", "Lengkap"],
  ["Kronologi lengkap dan rencana tindak lanjut", "Tertutup", "Terbuka"],
  ["Catatan internal pada setiap tindak lanjut", "Tertutup", "Terbuka"],
  ["Status kepatuhan layanan (SLA)", "Tertutup", "Terbuka"],
];

const SKENARIO = [
  ["Pelapor memantau laporan", "Buka tiket RSK-2610-0412 dengan 4 digit terakhir HP yang tertera pada halaman.", "/progres/RSK-2610-0412"],
  ["Petugas SPKT menerbitkan STPL", "Pilih peran Petugas SPKT, isi data contoh, lalu simpan.", "/lapor"],
  ["Pimpinan membaca dashboard", "Pilih peran Pimpinan. Lihat laporan yang melewati batas waktu.", "/dashboard"],
  ["Keaslian dokumen diperiksa", "Buka SP2HP, pindai atau klik tautan verifikasi pada kotak TTE.", "/progres/RSK-2609-0352"],
] as const;

export default function Beranda() {
  return (
    <>
      <section className="bg-band text-band-ink">
        <div className="wrap pb-9 pt-[30px]">
          <p className="m-0 font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">Polisi Bersama Masyarakat · Layanan reserse Polda Jateng</p>
          <h1 className="mb-3.5 mt-2.5 max-w-[16ch] font-display text-[clamp(38px,8.5vw,68px)] font-bold uppercase leading-[0.94]">
            Laporan Anda, <em className="not-italic text-gold">terpantau</em> setiap tahap
          </h1>
          <p className="m-0 max-w-[56ch] text-base text-band-muted">
            Setiap laporan polisi di Polda Jawa Tengah dan Polres jajaran mendapat barcode. Pindai atau ketik kodenya untuk melihat tindak lanjut penyidik, jadwal pemeriksaan, dan SP2HP yang sudah ditandatangani elektronik.
          </p>
          <TiketForm variant="band" />
          <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-band-muted">
            Coba contoh:
            {["RSK-2610-0412", "RSK-2610-0398", "RSK-2609-0352"].map((k) => (
              <Link key={k} href={`/progres/${k}`} className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[12.5px] text-band-ink no-underline hover:border-gold">{k}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pt-7">
        <h2 className="sec-title">Alur layanan</h2>
        <ol className="m-0 grid list-none gap-2.5 p-0 min-[900px]:grid-cols-5">
          {ALUR.map(([j, d], i) => (
            <li key={j} className="grid grid-cols-[38px_1fr] items-start gap-3 rounded-xl border border-line bg-surface p-3.5 min-[900px]:grid-cols-1">
              <span aria-hidden className="grid size-[38px] place-items-center rounded-full bg-band font-display text-[22px] font-bold leading-none text-gold">{i + 1}</span>
              <div><b className="block">{j}</b><span className="text-[13.5px] text-muted">{d}</span></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap pt-7">
        <h2 className="sec-title">Siapa melihat apa</h2>
        <p className="mb-3 mt-0 max-w-[64ch] text-sm text-muted">
          Pembatasan dilakukan di server. Peramban pelapor tidak pernah menerima kronologi lengkap, catatan internal, atau identitas utuh.
        </p>
        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border-b border-line px-3.5 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-[0.07em] text-muted">Informasi</th>
                <th scope="col" className="border-b border-line px-3.5 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-[0.07em] text-muted">Pelapor (terverifikasi)</th>
                <th scope="col" className="border-b border-line px-3.5 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-[0.07em] text-muted">Penyidik dan pimpinan</th>
              </tr>
            </thead>
            <tbody>
              {AKSES.map(([a, b, c]) => (
                <tr key={a} className="border-b border-line last:border-0">
                  <th scope="row" className="px-3.5 py-2.5 text-left font-medium">{a}</th>
                  <td className="px-3.5 py-2.5 text-muted">{b}</td>
                  <td className="px-3.5 py-2.5 text-muted">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap pt-7">
        <h2 className="sec-title">Target layanan</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5">
          {[[`≤ ${SLA.disposisiJam} jam`, "Laporan didisposisi dan penyidik ditunjuk."], [`Tiap ${SLA.sp2hpHari} hari`, "SP2HP berkala dikirim ke pelapor."], ["Tanpa datang", "Cek progres dan pemeriksaan saksi bisa dari jauh."]].map(([b, s]) => (
            <div key={b} className="rounded-b-[10px] border border-t-[3px] border-line border-t-gold bg-surface px-3.5 py-3">
              <b className="block font-display text-[22px] uppercase leading-[1.1] tracking-[0.02em]">{b}</b>
              <span className="text-[13px] text-muted">{s}</span>
            </div>
          ))}
        </div>
        <p className="hint mt-2.5">Angka target masih contoh dan menunggu penetapan pimpinan. Nilainya diatur di satu berkas konfigurasi.</p>
      </section>

      <section className="wrap pt-7">
        <h2 className="sec-title">Skenario pemaparan</h2>
        <ol className="m-0 grid list-none gap-2.5 p-0 min-[760px]:grid-cols-2">
          {SKENARIO.map(([j, d, href], i) => (
            <li key={j}>
              <Link href={href} className="flex h-full gap-3 rounded-xl border border-line bg-surface p-3.5 text-inherit no-underline hover:border-gold">
                <span aria-hidden className="font-display text-[26px] font-bold leading-none text-gold-ink">{i + 1}</span>
                <span><b className="block">{j}</b><span className="text-[13.5px] text-muted">{d}</span></span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
