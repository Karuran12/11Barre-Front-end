import { useEffect, useState } from "react";
import { fetchHomeMatches } from "./matchesApi";
import { mockHomeMatches } from "./homeData";
import type { HomeMatches } from "../types/home";

const REFRESH_MS = 60_000;

// Matchs de l'accueil : vraies données de l'API si la clé est configurée,
export function useHomeMatches(): HomeMatches {
  const [matches, setMatches] = useState<HomeMatches>(mockHomeMatches);

  useEffect(() => {
    const controller = new AbortController();
    let timer: number | undefined;

    const load = () => {
      fetchHomeMatches(controller.signal)
        .then((data) => {
          setMatches(data);
          timer = window.setTimeout(load, REFRESH_MS);
        })
        .catch(() => {
          // pas d'API : on garde les données de démonstration
        });
    };
    load();

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  return matches;
}