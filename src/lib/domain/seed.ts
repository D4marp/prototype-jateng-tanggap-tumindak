import { kodeTiket, nomorLp } from "./ids";
import { parseWib as D } from "./format";
import type { Report } from "./types";

type Raw = Omit<Report, "id" | "lp">;
const finish = (r: Raw): Report => ({ ...r, id: kodeTiket(r.no, r.m.lapor), lp: nomorLp(r.no, r.m.lapor) });

/** Data contoh fiktif. Nama, NIK, nomor HP, dan kejadian tidak merujuk orang atau perkara sebenarnya. */
const RAW: Raw[] = [
  {
    no: 412, satker: "Dittipidsiber", jenis: "Penipuan online", judul: "Penipuan investasi kripto lewat aplikasi palsu",
    lokasi: "Jakarta Selatan (korban tersebar di beberapa provinsi)", stage: 2,
    pelapor: { nama: "Rahmat Wibisono", nik: "3174000000000007", hp: "081200004471" },
    unit: "Subdit I", penyidik: "Kompol Dwi Hartanto", kerugian: 125000000, kejadian: D("2026-10-10T20:30"),
    uraian: "Pelapor menyetor dana ke aplikasi investasi kripto yang ternyata palsu. Dana tidak dapat ditarik dan layanan pelanggan menghilang.",
    kronologi: 'Pelapor mengikuti iklan investasi kripto di media sosial dan mengunduh aplikasi dari tautan yang dikirim "admin". Dalam dua minggu pelapor menyetor Rp125.000.000 ke tiga rekening berbeda. Saat hendak menarik dana, aplikasi meminta "biaya verifikasi" tambahan, lalu akun pelapor dikunci. Pelapor menyerahkan tangkapan layar percakapan, bukti transfer, dan berkas aplikasi.',
    rencana: "Permintaan data pemilik tiga rekening ke bank. Analisis berkas aplikasi. Pemeriksaan saksi (sesama korban di luar kota) lewat video call 19 Okt.",
    lidikNote: "Barang bukti digital diterima dan diamankan. Tiga rekening tujuan masuk daftar telusur.",
    m: { lapor: D("2026-10-12T10:05"), disp: D("2026-10-12T11:45"), lidik: D("2026-10-13T09:00"), sp1: D("2026-10-13T14:00") },
    extra: [{ t: D("2026-10-15T10:30"), title: "Permintaan pemblokiran rekening", pub: "Penyidik mengajukan pemblokiran sementara rekening tujuan transfer.", int: "Surat ke tiga bank penerima sudah dikirim. Dua rekening terindikasi dipakai pada laporan lain." }],
    vcall: { t: D("2026-10-19T10:00"), siapa: "Saksi (sesama korban, di luar kota)", dibuat: D("2026-10-16T15:10") },
  },
  {
    no: 398, satker: "Dittipidum", jenis: "Pencurian lintas wilayah", judul: "Pencurian muatan kontainer jaringan lintas provinsi",
    lokasi: "Pelabuhan Tanjung Priok, Jakarta Utara", stage: 4,
    pelapor: { nama: "Sri Lestari", nik: "3173000000000021", hp: "085700002290" },
    unit: "Subdit I", penyidik: "AKP Fajar Nugroho", kerugian: 480000000, kejadian: D("2026-10-02T15:40"),
    uraian: "Muatan elektronik dalam satu kontainer milik perusahaan pelapor hilang dalam perjalanan dari pelabuhan ke gudang tujuan.",
    kronologi: "Kontainer keluar dari pelabuhan dengan segel utuh. Tiba di gudang tujuan, segel sudah diganti dan isi tinggal sepertiga. Rekaman GPS truk menunjukkan berhenti dua kali di lokasi yang tidak ada dalam rencana perjalanan. Sopir sudah dimintai keterangan.",
    rencana: "Pemeriksaan tersangka yang diamankan 8 Okt. Pencocokan nomor seri barang dengan barang bukti. Pemberkasan.",
    lidikNote: "Riwayat GPS dan rekaman CCTV gerbang pelabuhan diamankan. Sopir diperiksa sebagai saksi.",
    gelarNote: "Tiga terduga pelaku teridentifikasi dari GPS dan keterangan saksi. Disepakati naik sidik.",
    m: { lapor: D("2026-10-03T08:20"), disp: D("2026-10-03T09:10"), lidik: D("2026-10-03T13:00"), sp1: D("2026-10-04T10:00"), gelar: D("2026-10-08T14:00"), sidik: D("2026-10-09T08:30"), sp2: D("2026-10-09T13:00") },
    extra: [{ t: D("2026-10-08T22:15"), title: "Terduga pelaku diamankan", pub: "Penyidik mengamankan terduga pelaku dan sebagian barang.", int: "Dua orang diamankan di wilayah Bekasi. Barang ditemukan di gudang sewaan." }],
  },
  {
    no: 421, satker: "Dittipideksus", jenis: "Penggelapan", judul: "Dugaan penggelapan dana koperasi",
    lokasi: "Kebayoran Baru, Jakarta Selatan", stage: 0,
    pelapor: { nama: "Bambang Setiawan", nik: "3174000000000114", hp: "081300009025" },
    unit: "Subdit II", penyidik: "", kerugian: 350000000, kejadian: D("2026-10-16T13:00"),
    uraian: "Pelapor selaku anggota pengawas koperasi menemukan selisih dana simpanan anggota yang tidak dapat dijelaskan pengurus.",
    kronologi: "Pada audit internal, saldo simpanan anggota di buku besar lebih rendah dari catatan setoran sebesar Rp350.000.000. Bendahara tidak dapat menunjukkan bukti pengeluaran. Pelapor membawa salinan buku besar dan rekening koran.",
    rencana: "Menunggu disposisi.",
    m: { lapor: D("2026-10-16T19:20") },
  },
  {
    no: 377, satker: "Dittipidkor", jenis: "Korupsi", judul: "Dugaan penggelembungan harga pengadaan peralatan",
    lokasi: "Jakarta Pusat", stage: 3,
    pelapor: { nama: "Agus Prasetyo", nik: "3171000000000233", hp: "082100006610" },
    unit: "Subdit I", penyidik: "Iptu Yoga Pratama", kerugian: 0, kejadian: D("2026-09-24T22:30"),
    uraian: "Pelapor menduga harga pengadaan peralatan pada suatu instansi jauh di atas harga pasar.",
    kronologi: "Pelapor, pegawai pada unit pengadaan, menyerahkan salinan dokumen kontrak dan tiga pembanding harga dari penyedia lain. Selisih harga tampak lebih dari 40 persen. Pelapor meminta identitasnya dirahasiakan.",
    rencana: "Menunggu hasil gelar perkara untuk penentuan naik sidik. SP2HP ke-2 perlu segera dikirim.",
    lidikNote: "Dokumen kontrak diminta ke instansi terkait. Tiga saksi diperiksa.",
    gelarNote: "Gelar pertama: perhitungan kerugian negara belum lengkap. Permintaan audit ke lembaga berwenang.",
    m: { lapor: D("2026-09-24T23:40"), disp: D("2026-09-25T07:30"), lidik: D("2026-09-25T10:00"), sp1: D("2026-09-26T09:00"), gelar: D("2026-10-01T13:00") },
  },
  {
    no: 352, satker: "Dittipideksus", jenis: "Penipuan investasi", judul: "Penipuan investasi berkedok arisan emas",
    lokasi: "Jakarta Barat dan beberapa kota lain", stage: 5,
    pelapor: { nama: "Hendra Kusuma", nik: "3175000000000045", hp: "087800003318" },
    unit: "Subdit I", penyidik: "Ipda Rizky Ramadhan", kerugian: 1850000000, kejadian: D("2026-09-10T09:00"),
    uraian: "Pelapor dan puluhan anggota lain menyetor dana ke skema arisan emas yang tidak pernah mencairkan giliran.",
    kronologi: "Pengelola menjanjikan keuntungan tetap setiap bulan dari pembelian emas. Pembayaran berhenti pada bulan ketiga. Kerugian gabungan korban yang melapor mencapai sekitar Rp1,85 miliar.",
    rencana: "Selesai. Tersangka dan barang bukti sudah diserahkan ke Kejaksaan.",
    lidikNote: "Data rekening pengelola diminta ke bank.", gelarNote: "Unsur penipuan dan penggelapan terpenuhi. Naik sidik.",
    m: { lapor: D("2026-09-15T10:00"), disp: D("2026-09-15T11:20"), lidik: D("2026-09-16T08:00"), sp1: D("2026-09-16T15:00"), gelar: D("2026-09-22T13:00"), sidik: D("2026-09-23T08:00"), sp2: D("2026-09-23T14:00"), selesai: D("2026-10-14T10:00") },
    extra: [{ t: D("2026-09-26T19:00"), title: "Tersangka diamankan", pub: "Tersangka diamankan.", int: "Tersangka diamankan di luar kota dengan bantuan Polda setempat. Aset berupa emas batangan disita." }],
  },
  {
    no: 417, satker: "Dittipidnarkoba", jenis: "Narkotika", judul: "Dugaan peredaran narkotika lewat jasa ekspedisi",
    lokasi: "Tangerang, Banten", stage: 2,
    pelapor: { nama: "Sukirno", nik: "3603000000000389", hp: "085200007713" },
    unit: "Subdit I", penyidik: "AKP Joko Santoso", kerugian: 0, kejadian: D("2026-10-14T03:00"),
    uraian: "Pelapor, karyawan agen ekspedisi, mencurigai paket yang dikirim berulang dari pengirim yang sama.",
    kronologi: "Selama tiga minggu agen menerima paket berbobot dan berbau sama dari satu pengirim dengan alamat tujuan berbeda-beda. Pelapor menyimpan data pengiriman dan melaporkan sebelum paket berikutnya dikirim.",
    rencana: "Pemantauan pengiriman berikutnya bersama pihak ekspedisi. Pemeriksaan saksi (rekan pelapor di luar kota) lewat video call 18 Okt.",
    lidikNote: "Data pengiriman diamankan. Koordinasi dengan pihak ekspedisi.",
    m: { lapor: D("2026-10-14T05:50"), disp: D("2026-10-14T06:30"), lidik: D("2026-10-14T08:00"), sp1: D("2026-10-15T09:00") },
    vcall: { t: D("2026-10-18T13:00"), siapa: "Saksi (rekan pelapor, di luar kota)", dibuat: D("2026-10-15T16:00") },
  },
  {
    no: 405, satker: "Dittipid PPA-PPO", jenis: "Perdagangan orang", judul: "Dugaan perdagangan orang berkedok lowongan kerja luar negeri",
    lokasi: "Bekasi, Jawa Barat", stage: 2,
    pelapor: { nama: "Dewi Anggraini", nik: "3275000000000156", hp: "089600001104" },
    unit: "Subdit II", penyidik: "Kompol Andi Saputra", kerugian: 9600000, kejadian: D("2026-10-01T12:00"),
    uraian: "Pelapor kehilangan kontak dengan anggota keluarga yang berangkat lewat penyalur tenaga kerja.",
    kronologi: "Anggota keluarga pelapor membayar biaya penempatan Rp9.600.000 kepada penyalur. Setelah berangkat, nomor ponselnya tidak aktif dan penyalur menolak memberi alamat penempatan. Pelapor menyerahkan kuitansi dan tangkapan layar percakapan.",
    rencana: "Penelusuran penyalur dan jalur keberangkatan. Koordinasi perlindungan saksi.",
    m: { lapor: D("2026-10-08T13:15"), disp: D("2026-10-09T08:00"), lidik: D("2026-10-09T10:00"), sp1: D("2026-10-10T11:00") },
  },
  {
    no: 360, satker: "Dittipidter", jenis: "Pertambangan ilegal", judul: "Pertambangan tanpa izin di kawasan hutan",
    lokasi: "Kalimantan Timur", stage: 4,
    pelapor: { nama: "Nur Hidayat", nik: "6472000000000275", hp: "081900005542" },
    unit: "Subdit I", penyidik: "Iptu Galih Wicaksono", kerugian: 6500000000, kejadian: D("2026-09-17T23:00"),
    uraian: "Pelapor, anggota kelompok masyarakat adat, melaporkan aktivitas penambangan tanpa izin di wilayah hutan yang dijaga warga.",
    kronologi: "Warga menemukan alat berat dan jalur angkut baru di kawasan hutan sejak pertengahan September. Pelapor menyerahkan foto udara dan koordinat lokasi. Dugaan kerugian negara dan lingkungan ditaksir awal Rp6,5 miliar.",
    rencana: "Pemeriksaan tersangka dan pemberkasan. SP2HP ke-3 perlu dijadwalkan.",
    lidikNote: "Citra satelit dan foto udara diamankan.", gelarNote: "Pelaku teridentifikasi. Naik sidik.",
    m: { lapor: D("2026-09-18T07:30"), disp: D("2026-09-18T09:00"), lidik: D("2026-09-19T08:00"), sp1: D("2026-09-20T10:00"), gelar: D("2026-09-29T13:00"), sidik: D("2026-09-30T08:00"), sp2: D("2026-09-30T14:00") },
  },
];

