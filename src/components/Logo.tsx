import Image from "next/image";

/** Lambang Polda Jateng. Berkas: public/brand/logo-polda-jateng.png (lihat README untuk catatan sumber). */
export function Logo({ tinggi = 44 }: { tinggi?: number }) {
  return (
    <Image src="/brand/logo-polda-jateng.png" alt="Lambang Polda Jawa Tengah" width={Math.round(tinggi * 0.73)} height={tinggi} priority className="flex-none" style={{ height: tinggi, width: "auto" }} />
  );
}
