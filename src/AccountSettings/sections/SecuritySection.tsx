import { useState, type FormEvent, type ReactElement } from "react";
import FormField from "../../CommonComponents/FormField";
import PasswordRules from "../../SignUp/PasswordRules";
import { useAuth } from "../../Account/useAuth";
import { isPasswordValid } from "../../Account/validation";

type Errors = { current?: string; next?: string; confirm?: string };

function SecuritySection(): ReactElement {
  const { changePassword } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {
      current: current ? undefined : "Entre ton mot de passe actuel.",
      next: isPasswordValid(next) ? undefined : "Le nouveau mot de passe ne respecte pas toutes les règles.",
      confirm: confirm === next ? undefined : "Les deux mots de passe ne sont pas identiques.",
    };
    setErrors(errs);
    setSaved(false);
    if (Object.values(errs).some(Boolean)) return;

    try {
      await changePassword(current, next);
      setCurrent("");
      setNext("");
      setConfirm("");
      setSaved(true);
    } catch (err) {
      setErrors({ current: (err as Error).message });
    }
  };

  return (
    <form className="settings-form" onSubmit={submit} noValidate>
      <FormField title="Mot de passe actuel" type="password" autoComplete="current-password" value={current} onChange={setCurrent} error={errors.current} />
      <FormField title="Nouveau mot de passe" type="password" autoComplete="new-password" value={next} onChange={setNext} error={errors.next} />
      <PasswordRules password={next} />
      <FormField title="Confirmer le nouveau mot de passe" type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} error={errors.confirm} />
      <div className="settings-actions">
        <button type="submit" className="ui-btn">Changer le mot de passe</button>
        <p className="ui-success" role="status">{saved && "✓ Mot de passe modifié"}</p>
      </div>
    </form>
  );
}

export default SecuritySection;