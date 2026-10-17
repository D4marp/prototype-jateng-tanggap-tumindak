import { STAGES } from "@/lib/domain/types";
import type { Flag } from "@/lib/domain/types";

const PILL = [
  "bg-info-soft text-info",
  "bg-info-soft text-info",
  "bg-gold-soft text-gold-ink",
  "bg-gelar-soft text-gelar",
  "bg-sid-soft text-sid",
  "bg-ok-soft text-ok",
];
export const StagePill = ({ stage }: { stage: number }) => <span className={`pill ${PILL[stage]}`}>{STAGES[stage]}</span>;

const TONE = { ok: "text-ok", warn: "text-warn", crit: "text-crit" } as const;
export const FlagText = ({ flag }: { flag: Flag }) => (
  <span className={`inline-flex items-center gap-[7px] text-[13px] font-semibold before:size-2 before:flex-none before:rounded-full before:bg-current ${TONE[flag.tone]}`}>{flag.teks}</span>
);

export function Stepper({ stage }: { stage: number }) {
  const now = stage === 5 ? 6 : stage;
  return (
    <ol className="m-0 grid list-none grid-cols-6 p-0 pt-1">
      {STAGES.map((s, i) => {
        const done = i < now;
        const cur = i === now;
        return (
          <li key={s} aria-current={cur ? "step" : undefined} className="relative flex min-w-0 flex-col items-center gap-1.5 text-center text-[11.5px] text-muted">
            {i > 0 && <span aria-hidden className={`absolute right-1/2 top-[7px] h-0.5 w-full ${done || cur ? "bg-gold" : "bg-line"}`} />}
            <span className={`relative z-[1] size-4 rounded-full border-2 ${done ? "border-gold bg-gold" : cur ? "border-gold bg-surface shadow-[0_0_0_4px_var(--gold-soft)]" : "border-line bg-surface"}`} />
            <span className={`leading-tight [overflow-wrap:anywhere] ${cur ? "font-bold text-ink" : ""}`}>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}
