import { useState } from "react";
import { Link } from "react-router-dom";
import MatchRow from "./matches/MatchRow";
import MatchdayNav from "./matches/MatchdayNav";
import SourceNote from "./matches/SourceNote";
import { byDay } from "./matches/byDay";
import { involves } from "./matches/ldcMatches";
import { useLdcMatches } from "./matches/useLdcMatches";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { PATHS } from "../routes/paths";
import "../styles/LDC/Pages.css";
import "../styles/LDC/Matches.css";

export default function Matchs() {
    const { data, loading, refresh } = useLdcMatches();
    const { club } = useFavoriteClub();
    const [picked, setPicked] = useState(null);
    const [onlyMine, setOnlyMine] = useState(false);

    const groups = data?.groups ?? [];
    const group = groups.find((g) => g.key === picked) ?? groups.find((g) => g.key === data?.currentKey);
    const matches = (group?.matches ?? []).filter((m) => !onlyMine || involves(m, club?.id));
    const counts = group && {
        done: group.matches.filter((m) => m.state === "finished").length,
        total: group.matches.length,
    };

    return (<section aria-labelledby="matchs-title" className="ldc-matches">
      <div className="section-head ldc-matches-head">
        <div>
          <h2 id="matchs-title">{group ? `${group.phase} · ${group.label}` : "Matchs"}</h2>
          {counts && <p className="meta">{counts.done} match{counts.done > 1 ? "s" : ""} joué{counts.done > 1 ? "s" : ""} sur {counts.total}</p>}
        </div>
        {groups.length > 0 && <MatchdayNav groups={groups} value={group?.key ?? ""} onChange={setPicked}/>}
      </div>

      <div className="ldc-matches-tools">
        <SourceNote source={data?.source} loading={loading} onRefresh={refresh}/>
        {club && (<label className="ldc-toggle">
            <input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)}/>
            Seulement {club.shortName}
          </label>)}
      </div>

      {loading && !data && <p role="status">Chargement des matchs…</p>}
      {data && groups.length === 0 && <p>Aucun match disponible pour cette saison.</p>}
      {group && matches.length === 0 && <p>{club?.shortName} ne joue pas lors de cette journée.</p>}

      {byDay(matches).map((day) => {
            const actionable = (m) => m.state === "upcoming" && m.home.known && m.away.known;
            const withActions = day.matches.some(actionable);
            return (<div key={day.key} className="ldc-day">
          <h3 className="ldc-day-title">{day.label}</h3>
          <ul className={withActions ? "ldc-match-list has-actions" : "ldc-match-list"}>
            {day.matches.map((m) => (<MatchRow key={m.id} match={m} favoriteId={club?.id} favoriteName={club?.shortName} showActions={withActions} actions={actionable(m) ? (<>
                    <Link to={PATHS.pronos} className="btn">Faire mon prono</Link>
                    <Link to={PATHS.ldcBilletterie} className="btn btn-outline">Billets</Link>
                  </>) : undefined}/>))}
          </ul>
        </div>);
        })}
    </section>);
}