import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-10">
      <p className="eyebrow">404</p>
      <h1 className="mb-2 mt-1.5 font-display text-4xl font-bold uppercase leading-none">Halaman tidak ditemukan</h1>
      <p className="text-muted">Periksa alamat yang Anda buka, atau kembali ke beranda.</p>
      <Link href="/" className="btn btn-pri mt-3">Ke beranda</Link>
    </div>
  );
}
