import { useState, type FormEvent, type ReactElement } from "react";
import FormField from "../../CommonComponents/FormField";
import { useAuth } from "../../Account/useAuth";
import { pseudoError } from "../../Account/validation";

function ProfileSection(): ReactElement {
  const { user, update } = useAuth();
  const [pseudo, setPseudo] = useState(user?.pseudo ?? "");
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = pseudoError(pseudo);
    setError(err);
    if (err) return;
    update({ pseudo: pseudo.trim() });
    setSaved(true);
  };

  return (
    <form className="settings-form" onSubmit={submit} noValidate>
      <FormField
        title="Pseudo"
        value={pseudo}
        onChange={(v) => {
          setPseudo(v);
          setSaved(false);
        }}
        error={error}
        autoComplete="nickname"
      />
      <FormField
        title="Adresse e-mail"
        value={user?.email ?? ""}
        onChange={() => {}}
        readOnly
        hint="L'adresse e-mail sert à te connecter, elle ne peut pas être modifiée."
      />
      <div className="settings-actions">
        <button type="submit" className="ui-btn">Enregistrer</button>
        <p className="ui-success" role="status">{saved && "✓ Modifications enregistrées"}</p>
      </div>
    </form>
  );
}

export default ProfileSection;