import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-14">
      <h1 className="h1">Halaman tidak ditemukan</h1>
      <p className="mb-5 mt-2 text-muted">Periksa alamat yang Anda buka, atau kembali ke beranda.</p>
      <Link href="/" className="btn btn-pri">Ke beranda</Link>
    </div>
  );
}
