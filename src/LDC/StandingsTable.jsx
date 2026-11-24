import { Link } from "react-router-dom";
import ClubCrest from "../Club/ClubCrest";
import { getClub } from "../mocks/clubs";
const zoneOf = (rank) => (rank <= 8 ? "top" : rank <= 24 ? "playoff" : "out");
const zoneLabel = {
    top: "Qualifiés pour les huitièmes (1 à 8)",
    playoff: "Barrages (9 à 24)",
    out: "Éliminés (25 à 36)",
};
// Logo + nom, lien vers la fiche quand le club est dans notre liste des 36
function ClubCell({ row }) {
    const club = getClub(row.clubId);
    if (!club)
        return (<span className="club-cell">
        {row.crest && <img className="club-crest" style={{ "--crest-size": "22px" }} src={row.crest} alt=""/>}
        {row.club}
      </span>);
    return (<Link to={`/ldc/club/${club.id}`} className="club-cell">
      <ClubCrest club={club} size={22}/>
      {row.club}
    </Link>);
}
export default function StandingsTable({ rows, highlightId }) {
    let lastZone = null;
    const body = [];
    rows.forEach((r) => {
        const zone = zoneOf(r.rank);
        if (zone !== lastZone) {
            lastZone = zone;
            body.push(<tr key={`z-${zone}`} className="zone-row">
          <th colSpan={8} scope="colgroup">{zoneLabel[zone]}</th>
        </tr>);
        }
        body.push(<tr key={r.rank} className={r.clubId === highlightId ? "is-highlight" : undefined}>
        <td>{r.rank}</td>
        <th scope="row" className="club">
          <ClubCell row={r}/>
        </th>
        <td>{r.played}</td>
        <td>{r.won}</td>
        <td>{r.drawn}</td>
        <td>{r.lost}</td>
        <td>{r.diff > 0 ? `+${r.diff}` : r.diff}</td>
        <td className="pts">{r.points}</td>
      </tr>);
    });
    return (<div className="table-wrap">
      <table className="standings">
        <caption className="sr-only">Classement de la phase de ligue</caption>
        <thead>
          <tr>
            <th scope="col">#</th><th scope="col">Club</th><th scope="col">J</th>
            <th scope="col">G</th><th scope="col">N</th><th scope="col">P</th>
            <th scope="col">+/-</th><th scope="col">Pts</th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>);
}