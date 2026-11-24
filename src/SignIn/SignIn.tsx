import type { ReactElement } from "react";
import { Link, Navigate } from "react-router-dom";
import SignInForm from "./SignInForm";
import { useAuth } from "../Account/useAuth";
import { PATHS } from "../routes/paths";
import "../styles/SignIn/SignIn.css";

function SignIn(): ReactElement {
  const { user } = useAuth();
  if (user) return <Navigate to={PATHS.parametres} replace />;

  return (
    <main className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">Content de te revoir</h1>
        <p className="auth-subtitle">Connecte-toi pour retrouver tes pronos et ta carrière.</p>
        <SignInForm />
        <p className="auth-switch">
          Pas encore de compte ? <Link to={PATHS.signUp}>Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}

export default SignIn;