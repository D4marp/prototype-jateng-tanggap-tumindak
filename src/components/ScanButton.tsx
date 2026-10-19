"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BRAND } from "@/lib/brand";
import { IconScan } from "./icons";
import { Modal } from "./Modal";

type Detector = { detect: (v: HTMLVideoElement) => Promise<{ rawValue: string }[]> };
type DetectorCtor = new (o: { formats: string[] }) => Detector;

const TIKET = new RegExp(`${BRAND.tiketPrefix}-\\d{4}-\\d{4}`, "i");

/** Pindai QR/barcode STPL dengan kamera bila peramban mendukung BarcodeDetector. Selain itu, arahkan ke kamera bawaan ponsel. */
export function ScanButton({ className, children }: { className?: string; children?: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pesan, setPesan] = useState("");
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const Ctor = (window as unknown as { BarcodeDetector?: DetectorCtor }).BarcodeDetector;
    if (!Ctor || !navigator.mediaDevices?.getUserMedia) return;
    let stop = false;
    let stream: MediaStream | undefined;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (stop || !video.current) return;
        video.current.srcObject = stream;
        await video.current.play();
        const det = new Ctor({ formats: ["qr_code", "code_128"] });
        const loop = async () => {
          if (stop || !video.current) return;
          const hasil = await det.detect(video.current).catch(() => []);
          const m = hasil.map((h) => h.rawValue.match(TIKET)?.[0]).find(Boolean);
          if (m) {
            setOpen(false);
            router.push(`/progres/${m.toUpperCase()}`);
            return;
          }
          setTimeout(loop, 300);
        };
        loop();
      } catch {
        setPesan("Kamera tidak dapat dibuka. Izinkan akses kamera, atau ketik kode tiket secara manual.");
      }
    })();
    return () => {
      stop = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [open, router]);

  return (
    <>
      <button type="button" className={className} onClick={() => {
          const Ctor = (window as unknown as { BarcodeDetector?: DetectorCtor }).BarcodeDetector;
          setPesan(Ctor && typeof navigator.mediaDevices?.getUserMedia === "function" ? "" : "Peramban ini belum bisa memindai di dalam halaman. Gunakan aplikasi kamera ponsel: QR pada STPL langsung membuka halaman progres.");
          setOpen(true);
        }}>
        <IconScan />
        {children ?? "Pindai barcode"}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Pindai barcode STPL">
        {pesan ? (
          <p className="m-0 text-sm">{pesan}</p>
        ) : (
          <video ref={video} muted playsInline className="aspect-[4/3] w-full rounded-xl bg-black object-cover" />
        )}
        <p className="hint">Arahkan kamera ke QR pada STPL. Setelah terbaca, Anda diminta memasukkan 4 digit terakhir nomor HP pelapor.</p>
      </Modal>
    </>
  );
}
