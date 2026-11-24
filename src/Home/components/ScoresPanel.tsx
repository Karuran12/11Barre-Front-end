import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import SegmentedControl from "../../UI/SegmentedControl";
import MatchRow from "./MatchRow";
import { favoriteFirst } from "../homeData";
import { PATHS } from "../../routes/paths";
import type { HomeMatches } from "../../types/home";

type Tab = "live" | "upcoming" | "results";

type Props = {
  matches: HomeMatches;
  favoriteId?: string;
};

const EMPTY: Record<Tab, string> = {
  live: "Aucun match en cours pour le moment.",
  upcoming: "Aucun match programmé pour le moment.",
  results: "Aucun résultat pour le moment.",
};

function ScoresPanel({ matches, favoriteId }: Props): ReactElement {
  const hasLive = matches.live.length > 0;
  const [chosen, setChosen] = useState<Tab | null>(null);
  const tab = chosen ?? (hasLive ? "live" : "upcoming");

  const tabs = [
    { value: "live" as const, label: hasLive ? `En direct (${matches.live.length})` : "En direct" },
    { value: "upcoming" as const, label: "À venir" },
    { value: "results" as const, label: "Résultats" },
  ];

  const live = favoriteFirst(matches.live, favoriteId);
  const upcoming = favoriteFirst(matches.upcoming, favoriteId);
  const results = favoriteFirst(matches.results, favoriteId);
  const count = { live: live.length, upcoming: upcoming.length, results: results.length }[tab];

  return (
    <aside className="home-scores" aria-labelledby="home-scores-title">
      <div className="home-scores-head">
        <h2 id="home-scores-title" className="home-scores-title">Scores</h2>
        <Link to={PATHS.ldcMatchs} className="home-link">Livescore</Link>
      </div>

      <SegmentedControl label="Matchs affichés" options={tabs} value={tab} onChange={setChosen} fullWidth />

      {count === 0 ? (
        <p className="home-scores-empty">{EMPTY[tab]}</p>
      ) : (
        <ul className="home-match-list">
          {tab === "live" && live.map((m) => <MatchRow key={m.id} kind="live" match={m} favoriteId={favoriteId} />)}
          {tab === "upcoming" && upcoming.map((m) => <MatchRow key={m.id} kind="upcoming" match={m} favoriteId={favoriteId} />)}
          {tab === "results" && results.map((m) => <MatchRow key={m.id} kind="result" match={m} favoriteId={favoriteId} />)}
        </ul>
      )}

      <Link to={PATHS.pronos} className="ui-btn ui-btn--block">Faire mon prono du soir</Link>
    </aside>
  );
}

export default ScoresPanel;