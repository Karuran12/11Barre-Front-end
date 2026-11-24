import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import LiveBadge from "../../UI/LiveBadge";
import { getClub } from "../../mocks/clubs";
import { favoriteFirst } from "../homeData";
import { PATHS } from "../../routes/paths";
import type { HomeMatches } from "../../types/home";

type Props = {
  matches: HomeMatches;
  favoriteId?: string;
};

const shortName = (id: string) => getClub(id)?.shortName ?? id;

// Bandeau de l'accueil mobile: matchs en direct,
function LiveStrip({ matches, favoriteId }: Props): ReactElement {
  const hasLive = matches.live.length > 0;
  const isFav = (m: { homeId: string; awayId: string }) =>
    favoriteId !== undefined && [m.homeId, m.awayId].includes(favoriteId);
  const cardClass = (m: { homeId: string; awayId: string }) => (isFav(m) ? "home-live-card is-fav" : "home-live-card");

  return (
    <section className="home-live" aria-labelledby="home-live-title">
      <div className="home-live-head">
        <h2 id="home-live-title" className="home-section-title">{hasLive ? "En direct" : "Prochains matchs"}</h2>
        <Link to={PATHS.ldcMatchs} className="home-link">Tout voir</Link>
      </div>

      <ul className="home-live-list">
        {hasLive
          ? favoriteFirst(matches.live, favoriteId).map((m) => (
              <li key={m.id} className={cardClass(m)}>
                <LiveBadge label={m.status} />
                <p className="home-live-line"><span>{shortName(m.homeId)}</span><strong>{m.homeScore}</strong></p>
                <p className="home-live-line"><span>{shortName(m.awayId)}</span><strong>{m.awayScore}</strong></p>
              </li>
            ))
          : favoriteFirst(matches.upcoming, favoriteId).map((m) => (
              <li key={m.id} className={cardClass(m)}>
                <span className="home-live-when">{m.date} · {m.time}</span>
                <p className="home-live-line"><span>{shortName(m.homeId)}</span></p>
                <p className="home-live-line"><span>{shortName(m.awayId)}</span></p>
              </li>
            ))}
      </ul>
    </section>
  );
}

export default LiveStrip;