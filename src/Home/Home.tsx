import type { ReactElement } from "react";
import NewsSection from "./components/NewsSection";
import MercatoSection from "./components/MercatoSection";
import ScoresPanel from "./components/ScoresPanel";
import LiveStrip from "./components/LiveStrip";
import { liveMatches, mercato, news, upcomingMatches } from "./homeData";
import "../styles/Home/Home.css";
import "../styles/Home/Scores.css";

// Accueil: actus + mercato au centre, scores à droite (ordinateur)
// Sur mobile, le bandeau "En direct" passe en haut de page
function Home(): ReactElement {
  return (
    <main className="home">
      <h1 className="ui-sr-only">11barre, l'actu de la Ligue des champions</h1>

      <div className="home-only-mobile">
        <LiveStrip matches={liveMatches} />
      </div>

      <div className="home-main">
        <NewsSection feeds={news} />
        <MercatoSection items={mercato} />
      </div>

      <div className="home-side home-only-desktop">
        <ScoresPanel live={liveMatches} upcoming={upcomingMatches} />
      </div>
    </main>
  );
}

export default Home;