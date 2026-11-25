import type { ReactElement, ReactNode } from "react";
import MatchTeam from "./MatchTeam";
import { involves, outcomeFor, type LdcMatch } from "./ldcMatches";

const OUTCOME = {
  V: { label: "Victoire", cls: "is-win" },
  N: { label: "Match nul", cls: "is-draw" },
  D: { label: "Défaite", cls: "is-loss" },
} as const;

type Props = {
  match: LdcMatch;
  favoriteId?: string;
  favoriteName?: string;
  actions?: ReactNode;
  showActions?: boolean;
};

export function venueLabel(match: LdcMatch): string | undefined {
  if (!match.venue) return undefined;
  return match.city ? `${match.venue}, ${match.city}` : match.venue;
}

function MatchRow({ match, favoriteId, favoriteName, actions, showActions = false }: Props): ReactElement {
  const { home, away, winner, state } = match;
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const outcome = outcomeFor(match, favoriteId);
  const fav = involves(match, favoriteId);
  const venue = venueLabel(match);

  const sideClass = (s: "home" | "away") =>
    `ldc-match-side ldc-match-${s}` + (winner === s ? " is-winner" : winner && winner !== "draw" ? " is-loser" : "");

  const label = hasScore
    ? `${home.name} ${match.homeScore}, ${away.name} ${match.awayScore}`
    : `${home.name} contre ${away.name}`;

  return (
    <li className={`ldc-match is-${state}${fav ? " is-fav" : ""}`}>
      <div className="ldc-match-when">
        {state === "upcoming" ? <strong>{match.time}</strong> : (
          <span className={`ldc-status is-${state}`}>{match.statusLabel}</span>
        )}
        {state !== "upcoming" && state !== "live" && <span className="ldc-match-time">{match.time}</span>}
      </div>

      <div className="ldc-match-board" aria-label={label}>
        <div className={sideClass("home")}><MatchTeam team={home} /></div>
        <div className="ldc-match-score" aria-hidden="true">
          {hasScore ? (
            <>
              <span className={winner === "home" ? "is-winner" : undefined}>{match.homeScore}</span>
              <span className="ldc-match-dash">–</span>
              <span className={winner === "away" ? "is-winner" : undefined}>{match.awayScore}</span>
            </>
          ) : (
            <span className="ldc-match-vs">vs</span>
          )}
        </div>
        <div className={sideClass("away")}><MatchTeam team={away} /></div>
      </div>

      <div className="ldc-match-info">
        {outcome && (
          <span className={`ldc-outcome ${OUTCOME[outcome].cls}`}>
            {favoriteName ? `${favoriteName} : ` : ""}{OUTCOME[outcome].label}
          </span>
        )}
        {venue && <span className="ldc-match-venue">{venue}</span>}
      </div>

      {(actions || showActions) && <div className="ldc-match-actions">{actions}</div>}
    </li>
  );
}

export default MatchRow;