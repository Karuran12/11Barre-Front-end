import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import LiveBadge from "../../UI/LiveBadge";
import { PATHS } from "../../routes/paths";
import type { LiveMatch } from "../../types/home";

type Props = {
  matches: LiveMatch[];
};

// Bandeau "En direct" de l'accueil mobile: cartes qui défilent à l'horizontale
function LiveStrip({ matches }: Props): ReactElement {
  return (
    <section className="home-live" aria-labelledby="home-live-title">
      <div className="home-live-head">
        <h2 id="home-live-title" className="home-section-title">En direct</h2>
        <Link to={PATHS.ldcMatchs} className="home-link">Tout voir</Link>
      </div>

      <ul className="home-live-list">
        {matches.map((m) => (
          <li key={m.id} className="home-live-card">
            <LiveBadge label={m.status} />
            <p className="home-live-line">
              <span>{m.home.shortName ?? m.home.name}</span>
              <strong>{m.homeScore}</strong>
            </p>
            <p className="home-live-line">
              <span>{m.away.shortName ?? m.away.name}</span>
              <strong>{m.awayScore}</strong>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LiveStrip;