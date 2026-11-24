import { useEffect, useState } from "react";
import { loadApiTeams, publicCrestUrl } from "./crestApi";
import { findApiTeam } from "./clubMatching";
import type { Club } from "../types/club";

// Adresse du logo d'un club: API d'abord, sinon adresse publique connue.
export function useClubCrest(club: Club): string | undefined {
  const [apiCrest, setApiCrest] = useState<{ clubId: string; url: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadApiTeams()
      .then((teams) => {
        const url = findApiTeam(club, teams)?.crest;
        if (!cancelled && url) setApiCrest({ clubId: club.id, url });
      })
      .catch(() => {
        // On garde la solution de secours (publicCrestUrl) si l'API est indisponible
      });
    return () => {
      cancelled = true;
    };
  }, [club]);

  return apiCrest?.clubId === club.id ? apiCrest.url : publicCrestUrl(club);
}