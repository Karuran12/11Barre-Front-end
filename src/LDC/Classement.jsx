import StandingsTable from "./StandingsTable";
import { useStandings } from "./useStandings";
export default function Classement() {
    const { data, loading, error } = useStandings();
    return (<div className="ldc-grid">
      <section aria-labelledby="classement-title">
        <div className="section-head">
          <h2 id="classement-title">Classement de la phase de ligue</h2>
          <span className="live-badge"><span aria-hidden="true">●</span> LIVE 67'</span>
        </div>

        {loading && <p role="status">Chargement du classement…</p>}
        {error && (<p role="alert" className="msg-error">
            Impossible de charger le classement : {error}. Réessaie dans un instant.
          </p>)}
        {!loading && !error && data.length === 0 && <p>Aucun classement disponible pour le moment.</p>}
        {!loading && !error && data.length > 0 && <StandingsTable rows={data}/>}

        <a className="link-more" href="#toutes-les-equipes">Voir les 36 équipes</a>
      </section>

      <aside className="info-card" aria-labelledby="how-title">
        <h3 id="how-title">Comment ça marche</h3>
        <p>1 à 8 : qualifiés pour les huitièmes</p>
        <p>9 à 24 : barrages</p>
        <p>25 à 36 : éliminés</p>
        <p className="note">Le classement bouge en direct pendant les matchs.</p>
      </aside>
    </div>);
}
