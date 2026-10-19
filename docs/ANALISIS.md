# Analisis prototipe HTML dan keputusan pengembangan ke Next.js

> Catatan: prototipe awal dibuat untuk Polda Jateng ("Jateng Tanggap Tumindak"). Versi ini disesuaikan untuk Bareskrim Polri ("Bareskrim Tanggap"). Temuan teknis tetap berlaku; konteks organisasi dan data contoh sudah diganti (lihat bagian 6).

Sumber: artifact HTML satu berkas "Jateng Tanggap Tumindak" (±920 baris, JavaScript murni, data contoh fiktif).
Semua isi di bawah adalah penilaian teknis dan rancangan. Hal yang menyangkut aturan kepolisian ditandai **[validasi]**: harus dicek oleh Biro Reskrim/Bidkum/Bidpropam sebelum dipakai sebagai kebijakan.

## 1. Yang sudah kuat di prototipe HTML

- Alur layanan jelas dan mengikuti cara kerja reserse: SPKT, STPL, disposisi, lidik/gelar/sidik, SP2HP, P21/Tahap II.
- Satu pintu masuk (front office SPKT) lalu mengalir ke unit, tanpa ketik ulang.
- Pembedaan tampilan pelapor dan penyidik sebagai gagasan inti.
- Status layanan yang dapat diukur (disposisi, jarak SP2HP) sehingga pimpinan bisa melihat yang terlambat.
- Bahasa dan istilah lapangan dipakai apa adanya (LP/B, SPKT, disposisi, gelar perkara, SPDP, P21, Tahap II).

## 2. Temuan teknis pada HTML (dan perbaikannya)

| # | Temuan | Dampak | Perbaikan di versi Next.js |
|---|--------|--------|----------------------------|
| 1 | Seluruh data kasus (kronologi, catatan internal, NIK utuh) dimuat ke peramban, "tampilan pelapor" hanya menyembunyikannya lewat JS | Siapa pun bisa membaca lewat DevTools. Ini kelemahan terbesar | Redaksi dilakukan di server (`lib/server/views.ts`). Payload pelapor tidak memuat kronologi, rencana, catatan internal, atau identitas utuh. Diverifikasi dengan mengambil HTML halaman pelapor dan mencari teks tersebut: tidak ada |
| 2 | Kode tiket berurutan (`BRK-2610-0412`, `…0413`) dan tunggal sebagai kunci akses | Orang bisa menebak tiket orang lain (enumerasi) | Akses butuh faktor kedua: 4 digit terakhir HP pelapor. Pesan gagal sama untuk tiket yang ada maupun tidak. Batas 5 kegagalan per 10 menit. Cookie akses ditandatangani HMAC, berlaku 30 menit |
| 3 | Dashboard "khusus pimpinan" tanpa kontrol akses | Siapa pun yang membuka tab bisa melihat | Pemisahan peran di server (pelapor, SPKT, penyidik, pimpinan). Di prototipe peran dipilih lewat pengalih demo, bukan login |
| 4 | Tombol "Pindai barcode" hanya simulasi dan selalu membuka tiket yang sama; QR berisi teks `JTT\|id\|CONTOH` yang tidak bisa dibuka kamera bawaan ponsel | Pemaparan menyesatkan: terlihat jadi padahal tidak | QR kini berisi URL halaman progres, sehingga kamera ponsel biasa langsung membukanya. Pemindai dalam halaman memakai `BarcodeDetector` bila peramban mendukung |
| 5 | Kode verifikasi TTE hanya hash dan tidak bisa diperiksa | "Tanda tangan elektronik" hanya hiasan | Halaman `/verifikasi/[kode]` memeriksa kode ke sistem dan sengaja tidak menampilkan isi perkara. Tetap simulasi, lihat bagian 4 |
| 6 | Kode tiket diturunkan dari nomor urut laporan, padahal nomor LP lazimnya diurut oleh sistem manajemen penyidikan | Dua sumber penomoran dapat menghasilkan tiket yang sama | Dicatat di `lib/domain/ids.ts`. Produksi: kode acak tak berurutan plus digit pemeriksa |
| 7 | Jam acuan `Math.max(Date.now(), REF)` dan `new Date(datetime-local)` memakai zona waktu perangkat | Bendera keterlambatan dan "n jam lalu" berubah tergantung kapan dan di mana dibuka | Jam demo tunggal di server berjalan dari titik acuan. Semua tanggal diparsing dan ditampilkan dalam WIB |
| 8 | Angka KPI dashboard ditulis tetap dan tidak cocok dengan daftar 8 laporan; tahap "Disposisi" tidak pernah terpakai pada data contoh | Dashboard terlihat meyakinkan tetapi tidak bisa ditelusuri | Dilabeli sebagai rekap sintetis. Daftar dan bendera dihitung dari data. Penelusuran antar-angka masih pekerjaan lanjutan |
| 9 | Angka target (1×24 jam, 14 hari) tertanam di teks, kode, dan bendera | Mengubahnya berarti mengubah banyak tempat | Satu berkas `lib/domain/config.ts` |
| 10 | Dialog modal dibuat manual, HTML disusun lewat penggabungan string, QR dari pustaka CDN, font dari CDN | Fokus keyboard tidak terjebak benar, risiko XSS jika `esc()` terlewat, bergantung CDN | `<dialog>` bawaan, React yang meloloskan teks, QR dibuat di server, font dibundel Next |
| 11 | Data hilang saat halaman ditutup | Tidak bisa diuji dua pihak sekaligus (petugas dan pelapor) | Penyimpanan di memori server. Petugas menerbitkan STPL, pelapor membukanya dari perangkat lain |

