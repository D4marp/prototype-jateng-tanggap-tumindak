import Link from "next/link";
import type { ReactNode } from "react";

export function PageHead({ judul, sub, balik }: { judul: string; sub?: ReactNode; balik?: { href: string; teks: string } }) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="wrap py-7">
        {balik && <Link href={balik.href} className="mb-2 inline-block text-[13px] font-medium text-muted hover:text-ink">← {balik.teks}</Link>}
        <h1 className="h1">{judul}</h1>
        {sub && <p className="mb-0 mt-2 max-w-[64ch] text-muted">{sub}</p>}
      </div>
    </header>
  );
}