export const SEED: Report[] = RAW.map(finish);

/** Rekap agregat sintetis seluruh direktorat (bukan hasil hitung dari daftar contoh). Jumlah tiap kelompok = 3.846. */
export const AGREGAT = { masuk: 3846, s01: 58, lidik: 1402, gelar: 231, sidik: 1188, selesai: 967 } as const;
export const PER_JENIS: [string, number][] = [
  ["Penipuan online", 1180], ["Penipuan investasi", 524], ["Narkotika", 468], ["Peretasan dan kebocoran data", 412],
  ["Penggelapan", 396], ["Korupsi", 301], ["Pencurian lintas wilayah", 164], ["Lainnya", 162],
  ["Perdagangan orang", 143], ["Pertambangan ilegal", 96],
];
export const RESPON_MINGGUAN: [string, number][] = [["15 Sep", 6.2], ["22 Sep", 4.8], ["29 Sep", 3.9], ["6 Okt", 2.7], ["13 Okt", 2.1]];
export const RESPON_SATKER: [string, number][] = [
  ["Dittipid PPA-PPO", 1.5], ["Dittipidsiber", 1.8], ["Dittipidum", 2.2], ["Dittipideksus", 2.9],
  ["Dittipidnarkoba", 3.4], ["Dittipidkor", 4.1], ["Dittipidter", 6.2],
];
