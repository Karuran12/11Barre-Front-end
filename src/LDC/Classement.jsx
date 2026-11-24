import { useState } from "react";
import StandingsTable from "./StandingsTable";
import { getStandings } from "./api";
import { useAsync } from "./useAsync";
import { useFavoriteClub } from "../Club/useFavoriteClub";
export default function Classement() {
    const [refresh, setRefresh] = useState(0);
    const { data, loading, error } = useAsync(getStandings, refresh);
    const rows = data?.rows ?? [];
    const { club } = useFavoriteClub();
    return (<div className="ldc-grid">
      <section aria-labelledby="classement-title">
        <div className="section-head">
          <h2 id="classement-title">Classement de la phase de ligue</h2>
          <button type="button" className="btn btn-outline" onClick={() => setRefresh((n) => n + 1)} disabled={loading}>
            Actualiser
          </button>
        </div>
        {data && (<p className="meta source-note">
            {data.source === "api"
                ? "Classement réel"
                : "Données de démonstration : ajoute une clé football-data.org pour le vrai classement."}
          </p>)}

        {loading && <p role="status">Chargement du classement…</p>}
        {error && (<p role="alert" className="msg-error">
            Impossible de charger le classement : {error}. Réessaie dans un instant.
          </p>)}
        {!loading && !error && data && rows.length === 0 && <p>Aucun classement disponible pour le moment.</p>}
        {!loading && !error && rows.length > 0 && <StandingsTable rows={rows} highlightId={club?.id}/>}
      </section>

      <aside className="info-card" aria-labelledby="how-title">
        <h3 id="how-title">Comment ça marche</h3>
        <p>1 à 8 : qualifiés pour les huitièmes</p>
        <p>9 à 24 : barrages</p>
        <p>25 à 36 : éliminés</p>
        <p className="note">Clique sur un club pour voir sa fiche et son effectif.</p>
      </aside>
    </div>);
}