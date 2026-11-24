import { useState, type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFavoriteClub } from "../../Club/useFavoriteClub";
import { PATHS } from "../../routes/paths";

const PREFERENCE_KEYS = ["11barre.crests", "11barre.clubPlans"];

function PrivacySection(): ReactElement {
  const { setClubId } = useFavoriteClub();
  const navigate = useNavigate();
  const [cleared, setCleared] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const clearPreferences = () => {
    setClubId(null);
    try {
      PREFERENCE_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch {
      // rien à effacer
    }
    setCleared(true);
  };

  const removeAccount = () => navigate(PATHS.signOut, { replace: true, state: { deleteAccount: true } });

  return (
    <div className="settings-blocks">
      <section className="settings-block">
        <h3 className="setting-title">Mes données</h3>
        <p className="setting-desc">
          Ton compte, ton équipe favorite, ton onze et tes notes sont gardés uniquement dans ce navigateur. Aucun
          cookie, aucune donnée envoyée à un serveur.{" "}
          <Link to={PATHS.mentionsLegales} className="ui-link">Mentions légales</Link>
        </p>
        <div className="settings-actions">
          <button type="button" className="ui-btn ui-btn--secondary" onClick={clearPreferences}>
            Effacer mes préférences
          </button>
          <p className="ui-success" role="status">{cleared && "✓ Préférences effacées"}</p>
        </div>
      </section>

      <section className="settings-block settings-block--danger">
        <h3 className="setting-title">Supprimer mon compte</h3>
        <p className="setting-desc">Ton compte et tes réglages seront effacés. Cette action est définitive.</p>
        {confirming ? (
          <div className="settings-actions">
            <button type="button" className="ui-btn ui-btn--danger" onClick={removeAccount}>
              Oui, supprimer définitivement
            </button>
            <button type="button" className="ui-link" onClick={() => setConfirming(false)}>Annuler</button>
          </div>
        ) : (
          <button type="button" className="ui-btn ui-btn--secondary settings-danger-btn" onClick={() => setConfirming(true)}>
            Supprimer mon compte
          </button>
        )}
      </section>
    </div>
  );
}

export default PrivacySection;