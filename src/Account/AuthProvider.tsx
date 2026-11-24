import { useCallback, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import {
  checkCredentials,
  createAccount,
  deleteAccount as removeAccount,
  hashPassword,
  readSession,
  updateAccount,
  writeSession,
  type Account,
} from "./accountStorage";

// Compte connecté, partagé par toutes les pages (Navbar, connexion, paramètres).
function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<Account | undefined>(readSession);

  const signIn = useCallback(async (email: string, password: string) => {
    const account = await checkCredentials(email, password);
    writeSession(account.email);
    setUser(account);
  }, []);

  const signUp = useCallback(async (pseudo: string, email: string, password: string) => {
    const account = await createAccount(pseudo, email, password);
    writeSession(account.email);
    setUser(account);
  }, []);

  const signOut = useCallback(() => {
    writeSession(null);
    setUser(undefined);
  }, []);

  const update = useCallback(
    (patch: Partial<Account>) => {
      if (user) setUser(updateAccount(user.email, patch));
    },
    [user],
  );

  const changePassword = useCallback(
    async (current: string, next: string) => {
      if (!user) throw new Error("Tu n'es pas connecté.");
      await checkCredentials(user.email, current).catch(() => {
        throw new Error("Mot de passe actuel incorrect.");
      });
      setUser(updateAccount(user.email, { passwordHash: await hashPassword(next) }));
    },
    [user],
  );

  const deleteAccount = useCallback(() => {
    if (!user) return;
    removeAccount(user.email);
    writeSession(null);
    setUser(undefined);
  }, [user]);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut, update, changePassword, deleteAccount }),
    [user, signIn, signUp, signOut, update, changePassword, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;