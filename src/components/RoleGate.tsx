import { setPeranAction } from "@/app/actions";
import { PERAN_LABEL } from "@/lib/server/peran";
import type { Peran } from "@/lib/domain/types";

/** Pesan akses terbatas + jalan pintas ganti peran (khusus demo). */
export function RoleGate({ butuh, jalur, alasan }: { butuh: Peran; jalur: string; alasan: string }) {
  return (
    <div className="wrap">
      <div className="card mt-8 max-w-xl">
        <div className="card-b grid gap-3">
          <h1 className="h2">Halaman ini bukan untuk peran Anda</h1>
          <p className="m-0 text-muted">{alasan}</p>
          <form action={setPeranAction} className="flex flex-wrap items-center gap-3">
            <input type="hidden" name="peran" value={butuh} />
            <input type="hidden" name="kembali" value={jalur} />
            <button className="btn btn-pri" type="submit">Lihat sebagai {PERAN_LABEL[butuh]}</button>
            <span className="text-[12.5px] text-muted">Pengalih peran hanya ada di prototipe. Sistem sebenarnya memakai login petugas.</span>
          </form>
        </div>
      </div>
    </div>
  );
}
