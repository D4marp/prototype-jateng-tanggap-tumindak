import { STAGES } from "@/lib/domain/types";
import type { Flag } from "@/lib/domain/types";

const DOT = ["bg-blue", "bg-blue", "bg-gold", "bg-gelar", "bg-sid", "bg-ok"];
const TONE = { ok: "bg-ok", warn: "bg-gold", crit: "bg-brand" } as const;
const TEXT = { ok: "text-ok", warn: "text-warn", crit: "text-crit" } as const;

export const StagePill = ({ stage }: { stage: number }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap text-[13.5px] font-semibold">
    <span aria-hidden className={`size-2.5 rounded-[2px] ${DOT[stage]}`} />
    {STAGES[stage]}
  </span>
);

export const FlagText = ({ flag }: { flag: Flag }) => (
  <span className={`inline-flex items-center gap-2 text-[13.5px] font-semibold ${TEXT[flag.tone]}`}>
    <span aria-hidden className={`size-2.5 rounded-full ${TONE[flag.tone]}`} />
    {flag.teks}
  </span>
);

export function Stepper({ stage }: { stage: number }) {
  const now = stage === 5 ? 6 : stage;
  return (
    <ol className="m-0 grid list-none grid-cols-6 p-0">
      {STAGES.map((s, i) => {
        const done = i < now;
        const cur = i === now;
        return (
          <li key={s} aria-current={cur ? "step" : undefined} className="relative flex min-w-0 flex-col items-center gap-2 text-center text-[10.5px] text-muted sm:text-xs">
            {i > 0 && <span aria-hidden className={`absolute right-1/2 top-[7px] h-[2px] w-full ${done || cur ? "bg-ink" : "bg-line"}`} />}
            <span className={`relative z-[1] size-4 rounded-full border-2 ${done ? "border-ink bg-ink" : cur ? "border-brand bg-brand ring-4 ring-brand/15" : "border-line bg-surface"}`} />
            <span className={`leading-tight ${cur ? "font-bold text-ink" : done ? "text-ink" : ""}`}>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}
