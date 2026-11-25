import type { LdcMatch } from "./ldcMatches";

export type MatchDay = { key: string; label: string; matches: LdcMatch[] };

export function byDay(matches: LdcMatch[]): MatchDay[] {
  const days: MatchDay[] = [];
  matches.forEach((m) => {
    const last = days.at(-1);
    if (last?.key === m.dayKey) last.matches.push(m);
    else days.push({ key: m.dayKey, label: m.dayLabel, matches: [m] });
  });
  return days;
}