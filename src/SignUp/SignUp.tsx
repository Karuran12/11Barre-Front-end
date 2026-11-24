import type { ReactElement } from "react";
import { Link, Navigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { useAuth } from "../Account/useAuth";
import { PATHS } from "../routes/paths";
import "../styles/SignIn/SignIn.css";
import "../styles/SignUp/SignUp.css";

function SignUp(): ReactElement {
  const { user } = useAuth();
  if (user) return <Navigate to={PATHS.parametres} replace />;

  return (
    <main className="auth-page">
      <div className="auth-box auth-box--wide">
        <h1 className="auth-title">Crée ton compte</h1>
        <p className="auth-subtitle">Gratuit, en moins d'une minute.</p>
        <SignUpForm />
        <p className="auth-switch">
          Déjà inscrit ? <Link to={PATHS.signIn}>Se connecter</Link>
        </p>
      </div>
    </main>
  );
}

export default SignUp;