import { useEffect, useState, type ReactElement } from "react";
import { buildJerseyImage, LOGO_SRC } from "./jerseyImage";
import type { Club } from "../types/club";
import "../styles/Club/Club.css";

type Props = {
  club: Club | undefined;
  className?: string;
};

// ici on affiche le maillot aux couleurs du club, ou le logo par défaut si aucun club n'est sélectionné
function ClubJersey({ club, className = "" }: Props): ReactElement {
  const [jersey, setJersey] = useState<{ clubId: string; url: string } | null>(null);

  useEffect(() => {
    if (!club) return;
    let cancelled = false;
    buildJerseyImage(club)
      .then((url) => {
        if (!cancelled) setJersey({ clubId: club.id, url });
      })
      .catch(() => {
      });
    return () => {
      cancelled = true;
    };
  }, [club]);

  const colored = club && jersey?.clubId === club.id ? jersey.url : undefined;

  return (
    <img
      className={`club-jersey ${className}`.trim()}
      src={colored ?? LOGO_SRC}
      alt={club ? `11barre, maillot aux couleurs de ${club.name}` : "11barre"}
    />
  );
}

export default ClubJersey;