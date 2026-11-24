import { useState } from "react";
import { Link } from "react-router-dom";
import { getClubs } from "./api";
import { useAsync } from "./useAsync";
import AsyncState from "./AsyncState";
import ClubCrest from "../Club/ClubCrest";
import { getClub } from "../mocks/clubs";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { ordinal } from "../Club/clubStats";
import "../styles/LDC/Pages.css";
export default function MonClub() {
    const [refresh, setRefresh] = useState(0);
    const { data, loading, error } = useAsync(() => getClubs(refresh > 0), refresh);
    const list = data?.summaries ?? [];
    const [query, setQuery] = useState("");
    // Le club choisi ici devient l'équipe favorite de tout le site (accueil, couleurs, maillot).
    const { club: favorite, setClubId } = useFavoriteClub();
    const selectedId = favorite?.id;
    const [alerts, setAlerts] = useState([]); // ids des clubs avec alertes
    const clubs = list.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
    const club = list.find((c) => c.id === selectedId);
    const alertsOn = club ? alerts.includes(club.id) : false;
    const toggleAlerts = () => {
        if (!club)
            return;
        // TODO(back) : POST /clubs/:id/alerts
        setAlerts((a) => (a.includes(club.id) ? a.filter((x) => x !== club.id) : [...a, club.id]));
    };
    return (<div className="club-grid">
      <section aria-labelledby="choose-title">
        <h2 id="choose-title">Choisis ton club</h2>
        <label htmlFor="club-search" className="field-label">Rechercher un club</label>
        <input id="club-search" type="search" className="input" placeholder="Ex. : PSG, Naples…" value={query} onChange={(e) => setQuery(e.target.value)}/>
        <AsyncState loading={loading} error={error} label="les clubs"/>
        {!loading && !error && clubs.length === 0 && <p>Aucun club ne correspond à « {query} ».</p>}
        <ul className="club-list">
          {clubs.map((c) => (<li key={c.id}>
              <button type="button" aria-pressed={c.id === selectedId} className={c.id === selectedId ? "club-btn active" : "club-btn"} onClick={() => setClubId(c.id)}>
                <ClubCrest club={getClub(c.id)} size={24}/>
                <span>{c.name}</span>
              </button>
            </li>))}
        </ul>
      </section>

      {club && (<section className="club-card" aria-labelledby="club-name" aria-live="polite">
          <p className="meta">Tu suis</p>
          <h2 id="club-name" className="club-title"><ClubCrest club={favorite} size={40}/> {club.name}</h2>
          <dl className="stats">
            <div><dt>Classement</dt><dd>{ordinal(club.rank)}</dd></div>
            <div><dt>Points</dt><dd>{club.points}</dd></div>
            <div><dt>Forme</dt><dd aria-label={`Forme : ${club.form.join(", ") || "aucun match"}`}>{club.form.join(" ") || "–"}</dd></div>
          </dl>
          <p className="meta">Prochain match</p>
          <p className="next"><strong>{club.nextMatch}</strong></p>
          <div className="actions">
            <button type="button" className="btn" aria-pressed={alertsOn} onClick={toggleAlerts}>
              {alertsOn ? "Alertes activées" : "Recevoir les alertes du club"}
            </button>
            <Link to={`/ldc/club/${club.id}`} className="btn btn-outline">Effectif et mon onze</Link>
            <Link to="/ldc/matchs" className="btn btn-outline">Voir l'historique</Link>
          </div>
          <p className="meta">Forme : V = victoire, N = nul, D = défaite.</p>
          <p className="meta source-note">
            {data?.source === "api"
                ? "Données officielles football-data.org"
                : "Données de démonstration : ajoute une clé football-data.org pour les vrais chiffres."}
            {" "}
            <button type="button" className="link-reset" onClick={() => setRefresh((n) => n + 1)} disabled={loading}>Actualiser</button>
          </p>
          <button type="button" className="link-reset" onClick={() => setClubId(null)}>Ne plus suivre ce club</button>
        </section>)}
      {!club && !loading && (<section className="club-card" aria-live="polite">
          <h2>Aucun club suivi</h2>
          <p className="meta">Choisis ton équipe: l'accueil mettra ses actus en avant et le site prendra ses couleurs.</p>
        </section>)}
    </div>);
}