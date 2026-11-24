import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import SegmentedControl from "../../UI/SegmentedControl";
import MatchRow from "./MatchRow";
import { PATHS } from "../../routes/paths";
import type { LiveMatch, UpcomingMatch } from "../../types/home";

type Tab = "live" | "upcoming";

type Props = {
  live: LiveMatch[];
  upcoming: UpcomingMatch[];
};

function ScoresPanel({ live, upcoming }: Props): ReactElement {
  const [tab, setTab] = useState<Tab>("live");

  const tabs = [
    { value: "live" as const, label: `En direct (${live.length})` },
    { value: "upcoming" as const, label: "À venir" },
  ];

  return (
    <aside className="home-scores" aria-labelledby="home-scores-title">
      <div className="home-scores-head">
        <h2 id="home-scores-title" className="home-scores-title">Scores</h2>
        <Link to={PATHS.ldcMatchs} className="home-link">Livescore</Link>
      </div>

      <SegmentedControl label="Matchs affichés" options={tabs} value={tab} onChange={setTab} fullWidth />

      <ul className="home-match-list">
        {tab === "live"
          ? live.map((m) => <MatchRow key={m.id} kind="live" match={m} />)
          : upcoming.map((m) => <MatchRow key={m.id} kind="upcoming" match={m} />)}
      </ul>

      <Link to={PATHS.pronos} className="ui-btn ui-btn--block">Faire mon prono du soir</Link>
    </aside>
  );
}

export default ScoresPanel;