import type { ReactElement } from "react";
import LiveBadge from "../../UI/LiveBadge";
import TeamLabel from "./TeamLabel";
import type { LiveMatch, ResultMatch, UpcomingMatch } from "../../types/home";

type Props = (
  | { kind: "live"; match: LiveMatch }
  | { kind: "upcoming"; match: UpcomingMatch }
  | { kind: "result"; match: ResultMatch }
) & {
  favoriteId?: string; 
};

function Goals({ home, away }: { home: number; away: number }): ReactElement {
  return (
    <div className="home-match-goals" aria-label={`Score : ${home} à ${away}`}>
      <span>{home}</span>
      <span>{away}</span>
    </div>
  );
}

// Une ligne du bloc Scores: équipes à gauche, score ou horaire à droite.
function MatchRow(props: Props): ReactElement {
  const { homeId, awayId } = props.match;
  const isFav = props.favoriteId !== undefined && [homeId, awayId].includes(props.favoriteId);

  return (
    <li className={isFav ? "home-match is-fav" : "home-match"}>
      <div className="home-match-teams">
        <TeamLabel clubId={homeId} />
        <TeamLabel clubId={awayId} />
      </div>

      {props.kind === "live" && (
        <div className="home-match-score">
          <LiveBadge label={props.match.status} />
          <Goals home={props.match.homeScore} away={props.match.awayScore} />
        </div>
      )}

      {props.kind === "result" && (
        <div className="home-match-score">
          <span className="home-match-done">{props.match.date}</span>
          <Goals home={props.match.homeScore} away={props.match.awayScore} />
        </div>
      )}

      {props.kind === "upcoming" && (
        <div className="home-match-when">
          <strong>{props.match.time}</strong>
          <span>{props.match.date}</span>
        </div>
      )}
    </li>
  );
}

export default MatchRow;