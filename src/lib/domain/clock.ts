import "server-only";
import { ANCHOR_DEMO } from "./config";

const ANCHOR = Date.parse(ANCHOR_DEMO);
const g = globalThis as { __jttBoot?: number };
g.__jttBoot ??= Date.now();

/** Jam demo: tetap konsisten dengan data contoh, tidak tergantung tanggal sebenarnya. */
export const nowMs = () => ANCHOR + (Date.now() - g.__jttBoot!);
