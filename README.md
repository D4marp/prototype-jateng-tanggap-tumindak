# Jateng Tanggap Tumindak (prototipe)

Prototipe layanan pemantauan laporan polisi Polda Jawa Tengah dan Polres jajaran. **Seluruh data fiktif. Bukan layanan resmi.**
Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Cara mencoba

Pengalih "Lihat sebagai" di pita kuning mengganti peran (khusus demo, bukan autentikasi).

| Peran | Coba |
|-------|------|
| Pelapor | Buka `/progres/RSK-2610-0412`, masukkan 4 digit terakhir HP (ditampilkan sebagai bantuan demo) |
| Petugas SPKT | `/lapor`, "Isi data contoh", simpan. STPL terbit dengan QR |
| Penyidik / Pimpinan | `/dashboard`, buka satu laporan, bandingkan tampilan penyidik dan pelapor |
| Siapa saja | Buka SP2HP, klik tautan verifikasi pada kotak TTE (`/verifikasi/…`) |

Data tersimpan di memori server dan kembali ke contoh awal saat server dimulai ulang.

## Lambang

`public/brand/logo-polda-jateng.png` diunduh dari Wikimedia Commons (`File:LOGO_POLDA_JAWA_TENGAH.png`, keterangan "Own work" dari pengunggah, bukan aset resmi yang diverifikasi). Ganti dengan berkas resmi dari Humas/Bidpropam dengan nama yang sama. Favicon: `src/app/icon.png`.

## Konfigurasi

- `src/lib/domain/config.ts`: angka layanan (disposisi, jarak SP2HP), batas percobaan, masa akses. Semua masih contoh.
- `JTT_SECRET`: kunci penandatangan cookie akses. Wajib diisi di luar demo.
- `NEXT_PUBLIC_DEMO=0`: menyembunyikan baris "Bantuan demo" pada halaman verifikasi.

Analisis lengkap, temuan pada HTML awal, catatan kepolisian yang perlu divalidasi, dan peta jalan: [docs/ANALISIS.md](docs/ANALISIS.md).
