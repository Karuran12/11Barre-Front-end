import { useEffect, useState } from "react";
import { getClubSummary, type ClubSummary } from "./clubStats";
import { loadClubSummaries } from "./liveClubStats";

export function useClubSummary(clubId: string | undefined): ClubSummary | undefined {
  const [live, setLive] = useState<{ id: string; summary: ClubSummary } | undefined>();

  useEffect(() => {
    if (!clubId) return;
    let cancelled = false;
    loadClubSummaries().then(({ summaries }) => {
      const summary = summaries.find((s) => s.id === clubId);
      if (!cancelled && summary) setLive({ id: clubId, summary });
    });
    return () => {
      cancelled = true;
    };
  }, [clubId]);

  if (!clubId) return undefined;
  return live?.id === clubId ? live.summary : getClubSummary(clubId);
}