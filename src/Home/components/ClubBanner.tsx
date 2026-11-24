import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import ClubCrest from "../../Club/ClubCrest";
import ClubPicker from "../../Club/ClubPicker";
import { getClubSummary, ordinal } from "../../Club/clubStats";
import { useFavoriteClub } from "../../Club/useFavoriteClub";
import { PATHS } from "../../routes/paths";
import "../../styles/Home/ClubBanner.css";

// Banner affiché sur la page d'accueil, avec le club favori de l'utilisateur
type Props = {
  nextMatch?: string;
};

function ClubBanner({ nextMatch }: Props): ReactElement {
  const { club } = useFavoriteClub();

  if (!club) {
    return (
      <section className="club-banner club-banner--empty" aria-labelledby="club-banner-title">
        <div className="club-banner-texts">
          <h2 id="club-banner-title" className="club-banner-title">Choisis ton équipe favorite</h2>
        </div>
        <ClubPicker label="Choisir mon équipe" />
      </section>
    );
  }

  const summary = getClubSummary(club.id);

  return (
    <section className="club-banner" aria-labelledby="club-banner-title" aria-live="polite">
      <span className="club-banner-crest">
        <ClubCrest club={club} size={56} />
      </span>

      <div className="club-banner-texts">
        <p className="club-banner-label">Mon équipe</p>
        <h2 id="club-banner-title" className="club-banner-title">{club.name}</h2>
        {summary && (
          <p className="club-banner-meta">
            {ordinal(summary.rank)} · {summary.points} pts · Forme {summary.form.join(" ")}
            <br />
            {nextMatch ?? "Prochain match à confirmer"}
          </p>
        )}
      </div>

      <div className="club-banner-actions">
        <ClubPicker label="Choisir mon équipe" />
        <Link to={PATHS.ldcMonClub} className="club-banner-link">Voir mon club</Link>
      </div>
    </section>
  );
}

export default ClubBanner;