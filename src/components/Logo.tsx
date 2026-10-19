import Image from "next/image";
import { BRAND } from "@/lib/brand";

/** Lambang Bareskrim Polri. Berkas: public/brand/logo-bareskrim.png (lihat README untuk catatan sumber). */
export function Logo({ tinggi = 44 }: { tinggi?: number }) {
  return (
    <Image src={BRAND.logo} alt={BRAND.logoAlt} width={Math.round(tinggi * BRAND.logoRasio)} height={tinggi} priority className="flex-none" style={{ height: tinggi, width: "auto" }} />
  );
}
