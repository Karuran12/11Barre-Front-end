import { useCallback, useState } from "react";

// Onze titulaire et notes tactiques, gardés dans le navigateur pour chaque club.
const STORAGE_KEY = "11barre.clubPlans";
export const MAX_STARTERS = 11;

export type ClubPlan = {
  lineup: number[]; 
  notes: string;
};

type Plans = Record<string, ClubPlan>;
const EMPTY: ClubPlan = { lineup: [], notes: "" };

function readPlans(): Plans {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return data && typeof data === "object" ? (data as Plans) : {};
  } catch {
    return {};
  }
}

export function useClubPlan(clubId: string) {
  const [plans, setPlans] = useState<Plans>(readPlans);
  const plan = plans[clubId] ?? EMPTY;

  const save = useCallback(
    (patch: Partial<ClubPlan>) => {
      setPlans((prev) => {
        const next = { ...prev, [clubId]: { ...(prev[clubId] ?? EMPTY), ...patch } };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // stockage indisponible: les changements valent pour la session
        }
        return next;
      });
    },
    [clubId],
  );

  const toggleStarter = (playerId: number) => {
    const has = plan.lineup.includes(playerId);
    if (!has && plan.lineup.length >= MAX_STARTERS) return;
    save({ lineup: has ? plan.lineup.filter((id) => id !== playerId) : [...plan.lineup, playerId] });
  };

  return {
    plan,
    toggleStarter,
    setNotes: (notes: string) => save({ notes }),
    clearLineup: () => save({ lineup: [] }),
  };
}