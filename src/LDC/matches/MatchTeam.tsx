import type { ReactElement } from "react";
import ClubCrest from "../../Club/ClubCrest";
import { getClub } from "../../mocks/clubs";
import type { MatchSide } from "./ldcMatches";

type Props = {
  team: MatchSide;
  size?: number;
};

function MatchTeam({ team, size = 28 }: Props): ReactElement {
  const club = team.clubId ? getClub(team.clubId) : undefined;
  const crest = club ? (
    <ClubCrest club={club} size={size} />
  ) : team.crest ? (
    <img className="club-crest" src={team.crest} alt="" loading="lazy" style={{ width: size, height: size }} />
  ) : (
    <span className="ldc-team-unknown" style={{ width: size, height: size }} aria-hidden="true">?</span>
  );

  return (
    <span className={team.known ? "ldc-team" : "ldc-team is-unknown"}>
      {crest}
      <span className="ldc-team-name">{team.name}</span>
    </span>
  );
}

export default MatchTeam;