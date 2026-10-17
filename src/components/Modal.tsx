"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconX } from "./icons";

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="modal-title"
      className="m-auto w-full max-w-[700px] rounded-xl bg-surface p-0 text-ink max-sm:mb-0 max-sm:max-w-none max-sm:rounded-b-none"
    >
      {open && (
        <div className="max-h-[92vh] overflow-auto px-4 pb-[calc(18px+env(safe-area-inset-bottom,0px))] pt-3.5 sm:px-[22px] sm:pb-[22px] sm:pt-[18px]">
          <div className="mb-3 flex items-center justify-between gap-2.5">
            <h2 id="modal-title" className="m-0 text-lg font-bold">{title}</h2>
            <button type="button" onClick={onClose} aria-label="Tutup" className="grid size-10 flex-none cursor-pointer place-items-center rounded-md border border-line bg-surface">
              <IconX className="size-[18px]" />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
