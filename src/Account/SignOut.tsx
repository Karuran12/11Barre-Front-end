import { useEffect, type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { PATHS } from "../routes/paths";

// Déconnexion
function SignOut(): ReactElement {
  const { signOut, deleteAccount } = useAuth();
  const remove = (useLocation().state as { deleteAccount?: boolean } | null)?.deleteAccount;

  useEffect(() => {
    if (remove) deleteAccount();
    else signOut();
  }, [remove, deleteAccount, signOut]);

  return <Navigate to={PATHS.home} replace />;
}

export default SignOut;