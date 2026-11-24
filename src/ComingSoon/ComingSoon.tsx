import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import "../styles/ComingSoon/ComingSoon.css";

// Page affichée pour les pages pas encore développées (et les URL inconnues)
function ComingSoon(): ReactElement {
  return (
    <main className="coming-soon">
      <h1 className="coming-soon-title">Bientôt disponible</h1>
      <p className="coming-soon-text">Cette rubrique est en cours de construction.</p>
      <Link to={PATHS.home} className="ui-btn">Retour à l'accueil</Link>
    </main>
  );
}

export default ComingSoon;