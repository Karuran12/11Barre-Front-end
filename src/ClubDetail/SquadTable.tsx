import type { CSSProperties, ReactElement } from "react";
import PlayerCard from "./PlayerCard";
import { GROUP_ORDER, positionGroup } from "./positions";
import { MAX_STARTERS } from "./useClubPlan";
import type { ApiPlayer } from "../services/footballData";
import type { Club } from "../types/club";

type Props = {
  club: Club;
  players: ApiPlayer[];
  lineup: number[];
  onToggle: (playerId: number) => void;
};

function SquadTable({ club, players, lineup, onToggle }: Props): ReactElement {
  const full = lineup.length >= MAX_STARTERS;
  const byNumber = (a: ApiPlayer, b: ApiPlayer) => (a.shirtNumber ?? 999) - (b.shirtNumber ?? 999);
  const groups = GROUP_ORDER.map((label) => ({
    label,
    players: players.filter((p) => positionGroup(p.position) === label).sort(byNumber),
  })).filter((g) => g.players.length > 0);

  const style = { "--squad-bg": club.colors.primary, "--squad-fg": club.colors.secondary } as CSSProperties;

  return (
    <div className="squad-groups" style={style}>
      {groups.map((g) => (
        <section key={g.label} className="squad-group" aria-label={g.label}>
          <h3 className="squad-group-title">
            {g.label} <span className="squad-group-count">{g.players.length}</span>
          </h3>
          <ul className="player-grid">
            {g.players.map((p) => (
              <PlayerCard
                key={p.id}
                player={p}
                starter={lineup.includes(p.id)}
                disabled={full}
                onToggle={() => onToggle(p.id)}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default SquadTable;