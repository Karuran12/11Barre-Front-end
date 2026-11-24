import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import FooterBrand from "./FooterBrand";
import FooterNav from "./FooterNav";
import "../styles/Footer/Footer.css";

const YEAR = new Date().getFullYear();

function Footer(): ReactElement {
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <FooterBrand />
        <FooterNav />
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-legal">© {YEAR} 11barre · Projet étudiant</p>
          <Link to={PATHS.mentionsLegales} className="footer-legal footer-legal-link">Mentions légales</Link>
          <button type="button" className="footer-top" onClick={backToTop}>
            Haut de page <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;