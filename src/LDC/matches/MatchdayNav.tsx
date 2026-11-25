import { useEffect, useRef, type ReactElement } from "react";
import type { MatchGroup } from "./ldcMatches";

type Props = {
  groups: Pick<MatchGroup, "key" | "short" | "label">[];
  value: string;
  onChange: (key: string) => void;
};

function MatchdayNav({ groups, value, onChange }: Props): ReactElement {
  const listRef = useRef<HTMLDivElement>(null);
  const index = groups.findIndex((g) => g.key === value);
  const prev = groups[index - 1];
  const next = groups[index + 1];

  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (list && el) list.scrollLeft = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;
  }, [value]);

  return (
    <div className="ldc-daynav">
      <button
        type="button"
        className="ldc-daynav-arrow"
        onClick={() => prev && onChange(prev.key)}
        disabled={!prev}
        aria-label={prev ? `Journée précédente : ${prev.label}` : "Pas de journée précédente"}
      >
        ‹
      </button>
      <div className="ldc-daynav-list" role="group" aria-label="Choisir la journée" ref={listRef}>
        {groups.map((g) => (
          <button
            key={g.key}
            type="button"
            className={g.key === value ? "ldc-daynav-chip active" : "ldc-daynav-chip"}
            aria-pressed={g.key === value}
            title={g.label}
            onClick={() => onChange(g.key)}
          >
            {g.short}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="ldc-daynav-arrow"
        onClick={() => next && onChange(next.key)}
        disabled={!next}
        aria-label={next ? `Journée suivante : ${next.label}` : "Pas de journée suivante"}
      >
        ›
      </button>
    </div>
  );
}

export default MatchdayNav;