## 3. Catatan dari sisi kepolisian **[validasi]**

1. **Angka layanan.** 1×24 jam disposisi dan 14 hari antar-SP2HP adalah isian contoh. Selang SP2HP, siapa penandatangan, dan redaksi baku wajib mengikuti aturan Bareskrim yang berlaku. Judul surat sudah dibedakan menurut tahap (SP2HP penyelidikan vs penyidikan) tetapi format bakunya harus disamakan dengan yang dipakai Reskrim.
2. **Kasus yang tidak boleh lewat jalur publik.** Perkara dengan korban anak, kesusilaan/PPA, terorisme, narkotika dengan informan, dan sejenisnya perlu penanda `sensitif`; pelapor hanya melihat status minimal. Prototipe belum punya penanda ini.
3. **Pelapor tidak sama dengan korban atau saksi.** Model data sekarang hanya mengenal pelapor. Pemeriksaan saksi lewat video call menunjuk orang lain (mis. kakak pelapor), jadi akses dan pemberitahuan ke mereka perlu aturan.
4. **Nama penyidik disamarkan di tampilan pelapor.** Ini keputusan kebijakan (akuntabilitas vs keselamatan penyidik), bukan teknis. Alternatifnya menampilkan nama dan nomor kontak kantor.
5. **Perlindungan data pribadi.** NIK, nomor HP, dan kronologi adalah data pribadi. Perlu dasar pemrosesan, masa retensi, dan catatan audit siapa melihat apa (UU PDP). Di tampilan penyidik, akses harus tercatat; saat ini hanya ada pengingat di layar.
6. **Tanda tangan elektronik.** Kode TTE di prototipe adalah hash biasa. Yang sah adalah sertifikat elektronik dari penyelenggara tersertifikasi (BSrE termasuk kandidat). Kotak TTE di dokumen dan halaman verifikasi sudah memberi tahu bahwa ini simulasi.
7. **Pemeriksaan video call.** Perlu SOP: verifikasi identitas, persetujuan, penyimpanan rekaman, dan jaminan hak pihak yang diperiksa. Prototipe hanya menampilkan alur, kamera tidak dinyalakan.
8. **Sumber kebenaran.** Sistem ini tidak boleh menjadi basis data kedua yang berbeda dari sistem manajemen penyidikan yang sudah dipakai. Posisinya lapisan layanan dan pemantauan di atas data yang ada, dengan sinkronisasi satu arah.

## 4. Arsitektur Next.js

