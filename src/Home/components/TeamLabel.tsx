import type { ReactElement } from "react";
import type { Team } from "../../types/home";

type Props = {
  team: Team;
};

// Pastille (ou logo du club) + nom de l'équipe
function TeamLabel({ team }: Props): ReactElement {
  return (
    <span className="home-team">
      {team.logo ? (
        <img className="home-team-logo" src={team.logo} alt="" />
      ) : (
        <span className="home-team-dot" aria-hidden="true" />
      )}
      {team.name}
    </span>
  );
}

export default TeamLabel;