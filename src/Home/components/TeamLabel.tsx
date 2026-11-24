import type { ReactElement } from "react";
import ClubCrest from "../../Club/ClubCrest";
import { getClub } from "../../mocks/clubs";

type Props = {
  clubId: string;
};

// Logo du club (API) + nom de l'équipe
function TeamLabel({ clubId }: Props): ReactElement {
  const club = getClub(clubId);

  return (
    <span className="home-team">
      {club && <ClubCrest club={club} size={20} />}
      {club?.name ?? clubId}
    </span>
  );
}

export default TeamLabel;