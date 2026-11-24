import type { ReactElement } from "react";
import { GROUP_ORDER, positionGroup } from "./positions";
import { MAX_STARTERS } from "./useClubPlan";
import type { ApiPlayer } from "../services/footballData";

type Props = {
  players: ApiPlayer[];
  lineup: number[];
  onToggle: (playerId: number) => void;
};

// Effectif groupé par poste, avec une case pour composer son onze
function SquadTable({ players, lineup, onToggle }: Props): ReactElement {
  const full = lineup.length >= MAX_STARTERS;
  const groups = GROUP_ORDER.map((label) => ({
    label,
    players: players.filter((p) => positionGroup(p.position) === label),
  })).filter((g) => g.players.length > 0);

  return (
    <div className="squad-wrap">
      <table className="squad">
        <caption className="ui-sr-only">Effectif du club</caption>
        <thead>
          <tr>
            <th scope="col">Joueur</th>
            <th scope="col">Nationalité</th>
            <th scope="col" className="squad-check">Titulaire</th>
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.label}>
            <tr className="squad-group">
              <th colSpan={3} scope="colgroup">{g.label}</th>
            </tr>
            {g.players.map((p) => {
              const starter = lineup.includes(p.id);
              return (
                <tr key={p.id} className={starter ? "is-starter" : undefined}>
                  <th scope="row">{p.name}</th>
                  <td>{p.nationality ?? "—"}</td>
                  <td className="squad-check">
                    <input
                      type="checkbox"
                      aria-label={`${p.name} titulaire`}
                      checked={starter}
                      disabled={!starter && full}
                      onChange={() => onToggle(p.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default SquadTable;