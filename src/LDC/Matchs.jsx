import { useState } from "react";
import { Link } from "react-router-dom";
import { getResults, getUpcoming } from "./api";
import { useAsync } from "./useAsync";
import AsyncState from "./AsyncState";
import ClubName from "../Club/ClubName";
import "../styles/LDC/Pages.css";
const MATCHDAYS = [1, 2, 3, 4];
export default function Matchs() {
    const [matchday, setMatchday] = useState(4);
    const results = useAsync(() => getResults(matchday), matchday);
    const upcoming = useAsync(getUpcoming);
    return (<>
      <section aria-labelledby="results-title">
        <div className="section-head">
          <h2 id="results-title">Résultats</h2>
          <div className="matchday" role="group" aria-label="Choisir la journée">
            {MATCHDAYS.map((d) => (<button key={d} type="button" aria-pressed={d === matchday} className={d === matchday ? "chip active" : "chip"} onClick={() => setMatchday(d)}>
                J{d}
              </button>))}
          </div>
        </div>
        <AsyncState loading={results.loading} error={results.error} label="les résultats"/>
        {!results.loading && !results.error && results.data?.length === 0 && <p>Aucun résultat pour cette journée.</p>}
        <ul className="result-grid">
          {results.data?.map((m) => (<li key={m.id} className="result-card">
              <p className="meta">{m.date} · Terminé</p>
              <p className="score-line"><ClubName clubId={m.homeId}/><strong>{m.homeScore}</strong></p>
              <p className="score-line"><ClubName clubId={m.awayId}/><strong>{m.awayScore}</strong></p>
            </li>))}
        </ul>
      </section>

      <section aria-labelledby="upcoming-title" className="block">
        <h2 id="upcoming-title">Prochains matchs · 5e journée</h2>
        <AsyncState loading={upcoming.loading} error={upcoming.error} label="les prochains matchs"/>
        <ul className="upcoming">
          {upcoming.data?.map((m) => (<li key={m.id} className="upcoming-row">
              <div className="when"><strong>{m.time}</strong><span>{m.date}</span></div>
              <p className="teams"><ClubName clubId={m.homeId}/><span aria-hidden="true">–</span><ClubName clubId={m.awayId}/></p>
              <div className="actions">
                {/* TODO*/}
                <button type="button" className="btn">Faire mon prono</button>
                <Link to="/ldc/billetterie" className="btn btn-outline">Billets</Link>
              </div>
            </li>))}
        </ul>
      </section>
    </>);
}