import { useState, type FormEvent, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormField from "../CommonComponents/FormField";
import { useAuth } from "../Account/useAuth";
import { emailError } from "../Account/validation";
import { PATHS } from "../routes/paths";
import "../styles/SignIn/SignInForm.css";

type Errors = { email?: string; password?: string; form?: string };

function SignInForm(): ReactElement {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? PATHS.home;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [info, setInfo] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      email: emailError(email),
      password: password ? undefined : "Entre ton mot de passe.",
    };
    setErrors(next);
    setInfo("");
    if (next.email || next.password) return;

    setSending(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrors({ form: (err as Error).message });
      setSending(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={submit} noValidate>
      {errors.form && <p className="ui-alert ui-alert--error" role="alert">{errors.form}</p>}

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
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />

      {/* pas de serveur d'e-mail pour l'instant */}
      <button
        type="button"
        className="ui-link auth-forgot"
        onClick={() => setInfo("La réinitialisation du mot de passe arrivera avec le serveur du site.")}
      >
        Mot de passe oublié ?
      </button>

      <button type="submit" className="ui-btn ui-btn--block" disabled={sending}>
        {sending ? "Connexion…" : "Se connecter"}
      </button>
      <button
        type="button"
        className="ui-btn ui-btn--secondary ui-btn--block"
        onClick={() => setInfo("La connexion avec Google n'est pas encore disponible.")}
      >
        Continuer avec Google
      </button>

      {info && <p className="ui-alert ui-alert--info" role="status">{info}</p>}
    </form>
  );
}

export default SignInForm;