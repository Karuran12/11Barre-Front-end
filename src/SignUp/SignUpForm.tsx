import { useState, type FormEvent, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../CommonComponents/FormField";
import Checkbox from "../CommonComponents/Checkbox";
import PasswordRules from "./PasswordRules";
import { useAuth } from "../Account/useAuth";
import { emailError, isPasswordValid, pseudoError } from "../Account/validation";
import { PATHS } from "../routes/paths";
import "../styles/SignUp/SignUpForm.css";

type Errors = { pseudo?: string; email?: string; password?: string; terms?: string; form?: string };

function SignUpForm(): ReactElement {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      pseudo: pseudoError(pseudo),
      email: emailError(email),
      password: isPasswordValid(password) ? undefined : "Ton mot de passe ne respecte pas toutes les règles.",
      terms: terms ? undefined : "Tu dois accepter les conditions d'utilisation.",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSending(true);
    try {
      await signUp(pseudo, email, password);
      navigate(PATHS.home, { replace: true });
    } catch (err) {
      setErrors({ form: (err as Error).message });
      setSending(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={submit} noValidate>
      {errors.form && <p className="ui-alert ui-alert--error" role="alert">{errors.form}</p>}

      <FormField title="Pseudo" autoComplete="nickname" placeholder="exemple" value={pseudo} onChange={setPseudo} error={errors.pseudo} />
      <FormField
        title="Adresse e-mail"
        type="email"
        autoComplete="email"
        placeholder="exemple@gmail.com"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <FormField
        title="Mot de passe"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <PasswordRules password={password} />

      <Checkbox text="J'accepte les conditions d'utilisation" checked={terms} onChange={setTerms} error={errors.terms} />

      <button type="submit" className="ui-btn ui-btn--block" disabled={sending}>
        {sending ? "Création…" : "Créer mon compte"}
      </button>
    </form>
  );
}

export default SignUpForm;