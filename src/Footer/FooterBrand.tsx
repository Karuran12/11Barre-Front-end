import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import ClubJersey from "../Club/ClubJersey";
import ClubCrest from "../Club/ClubCrest";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { PATHS } from "../routes/paths";

function FooterBrand(): ReactElement {
  const { club, themeClub } = useFavoriteClub();

  return (
    <div className="footer-brand">
      <Link to={PATHS.home} className="footer-logo" aria-label="11barre, retour à l'accueil">
        <ClubJersey club={themeClub} className="footer-logo-img" />
        <span className="footer-logo-text">11barre</span>
      </Link>

      <p className="footer-tagline">Toute la Ligue des champions, réunie sur un seul site.</p>

      <Link to={PATHS.ldcMonClub} className="footer-club">
        {club ? (
          <>
            <ClubCrest club={club} size={22} />
            <span>Ton équipe: {club.name}</span>
          </>
        ) : (
          <span>Choisis ton équipe favorite</span>
        )}
      </Link>
    </div>
  );
}

export default FooterBrand;