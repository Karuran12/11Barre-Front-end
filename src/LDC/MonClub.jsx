import { useState } from "react";
import { Link } from "react-router-dom";
import { getClubs } from "./api";
import { useAsync } from "./useAsync";
import AsyncState from "./AsyncState";
import "../styles/LDC/Pages.css";
export default function MonClub() {
    const { data, loading, error } = useAsync(getClubs);
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState("psg");
    const [alerts, setAlerts] = useState([]); // ids des clubs avec alertes
    const clubs = (data ?? []).filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
    const club = data?.find((c) => c.id === selectedId);
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
        <input id="club-search" type="search" className="input" placeholder="Ex. : Lyon, Naples…" value={query} onChange={(e) => setQuery(e.target.value)}/>
        <AsyncState loading={loading} error={error} label="les clubs"/>
        {!loading && !error && clubs.length === 0 && <p>Aucun club ne correspond à « {query} ».</p>}
        <ul className="club-list">
          {clubs.map((c) => (<li key={c.id}>
              <button type="button" aria-pressed={c.id === selectedId} className={c.id === selectedId ? "club-btn active" : "club-btn"} onClick={() => setSelectedId(c.id)}>
                {c.name}
              </button>
            </li>))}
        </ul>
      </section>

      {club && (<section className="club-card" aria-labelledby="club-name" aria-live="polite">
          <p className="meta">Tu suis</p>
          <h2 id="club-name">{club.name}</h2>
          <dl className="stats">
            <div><dt>Classement</dt><dd>{club.rank}e</dd></div>
            <div><dt>Points</dt><dd>{club.points}</dd></div>
            <div><dt>Forme</dt><dd aria-label={`Forme : ${club.form.join(", ")}`}>{club.form.join(" ")}</dd></div>
          </dl>
          <p className="meta">Prochain match</p>
          <p className="next"><strong>{club.nextMatch}</strong></p>
          <div className="actions">
            <button type="button" className="btn" aria-pressed={alertsOn} onClick={toggleAlerts}>
              {alertsOn ? "Alertes activées" : "Recevoir les alertes du club"}
            </button>
            <Link to="/ldc/matchs" className="btn btn-outline">Voir l'historique</Link>
          </div>
          <p className="meta">Forme : V = victoire, N = nul, D = défaite.</p>
        </section>)}
    </div>);
}
