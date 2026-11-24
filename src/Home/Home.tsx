import type { ReactElement } from "react";
import NewsSection from "./components/NewsSection";
import MercatoSection from "./components/MercatoSection";
import ScoresPanel from "./components/ScoresPanel";
import LiveStrip from "./components/LiveStrip";
import ClubBanner from "./components/ClubBanner";
import { mercato, news, nextMatchLabel } from "./homeData";
import { useHomeMatches } from "./useHomeMatches";
import { buildClubFeed, buildClubMercato } from "../Club/clubNews";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { clubName } from "../mocks/clubs";
import "../styles/Home/Home.css";
import "../styles/Home/Scores.css";

// Accueil : actus + mercato au centre, scores à droite (ordinateur).
// Sur mobile, le bandeau des matchs passe en haut de page.
// Avec une équipe favorite : ses actus, son mercato et ses matchs passent en premier.
function Home(): ReactElement {
  const { club } = useFavoriteClub();
  const matches = useHomeMatches();

  const clubFeed = club && { label: club.shortName, feed: buildClubFeed(club) };
  const mercatoItems = club ? [...buildClubMercato(club), ...mercato] : mercato;

  return (
    <main className="home">
      <h1 className="ui-sr-only">11barre, l'actu de la Ligue des champions</h1>

      <div className="home-only-mobile">
        <LiveStrip matches={matches} favoriteId={club?.id} />
      </div>

      <div className="home-main">
        <ClubBanner nextMatch={club && nextMatchLabel(matches, club.id, clubName)} />
        {/* key : on revient sur l'onglet du club quand il change */}
        <NewsSection key={club?.id ?? "ldc"} feeds={news} clubFeed={clubFeed} />
        <MercatoSection items={mercatoItems} />
      </div>

      <div className="home-side home-only-desktop">
        <ScoresPanel matches={matches} favoriteId={club?.id} />
      </div>
    </main>
  );
}

export default Home;