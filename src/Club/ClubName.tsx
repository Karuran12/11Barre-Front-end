import type { ReactElement } from "react";
import ClubCrest from "./ClubCrest";
import { getClub } from "../mocks/clubs";

type Props = {
  clubId: string;
  size?: number;
  short?: boolean;
};

function ClubName({ clubId, size = 22, short = false }: Props): ReactElement {
  const club = getClub(clubId);
  if (!club) return <span className="club-name">{clubId}</span>;

  return (
    <span className="club-name">
      <ClubCrest club={club} size={size} />
      <span>{short ? club.shortName : club.name}</span>
    </span>
  );
}

export default ClubName;