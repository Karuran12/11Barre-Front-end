import { useState, type CSSProperties, type ReactElement } from "react";
import { useClubCrest } from "./useClubCrest";
import type { Club } from "../types/club";
import "../styles/Club/Club.css";

type Props = {
  club: Club;
  size?: number;
  className?: string;
};

function initials(club: Club): string {
  return club.shortName
    .split(/[\s/]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

// Logo officiel du club ou initiales à ses couleurs si pas de logo
function ClubCrest({ club, size = 24, className = "" }: Props): ReactElement {
  const url = useClubCrest(club);
  const [brokenUrl, setBrokenUrl] = useState<string | null>(null);
  const style = { "--crest-size": `${size}px` } as CSSProperties;

  if (url && url !== brokenUrl) {
    return (
      <img
        className={`club-crest ${className}`.trim()}
        style={style}
        src={url}
        alt=""
        loading="lazy"
        onError={() => setBrokenUrl(url)}
      />
    );
  }

  return (
    <span
      className={`club-crest club-crest--fallback ${className}`.trim()}
      style={{ ...style, background: club.colors.primary, color: club.colors.secondary }}
      aria-hidden="true"
    >
      {initials(club)}
    </span>
  );
}

export default ClubCrest;