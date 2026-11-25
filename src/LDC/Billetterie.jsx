import { useState } from "react";
import MatchTeam from "./matches/MatchTeam";
import SourceNote from "./matches/SourceNote";
import { venueLabel } from "./matches/MatchRow";
import { involves } from "./matches/ldcMatches";
import { useLdcMatches } from "./matches/useLdcMatches";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import "../styles/LDC/Pages.css";
import "../styles/LDC/Matches.css";

// Matchs à venir de toutes les journées restantes, avec lieu et lien vers le site du club qui reçoit.
export default function Billetterie() {
    const { data, loading, refresh } = useLdcMatches();
    const { club } = useFavoriteClub();
    const [onlyMine, setOnlyMine] = useState(false);

    const groups = (data?.groups ?? [])
        .map((g) => ({
        ...g,
        matches: g.matches.filter((m) => m.state === "upcoming" && m.home.known && m.away.known && (!onlyMine || involves(m, club?.id))),
    }))
        .filter((g) => g.matches.length > 0);
    const pending = (data?.groups ?? []).filter((g) => g.matches.some((m) => m.state === "upcoming" && (!m.home.known || !m.away.known)));

    return (<section aria-labelledby="tickets-title" className="ldc-tickets">
      <h2 id="tickets-title">Billetterie</h2>
      <p className="muted">
        Les places sont vendues par le club qui reçoit. Les prix et les places restantes ne sont pas fournis par l'API :
        chaque carte mène au site officiel du club.
      </p>

      <div className="ldc-matches-tools">
        <SourceNote source={data?.source} loading={loading} onRefresh={refresh}/>
        {club && (<label className="ldc-toggle">
            <input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)}/>
            Seulement {club.shortName}
          </label>)}
      </div>

      {loading && !data && <p role="status">Chargement des prochains matchs…</p>}
      {data && groups.length === 0 && (<p>{onlyMine ? `Aucun match à venir pour ${club?.shortName}.` : "Aucun match à venir pour le moment."}</p>)}

      {groups.map((g) => (<div key={g.key} className="ldc-tickets-group">
          <h3 className="ldc-day-title">{g.phase} · {g.label}</h3>
          <ul className="ticket-grid">
            {g.matches.map((m) => {
                const venue = venueLabel(m);
                return (<li key={m.id} className={involves(m, club?.id) ? "ticket-card is-fav" : "ticket-card"}>
                  <p className="ldc-ticket-date">{m.dayLabel} · <strong>{m.time}</strong></p>
                  <h4 className="ticket-match" aria-label={`${m.home.name} contre ${m.away.name}`}>
                    <MatchTeam team={m.home} size={32}/>
                    <span className="ticket-vs" aria-hidden="true">contre</span>
                    <MatchTeam team={m.away} size={32}/>
                  </h4>
                  <p className="meta ldc-ticket-venue">{venue ?? "Lieu non communiqué par l'API"}</p>
                  {m.website ? (<a className="btn btn-block" href={m.website} target="_blank" rel="noopener noreferrer">
                      Site officiel {m.home.name}
                      <span className="ui-sr-only"> (nouvel onglet)</span>
                    </a>) : (<p className="meta">Site du club non communiqué par l'API.</p>)}
                </li>);
            })}
          </ul>
        </div>))}

      {!onlyMine && pending.length > 0 && (<p className="meta">
          {pending.map((g) => g.label).join(", ")} : affiches connues après le tirage au sort.
        </p>)}
    </section>);
}