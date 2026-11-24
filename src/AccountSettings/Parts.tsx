import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Part from "./Part";
import { SECTIONS } from "./sections";
import { PATHS } from "../routes/paths";
import "../styles/AccountSettings/Parts.css";

// Menu des rubriques + bouton « Se déconnecter »
function Parts({ active }: { active: string }): ReactElement {
  const navigate = useNavigate();
  const logout = () => navigate(PATHS.signOut, { replace: true });

  return (
    <nav className="settings-parts" aria-label="Rubriques des paramètres">
      <ul className="settings-parts-list">
        {SECTIONS.map((s) => (
          <Part key={s.id} id={s.id} title={s.title} active={s.id === active} />
        ))}
      </ul>
      <button type="button" className="ui-btn ui-btn--secondary ui-btn--block settings-logout" onClick={logout}>
        Se déconnecter
      </button>
    </nav>
  );
}

export default Parts;