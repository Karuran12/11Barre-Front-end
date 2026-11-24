import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { PATHS } from "../routes/paths";

// Page réservée aux comptes connectés 
function RequireAuth({ children }: { children: ReactElement }): ReactElement {
  const { user } = useAuth();
  const { pathname, search } = useLocation();
  if (!user) return <Navigate to={PATHS.signIn} replace state={{ from: pathname + search }} />;
  return children;
}

export default RequireAuth;