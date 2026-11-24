import { useState, type ReactElement } from "react";
import { useFavoriteClub } from "../Club/useFavoriteClub";
import { LEGAL_SECTIONS, LEGAL_UPDATED } from "./legalContent";
import "../styles/Legal/Legal.css";

const CREST_CACHE_KEY = "11barre.crests";

function MentionsLegales(): ReactElement {
  const { setClubId } = useFavoriteClub();
  const [cleared, setCleared] = useState(false);

  // Efface l'équipe favorite et le cache des logos gardés dans le navigateur.
  const clearData = () => {
    setClubId(null);
    try {
      localStorage.removeItem(CREST_CACHE_KEY);
    } catch {
      // stockage indisponible: rien à effacer
    }
    setCleared(true);
  };

  return (
    <main className="legal">
      <h1 className="legal-title">Mentions légales</h1>
      <p className="legal-updated">Dernière mise à jour : {LEGAL_UPDATED}</p>

      <nav className="legal-toc" aria-label="Sommaire">
        <ul>
          {LEGAL_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {LEGAL_SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="legal-section" aria-labelledby={`${s.id}-title`}>
          <h2 id={`${s.id}-title`} className="legal-section-title">{s.title}</h2>
          {s.paragraphs.map((p) => (
            <p key={p} className="legal-text">{p}</p>
          ))}
        </section>
      ))}

      <div className="legal-actions">
        <button type="button" className="ui-btn" onClick={clearData}>
          Effacer mes préférences
        </button>
        <p className="legal-status" role="status">
          {cleared && "C'est fait : ton équipe favorite et le cache des logos ont été effacés."}
        </p>
      </div>
    </main>
  );
}

export default MentionsLegales;