import { useState } from "react";
import { getTickets } from "./api";
import { useAsync } from "./useAsync";
import AsyncState from "./AsyncState";
import ClubName from "../Club/ClubName";
import "../styles/LDC/Pages.css";
const STATUS = {
    available: { label: "Disponible", cls: "badge badge-ok" },
    low: { label: "Peu de places", cls: "badge badge-warn" },
    soldout: { label: "Complet", cls: "badge badge-off" },
};
export default function Billetterie() {
    const { data, loading, error } = useAsync(getTickets);
    const [waitlist, setWaitlist] = useState([]);
    const joinWaitlist = (id) => {
        // TODO(back) : POST /tickets/:id/waitlist
        setWaitlist((w) => (w.includes(id) ? w : [...w, id]));
    };
    return (<section aria-labelledby="tickets-title">
      <h2 id="tickets-title">Billetterie officielle</h2>
      <p className="muted">Places vendues directement par les clubs. Prix par place, frais compris.</p>
      <AsyncState loading={loading} error={error} label="la billetterie"/>
      {!loading && !error && data?.length === 0 && <p>Aucune billetterie ouverte pour le moment.</p>}
      <ul className="ticket-grid">
        {data?.map((t) => {
            const s = STATUS[t.status];
            const joined = waitlist.includes(t.id);
            return (<li key={t.id} className="ticket-card">
              <span className={s.cls}>{s.label}</span>
              <h3 className="ticket-match" aria-label={t.match}>
                <ClubName clubId={t.homeId} size={28}/>
                <span className="ticket-vs" aria-hidden="true">contre</span>
                <ClubName clubId={t.awayId} size={28}/>
              </h3>
              <p className="meta">{t.when} · {t.venue}</p>
              <p className="price">{t.status === "soldout" ? "Plus de places en vente" : `À partir de ${t.priceFrom} €`}</p>
              {t.status === "soldout" ? (<button type="button" className="btn btn-outline btn-block" disabled={joined} onClick={() => joinWaitlist(t.id)}>
                  {joined ? "Tu es sur la liste d'attente" : "Liste d'attente"}
                </button>) : (
                // TODO : page de choix des places
                <button type="button" className="btn btn-block">Choisir mes places</button>)}
            </li>);
        })}
      </ul>
    </section>);
}