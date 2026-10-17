import { kodeTiket, nomorLp } from "./ids";
import { parseWib as D } from "./format";
import type { Report } from "./types";

type Raw = Omit<Report, "id" | "lp">;
const finish = (r: Raw): Report => ({ ...r, id: kodeTiket(r.no, r.m.lapor), lp: nomorLp(r.no, r.satker, r.m.lapor) });

/** Data contoh fiktif. Nama, NIK, nomor HP, dan kejadian tidak merujuk orang atau perkara sebenarnya. */
const RAW: Raw[] = [
  {
    no: 412, satker: "Polres Grobogan", jenis: "Penipuan online", judul: "Penipuan jual beli ponsel lewat marketplace",
    lokasi: "Kec. Purwodadi, Kab. Grobogan", stage: 2,
    pelapor: { nama: "Rahmat Wibisono", nik: "3315000000000007", hp: "081200004471" },
    unit: "Unit Ekonomi", penyidik: "Bripka Dwi Hartanto", kerugian: 4750000, kejadian: D("2026-10-10T20:30"),
    uraian: "Pelapor mentransfer uang untuk membeli ponsel dari akun penjual di marketplace. Barang tidak dikirim dan akun penjual tidak bisa dihubungi.",
    kronologi: 'Pada 10 Okt 2026 pelapor menemukan iklan ponsel bekas dengan harga di bawah pasaran. Setelah bertukar pesan, pelapor mentransfer Rp4.750.000 ke rekening atas nama orang lain yang disebut "admin gudang". Setelah bukti transfer dikirim, nomor penjual memblokir pelapor. Pelapor menyerahkan tangkapan layar percakapan, bukti transfer, dan tautan iklan.',
    rencana: "Permintaan data pemilik rekening ke bank. Penelusuran nomor telepon penjual. Pemeriksaan saksi (kakak pelapor) lewat video call 19 Okt.",
    lidikNote: "Barang bukti digital diterima dan diamankan. Nomor rekening tujuan masuk daftar telusur.",
    m: { lapor: D("2026-10-12T10:05"), disp: D("2026-10-12T11:45"), lidik: D("2026-10-13T09:00"), sp1: D("2026-10-13T14:00") },
    extra: [{ t: D("2026-10-15T10:30"), title: "Permintaan data ke bank", pub: "Penyidik mengirim permintaan data rekening tujuan transfer.", int: "Surat ke bank penerima sudah dikirim. Perkiraan balasan 7 hari kerja." }],
    vcall: { t: D("2026-10-19T10:00"), siapa: "Saksi (kakak pelapor)", dibuat: D("2026-10-16T15:10") },
  },
  {
    no: 398, satker: "Polrestabes Semarang", jenis: "Pencurian kendaraan bermotor", judul: "Curanmor sepeda motor di parkiran pasar",
    lokasi: "Kec. Semarang Tengah, Kota Semarang", stage: 4,
    pelapor: { nama: "Sri Lestari", nik: "3374000000000021", hp: "085700002290" },
    unit: "Unit Resmob", penyidik: "Brigpol Fajar Nugroho", kerugian: 17500000, kejadian: D("2026-10-02T15:40"),
    uraian: "Sepeda motor pelapor hilang dari parkiran pasar saat ditinggal berbelanja sekitar 30 menit.",
    kronologi: "Pelapor memarkir sepeda motor di sisi timur pasar dalam keadaan terkunci stang. Saat kembali, kendaraan sudah tidak ada. Juru parkir melihat dua orang berboncengan mendorong motor ke arah jalan raya. Rekaman CCTV toko di depan pasar sudah diamankan.",
    rencana: "Pemeriksaan tersangka yang diamankan 8 Okt. Pencocokan nomor rangka dengan kendaraan barang bukti. Pemberkasan.",
    lidikNote: "Rekaman CCTV toko diamankan. Juru parkir diperiksa sebagai saksi.",
    gelarNote: "Dua terduga pelaku teridentifikasi dari CCTV dan keterangan saksi. Disepakati naik sidik.",
    m: { lapor: D("2026-10-03T08:20"), disp: D("2026-10-03T09:10"), lidik: D("2026-10-03T13:00"), sp1: D("2026-10-04T10:00"), gelar: D("2026-10-08T14:00"), sidik: D("2026-10-09T08:30"), sp2: D("2026-10-09T13:00") },
    extra: [{ t: D("2026-10-08T22:15"), title: "Terduga pelaku diamankan", pub: "Penyidik mengamankan terduga pelaku dan sepeda motor milik pelapor.", int: "Dua orang diamankan di wilayah Kec. Genuk. Motor ditemukan dengan pelat diganti." }],
  },
  {
    no: 421, satker: "Polres Blora", jenis: "Pencurian", judul: "Pencurian perhiasan di rumah kosong",
    lokasi: "Kec. Cepu, Kab. Blora", stage: 0,
    pelapor: { nama: "Bambang Setiawan", nik: "3316000000000114", hp: "081300009025" },
    unit: "Unit Resmob", penyidik: "", kerugian: 12000000, kejadian: D("2026-10-16T13:00"),
    uraian: "Rumah pelapor dibobol saat ditinggal ke luar kota. Perhiasan dan uang tunai di lemari kamar hilang.",
    kronologi: "Pelapor sekeluarga pergi ke Semarang sejak pagi. Pukul 18.30 tetangga melihat pintu belakang terbuka. Kunci pintu rusak dan lemari kamar dalam keadaan berantakan.",
    rencana: "Menunggu disposisi.",
    m: { lapor: D("2026-10-16T19:20") },
  },
  {
    no: 377, satker: "Polres Kudus", jenis: "Penganiayaan", judul: "Penganiayaan saat keributan di acara hajatan",
    lokasi: "Kec. Jati, Kab. Kudus", stage: 3,
    pelapor: { nama: "Agus Prasetyo", nik: "3319000000000233", hp: "082100006610" },
    unit: "Unit Pidum", penyidik: "Briptu Yoga Pratama", kerugian: 0, kejadian: D("2026-09-24T22:30"),
    uraian: "Pelapor dipukul oleh orang tidak dikenal saat terjadi keributan di acara hajatan warga.",
    kronologi: "Keributan bermula dari saling ejek di depan panggung hiburan. Pelapor yang berusaha melerai dipukul di bagian wajah dan mendapat luka robek di pelipis. Hasil visum sudah diterima penyidik.",
    rencana: "Menunggu hasil gelar perkara untuk penentuan naik sidik. SP2HP ke-2 perlu segera dikirim.",
    lidikNote: "Visum et repertum diminta ke rumah sakit. Tiga saksi diperiksa.",
    gelarNote: "Gelar pertama: identitas pelaku belum lengkap. Penambahan saksi.",
    m: { lapor: D("2026-09-24T23:40"), disp: D("2026-09-25T07:30"), lidik: D("2026-09-25T10:00"), sp1: D("2026-09-26T09:00"), gelar: D("2026-10-01T13:00") },
  },
  {
    no: 352, satker: "Ditreskrimum Polda Jateng", jenis: "Penggelapan", judul: "Penggelapan mobil rental lintas kabupaten",
    lokasi: "Kab. Semarang dan Kab. Blora", stage: 5,
    pelapor: { nama: "Hendra Kusuma", nik: "3322000000000045", hp: "087800003318" },
    unit: "Subdit II Harda Bangtah", penyidik: "Ipda Rizky Ramadhan", kerugian: 185000000, kejadian: D("2026-09-10T09:00"),
    uraian: "Mobil yang disewa dari usaha rental pelapor tidak dikembalikan dan diduga digadaikan penyewa di kabupaten lain.",
    kronologi: "Penyewa menyewa mobil untuk 3 hari dengan jaminan KTP. Setelah masa sewa habis, penyewa tidak bisa dihubungi. GPS mobil terakhir menunjukkan lokasi di Kabupaten Blora. Pelapor melapor langsung ke SPKT Polda Jateng karena lokasi kejadian lintas wilayah.",
    rencana: "Selesai. Tersangka dan barang bukti sudah diserahkan ke Kejaksaan.",
    lidikNote: "Riwayat GPS mobil diminta dari pelapor.", gelarNote: "Unsur penggelapan terpenuhi. Naik sidik.",
    m: { lapor: D("2026-09-15T10:00"), disp: D("2026-09-15T11:20"), lidik: D("2026-09-16T08:00"), sp1: D("2026-09-16T15:00"), gelar: D("2026-09-22T13:00"), sidik: D("2026-09-23T08:00"), sp2: D("2026-09-23T14:00"), selesai: D("2026-10-14T10:00") },
    extra: [{ t: D("2026-09-26T19:00"), title: "Tersangka diamankan", pub: "Tersangka diamankan dan mobil berhasil ditemukan.", int: "Mobil ditemukan di Blora dalam keadaan digadaikan. Dibantu Satreskrim Polres Blora." }],
  },
  {
    no: 417, satker: "Polres Grobogan", jenis: "Pencurian ternak", judul: "Pencurian dua ekor sapi dari kandang",
    lokasi: "Kec. Pulokulon, Kab. Grobogan", stage: 2,
    pelapor: { nama: "Sukirno", nik: "3315000000000389", hp: "085200007713" },
    unit: "Unit Resmob", penyidik: "Aiptu Joko Santoso", kerugian: 38000000, kejadian: D("2026-10-14T03:00"),
    uraian: "Dua ekor sapi milik pelapor hilang dari kandang di belakang rumah pada dini hari.",
    kronologi: "Pelapor terakhir memberi pakan pukul 22.00. Pukul 04.30 kandang ditemukan kosong dan pagar bambu dibongkar. Ada bekas ban kendaraan bak terbuka di jalan kebun.",
    rencana: "Pengecekan pasar hewan di wilayah sekitar. Pemeriksaan saksi warga yang tinggal di luar kota lewat video call 18 Okt.",
    lidikNote: "Cek TKP bersama Polsek Pulokulon. Jejak ban difoto.",
    m: { lapor: D("2026-10-14T05:50"), disp: D("2026-10-14T06:30"), lidik: D("2026-10-14T08:00"), sp1: D("2026-10-15T09:00") },
    vcall: { t: D("2026-10-18T13:00"), siapa: "Saksi (warga di luar kota)", dibuat: D("2026-10-15T16:00") },
  },
  {
    no: 405, satker: "Polres Demak", jenis: "Penipuan online", judul: "Penipuan arisan online",
    lokasi: "Kec. Mranggen, Kab. Demak", stage: 2,
    pelapor: { nama: "Dewi Anggraini", nik: "3321000000000156", hp: "089600001104" },
    unit: "Unit Ekonomi", penyidik: "Brigpol Andi Saputra", kerugian: 9600000, kejadian: D("2026-10-01T12:00"),
    uraian: "Pelapor dan beberapa anggota arisan online tidak menerima giliran pencairan. Pengelola arisan menghilang.",
    kronologi: "Arisan dikelola lewat grup WhatsApp dengan 24 anggota. Sejak Oktober pengelola tidak lagi membalas pesan dan keluar dari grup. Pelapor mengumpulkan bukti setoran dari 6 anggota lain.",
    rencana: "Pendataan seluruh korban. Penelusuran rekening pengelola.",
    m: { lapor: D("2026-10-08T13:15"), disp: D("2026-10-09T08:00"), lidik: D("2026-10-09T10:00"), sp1: D("2026-10-10T11:00") },
  },
  {
    no: 360, satker: "Polresta Surakarta", jenis: "Perusakan", judul: "Perusakan pagar dan kendaraan",
    lokasi: "Kec. Laweyan, Kota Surakarta", stage: 4,
    pelapor: { nama: "Nur Hidayat", nik: "3372000000000275", hp: "081900005542" },
    unit: "Unit Pidum", penyidik: "Bripda Galih Wicaksono", kerugian: 6500000, kejadian: D("2026-09-17T23:00"),
    uraian: "Pagar rumah dan kaca mobil pelapor dirusak oleh sekelompok orang pada malam hari.",
    kronologi: "Sekitar pukul 23.00 pelapor mendengar suara benturan. Kaca depan mobil pecah dan pagar besi bengkok. Warga melihat empat orang melarikan diri dengan sepeda motor.",
    rencana: "Pemeriksaan tersangka dan pemberkasan. SP2HP ke-3 perlu dijadwalkan.",
    lidikNote: "Rekaman CCTV warga diamankan.", gelarNote: "Pelaku teridentifikasi. Naik sidik.",
    m: { lapor: D("2026-09-18T07:30"), disp: D("2026-09-18T09:00"), lidik: D("2026-09-19T08:00"), sp1: D("2026-09-20T10:00"), gelar: D("2026-09-29T13:00"), sidik: D("2026-09-30T08:00"), sp2: D("2026-09-30T14:00") },
  },
];

export const SEED: Report[] = RAW.map(finish);

/** Rekap agregat sintetis seluruh satker (bukan hasil hitung dari daftar contoh). */
export const AGREGAT = { masuk: 1284, s01: 41, lidik: 512, gelar: 96, sidik: 388, selesai: 247 } as const;
export const PER_JENIS: [string, number][] = [
  ["Penipuan online", 356], ["Pencurian", 298], ["Curanmor", 214], ["Penganiayaan", 142],
  ["Penggelapan", 118], ["Pencurian ternak", 47], ["Lainnya", 109],
];
export const RESPON_MINGGUAN: [string, number][] = [["15 Sep", 6.2], ["22 Sep", 4.8], ["29 Sep", 3.9], ["6 Okt", 2.7], ["13 Okt", 2.1]];
export const RESPON_SATKER: [string, number][] = [
  ["Polresta Surakarta", 1.4], ["Polres Grobogan", 1.7], ["Polrestabes Semarang", 2.0], ["Polresta Banyumas", 2.3],
  ["Polres Kudus", 2.6], ["Ditreskrimum", 2.9], ["Polres Demak", 3.1], ["Polres Blora", 5.8], ["Polres Jepara", 7.4],
];
