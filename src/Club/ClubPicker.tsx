import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactElement } from "react";
import ClubCrest from "./ClubCrest";
import { useFavoriteClub } from "./useFavoriteClub";
import { useClickOutside } from "../Navbar/useClickOutside";
import { CLUBS } from "../mocks/clubs";
import "../styles/Club/ClubPicker.css";

const SORTED = [...CLUBS].sort((a, b) => a.name.localeCompare(b.name, "fr"));

const simplify = (s: string) => s.toLowerCase().replace(/ø/g, "o").normalize("NFD").replace(/[̀-ͯ]/g, "");

type Props = {
  label: string;
};

function ClubPicker({ label }: Props): ReactElement {
  const { club, setClubId } = useFavoriteClub();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  useClickOutside(rootRef, close, open);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const clubs = useMemo(() => {
    const q = simplify(query.trim());
    return q ? SORTED.filter((c) => simplify(`${c.name} ${c.shortName} ${c.country}`).includes(q)) : SORTED;
  }, [query]);

  const choose = (id: string | null) => {
    setClubId(id);
    close();
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className="club-picker">
      <button
        ref={triggerRef}
        type="button"
        className={club ? "club-picker-trigger" : "club-picker-trigger is-empty"}
        aria-expanded={open}
        aria-controls="club-picker-panel"
        onClick={() => (open ? close() : setOpen(true))}
      >
        {club && <ClubCrest club={club} size={24} />}
        <span>{club ? "Changer d'équipe" : label}</span>
        <span className="club-picker-caret" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div id="club-picker-panel" className="club-picker-panel" role="dialog" aria-label="Choisir mon équipe favorite">
          <div className="club-picker-head">
            <p className="club-picker-title">Choisis ton équipe</p>
            <input
              ref={searchRef}
              type="search"
              className="club-picker-search"
              placeholder="Rechercher un club, un pays…"
              aria-label="Rechercher un club"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <ul className="club-picker-grid">
            {clubs.map((c) => {
              const selected = c.id === club?.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    className={selected ? "club-card is-selected" : "club-card"}
                    aria-pressed={selected}
                    style={{ "--card-color": c.colors.primary } as CSSProperties}
                    onClick={() => choose(c.id)}
                  >
                    {selected && <span className="club-card-check" aria-hidden="true">✓</span>}
                    <ClubCrest club={c} size={44} />
                    <span className="club-card-name">{c.name.replace("/", "/\u200B")}</span>
                    <span className="club-card-country">{c.country}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {clubs.length === 0 && <p className="club-picker-empty">Aucun club ne correspond à « {query} ».</p>}

          {club && (
            <button type="button" className="club-picker-reset" onClick={() => choose(null)}>
              Ne plus suivre {club.name}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ClubPicker;