```
src/
  app/                      rute (App Router, dirender dinamis)
    page.tsx                beranda, alur, matriks siapa-melihat-apa, skenario pemaparan
    lapor/                  formulir SPKT (hanya peran SPKT)
    progres/[tiket]/        verifikasi 4 digit HP lalu tampilan pelapor
    dashboard/              KPI, grafik, tabel + filter lewat query (hanya penyidik/pimpinan)
    dashboard/[tiket]/      tampilan penyidik, dengan pratinjau tampilan pelapor
    verifikasi/[kode]/      pemeriksaan keaslian dokumen
    actions.ts              server action: buat laporan, verifikasi tiket, ganti peran demo
  lib/
    domain/                 tipe, konfigurasi SLA, format, data contoh, penurunan riwayat (tanpa efek samping)
    server/                 penyimpanan, peran, akses/pembatas, view (satu-satunya pintu data ke peramban)
    validation.ts           skema Zod
  components/               UI
```

Prinsip:

- **Redaksi di server.** `bangunView(r, "pub" | "int", …)` adalah satu-satunya tempat data kasus diubah menjadi JSON untuk peramban.
- **Penyimpanan di balik antarmuka kecil** (`lib/server/store.ts`) agar mudah diganti basis data atau layanan e-MP.
- **Riwayat dan dokumen diturunkan** dari tonggak waktu, tidak disimpan ganda.
- **Tailwind v4** dengan token warna di `globals.css` (terang dan gelap mengikuti perangkat), tanpa pustaka komponen.
- **Aksesibilitas:** `<dialog>` asli, label pada setiap kolom, `aria-invalid`/`aria-describedby` pada galat, `aria-current` pada navigasi dan langkah, kontras mengikuti token asli.

## 5. Batas prototipe dan langkah berikut

Belum ada (sengaja): login petugas, basis data, log audit, notifikasi SP2HP ke WhatsApp/SMS, integrasi sistem penyidikan, TTE tersertifikasi, penanda perkara sensitif, uji penetrasi.
Belum diuji: pemindai kamera pada perangkat nyata (hanya fallback yang dicek), pembaca layar, uji kegunaan dengan pelapor sebenarnya.

Urutan yang disarankan:

1. Kebijakan: tetapkan angka layanan, daftar perkara sensitif, aturan nama penyidik, dan format SP2HP.
2. Uji kegunaan di SPKT Bareskrim dengan SPKT dan beberapa pelapor.
3. Autentikasi petugas + basis data + log audit.
4. Integrasi satu arah dengan sistem penyidikan yang ada.
5. Notifikasi SP2HP dan TTE tersertifikasi.
6. Uji keamanan independen sebelum dibuka ke publik.

## 6. Penyesuaian untuk Bareskrim **[validasi]**

- **Satuan.** Penerima laporan adalah SPKT Bareskrim Polri; pimpinan mendisposisikan ke direktorat. Direktorat yang dimodelkan: Dittipidum, Dittipideksus, Dittipidsiber, Dittipidkor, Dittipidnarkoba, Dittipid PPA-PPO, Dittipidter. Nama, susunan, dan penomoran subdit pada data contoh adalah perkiraan; sesuaikan dengan organisasi yang berlaku.
- **Rute.** Direktorat tujuan awal diturunkan dari jenis perkara (`lib/domain/satker.ts`). Pada praktik, disposisi pimpinan yang menentukan; kolom di formulir hanya perkiraan.
- **Perkara sensitif.** Jenis "Perdagangan orang" memakai tampilan pelapor yang dibatasi: judul, lokasi, uraian, dan kerugian tidak tampil, dan salinan STPL tidak memuat rincian. Daftar jenis ada di `JENIS_SENSITIF`; keputusan akhir ada pada pimpinan.
- **Cakupan.** Bareskrim biasanya menangani perkara berskala nasional atau lintas wilayah, dan Polda/Polres menangani sebagian besar laporan. Jalur pelimpahan dari Polda belum dimodelkan.
- **Kejaksaan.** Seluruh tahap II memakai Kejaksaan Agung RI sebagai contoh; perkara tertentu bisa berbeda.
- **Lambang.** Berkas lambang diunduh dari Wikimedia Commons dan belum diverifikasi sebagai aset resmi; ganti dengan berkas dari Humas sebelum dipakai di luar uji coba.
