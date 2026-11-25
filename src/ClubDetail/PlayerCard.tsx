import type { ReactElement } from "react";
import { ageFrom, countryLabel, playerInitials, positionLabel } from "./playerLabels";
import type { ApiPlayer } from "../services/footballData";

type Props = {
  player: ApiPlayer;
  starter: boolean;
  disabled: boolean;
  onToggle: () => void;
};

// Carte joueur : avatar, numéro, nom, poste, nationalité, âge, bouton titulaire.
function PlayerCard({ player, starter, disabled, onToggle }: Props): ReactElement {
  const position = positionLabel(player.position);
  const country = countryLabel(player.nationality);
  const age = ageFrom(player.dateOfBirth);
  const hasFullName = Boolean(player.firstName && player.lastName);
  const details = [country, age !== undefined ? `${age} ans` : undefined].filter(Boolean).join(" · ");

  return (
    <li className={starter ? "player-card is-starter" : "player-card"}>
      <div className="player-avatar" aria-hidden="true">
        <span className="player-initials">{playerInitials(player.name)}</span>
        {player.shirtNumber != null && <span className="player-number">{player.shirtNumber}</span>}
      </div>

      <div className="player-texts">
        <h4 className="player-name">
          {hasFullName ? (
            <>
              <span className="player-first">{player.firstName}</span> {player.lastName}
            </>
          ) : (
            player.name
          )}
        </h4>
        {position && <p className="player-position">{position}</p>}
        {details && <p className="player-meta">{details}</p>}
        {player.shirtNumber != null && <p className="ui-sr-only">Numéro {player.shirtNumber}</p>}
      </div>

      <button
        type="button"
        className="player-toggle"
        aria-pressed={starter}
        aria-label={`${player.name} titulaire`}
        disabled={!starter && disabled}
        onClick={onToggle}
      >
        {starter ? "Titulaire ✓" : "Titulaire"}
      </button>
    </li>
  );
}

export default PlayerCard;