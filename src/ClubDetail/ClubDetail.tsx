import { useEffect, useState, type ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import ClubCrest from "../Club/ClubCrest";
import { ordinal } from "../Club/clubStats";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { getClub } from "../mocks/clubs";
import { getStandings } from "../LDC/api";
import { PATHS } from "../routes/paths";
import SquadTable from "./SquadTable";
import { useApiTeam } from "./useApiTeam";
import { MAX_STARTERS, useClubPlan } from "./useClubPlan";
import "../styles/ClubDetail/ClubDetail.css";

type Rank = { rank: number; points: number; played: number };

// Classement du club (réel si l'API répond, sinon données de démonstration)
function useClubRank(clubId: string | undefined): Rank | undefined {
  const [rank, setRank] = useState<{ clubId: string; value?: Rank }>();
  useEffect(() => {
    if (!clubId) return;
    let cancelled = false;
    getStandings().then(({ rows }: { rows: (Rank & { clubId?: string })[] }) => {
      if (!cancelled) setRank({ clubId, value: rows.find((r) => r.clubId === clubId) });
    });
    return () => {
      cancelled = true;
    };
  }, [clubId]);
  return rank && rank.clubId === clubId ? rank.value : undefined;
}

// Fiche club: identité, classement, effectif réel, onze titulaire et notes tactiques.
function ClubDetail(): ReactElement {
  const { clubId = "" } = useParams();
  const club = getClub(clubId);
  const { club: favorite, setClubId } = useFavoriteClub();
  const [retry, setRetry] = useState(0);
  const api = useApiTeam(club, retry);
  const rank = useClubRank(club?.id);
  const { plan, toggleStarter, setNotes, clearLineup } = useClubPlan(clubId);

  if (!club) {
    return (
      <section className="club-detail-missing">
        <h2>Club introuvable</h2>
        <p>Ce club ne fait pas partie de la phase de ligue 2026-2027.</p>
        <Link to={PATHS.ldcMonClub} className="btn">Choisir un club</Link>
      </section>
    );
  }

  const team = api.status === "ready" ? api.team : undefined;
  const isFavorite = favorite?.id === club.id;

  return (
    <div className="club-detail">
      <Link to={PATHS.ldcMonClub} className="club-detail-back">← Tous les clubs</Link>

      <section className="club-detail-card" aria-labelledby="club-detail-name">
        <ClubCrest club={club} size={72} />
        <div className="club-detail-id">
          <p className="meta">{club.country}</p>
          <h2 id="club-detail-name">{club.name}</h2>
          <p className="meta">
            {team?.venue ?? "Stade non renseigné"} · Entraîneur : {team?.coach?.name ?? "non renseigné"}
            {team?.founded ? ` · Fondé en ${team.founded}` : ""}
          </p>
        </div>
        <button
          type="button"
          className={isFavorite ? "btn btn-outline" : "btn"}
          aria-pressed={isFavorite}
          onClick={() => setClubId(isFavorite ? null : club.id)}
        >
          {isFavorite ? "Ne plus suivre" : "Suivre ce club"}
        </button>

        <dl className="club-detail-stats">
          <div><dt>Classement</dt><dd>{rank ? ordinal(rank.rank) : "—"}</dd></div>
          <div><dt>Points</dt><dd>{rank?.points ?? "—"}</dd></div>
          <div><dt>Matchs joués</dt><dd>{rank?.played ?? "—"}</dd></div>
        </dl>
      </section>

      <section className="club-detail-squad" aria-labelledby="squad-title">
        <div className="section-head">
          <h2 id="squad-title">Effectif · mon onze ({plan.lineup.length}/{MAX_STARTERS})</h2>
          {plan.lineup.length > 0 && (
            <button type="button" className="link-reset" onClick={clearLineup}>Vider mon onze</button>
          )}
        </div>

        {api.status === "loading" && <p role="status">Chargement de l'effectif…</p>}
        {api.status === "error" && (
          <div className="msg-error" role="alert">
            <p>Effectif indisponible : {api.message}.</p>
            <p className="meta">L'effectif réel s'affiche avec une clé football-data.org (fichier .env.local).</p>
            <button type="button" className="btn btn-outline" onClick={() => setRetry((n) => n + 1)}>Réessayer</button>
          </div>
        )}
        {team && (team.squad?.length ? (
          <SquadTable players={team.squad} lineup={plan.lineup} onToggle={toggleStarter} />
        ) : (
          <p>Aucun joueur renvoyé par l'API pour ce club.</p>
        ))}
      </section>

      <section className="club-detail-notes" aria-labelledby="notes-title">
        <h2 id="notes-title">Notes tactiques</h2>
        <label htmlFor="club-notes" className="ui-sr-only">Notes tactiques</label>
        <textarea
          id="club-notes"
          className="input"
          placeholder="Formation, stratégie, joueurs à surveiller…"
          value={plan.notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <p className="meta">Ton onze et tes notes sont gardés dans ce navigateur.</p>
      </section>
    </div>
  );
}

export default ClubDetail;