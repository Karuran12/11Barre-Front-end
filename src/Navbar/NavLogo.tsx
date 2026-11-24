import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import ClubJersey from "../Club/ClubJersey";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { PATHS } from "../routes/paths";

// Le maillot 11barre, aux couleurs de l'équipe favorite s'il y en a une.
function NavLogo(): ReactElement {
  const { themeClub } = useFavoriteClub();

  return (
    <Link to={PATHS.home} className="nav-logo" aria-label="11barre, retour à l'accueil">
      <ClubJersey club={themeClub} className="nav-logo-img" />
    </Link>
  );
}

export default NavLogo;