import { useEffect, useState } from "react";
import { loadApiTeams } from "../Club/crestApi";
import { findApiTeam } from "../Club/clubMatching";
import { fetchTeam, type ApiTeamDetail } from "../services/footballData";
import type { Club } from "../types/club";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; team: ApiTeamDetail };

// Fiche d'un club depuis l'API (stade, entraîneur, effectif).
// `retry` relance la requête quand il change.
export function useApiTeam(club: Club | undefined, retry: number): State {
  const [state, setState] = useState<{ key: string; value: State } | null>(null);
  const key = `${club?.id}-${retry}`;

  useEffect(() => {
    if (!club) return;
    const controller = new AbortController();

    (async () => {
      // identifiant API : connu dans notre liste, sinon retrouvé par le nom
      const id = club.fdId ?? findApiTeam(club, await loadApiTeams())?.id;
      if (!id) throw new Error("club introuvable dans l'API");
      return fetchTeam(id, controller.signal);
    })()
      .then((team) => setState({ key, value: { status: "ready", team } }))
      .catch((e: Error) => {
        if (!controller.signal.aborted) setState({ key, value: { status: "error", message: e.message } });
      });

    return () => controller.abort();
  }, [club, key]);

  return state?.key === key ? state.value : { status: "loading" };
}