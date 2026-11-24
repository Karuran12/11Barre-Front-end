import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import ClubCrest from "../../Club/ClubCrest";
import ClubPicker from "../../Club/ClubPicker";
import { useFavoriteClub } from "../../Club/useFavoriteClub";

// Mes clubs
function ClubsSection(): ReactElement {
  const { club } = useFavoriteClub();

  return (
    <div className="settings-clubs">
      {club ? (
        <div className="settings-club-card">
          <ClubCrest club={club} size={56} />
          <div>
            <p className="setting-desc">Équipe favorite</p>
            <p className="settings-club-name">{club.name}</p>
            <Link to={`/ldc/club/${club.id}`} className="ui-link">Voir la fiche du club</Link>
          </div>
        </div>
      ) : (
        <p className="setting-desc">Tu ne suis encore aucun club.</p>
      )}
      <p className="setting-desc">
        Ton équipe favorite passe en premier sur l'accueil (actus, matchs) et le site prend ses couleurs.
      </p>
      <ClubPicker label="Choisir mon équipe" />
    </div>
  );
}

export default ClubsSection;