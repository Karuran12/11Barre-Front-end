import type { ReactElement } from "react";
import { useAuth } from "../Account/useAuth";
import "../styles/AccountSettings/Profile.css";

const monthFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

function Profile(): ReactElement {
  const { user } = useAuth();
  const initial = user?.pseudo.charAt(0).toUpperCase() ?? "?";
  const since = user ? monthFmt.format(new Date(user.createdAt)) : "";

  return (
    <header className="settings-profile">
      <span className="settings-avatar" aria-hidden="true">{initial}</span>
      <div>
        <h1 className="settings-title">Paramètres du compte</h1>
        <p className="settings-meta">
          {user?.pseudo} · {user?.email} · Membre depuis {since}
        </p>
      </div>
    </header>
  );
}

export default Profile;