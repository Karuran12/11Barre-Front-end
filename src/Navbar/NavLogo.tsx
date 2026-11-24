import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";

const LOGO_SRC = "/images/logo/logo.png";

function NavLogo(): ReactElement {
  return (
    <Link to={PATHS.home} className="nav-logo">
      <img className="nav-logo-img" src={LOGO_SRC} alt="11barre, retour à l'accueil" />
    </Link>
  );
}

export default NavLogo;
