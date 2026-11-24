import type { ReactElement } from "react";
import LiveBadge from "../../UI/LiveBadge";
import TeamLabel from "./TeamLabel";
import type { LiveMatch, UpcomingMatch } from "../../types/home";

type Props =
  | { kind: "live"; match: LiveMatch }
  | { kind: "upcoming"; match: UpcomingMatch };

// Une ligne du bloc Scores: équipes à gauche, score ou horaire à droite.
function MatchRow(props: Props): ReactElement {
  const { home, away } = props.match;

  return (
    <li className="home-match">
      <div className="home-match-teams">
        <TeamLabel team={home} />
        <TeamLabel team={away} />
      </div>

      {props.kind === "live" ? (
        <div className="home-match-score">
          <LiveBadge label={props.match.status} />
          <div className="home-match-goals" aria-label={`Score : ${props.match.homeScore} à ${props.match.awayScore}`}>
            <span>{props.match.homeScore}</span>
            <span>{props.match.awayScore}</span>
          </div>
        </div>
      ) : (
        <div className="home-match-when">
          <strong>{props.match.time}</strong>
          <span>{props.match.date}</span>
        </div>
      )}
    </li>
  );
}

export default MatchRow;