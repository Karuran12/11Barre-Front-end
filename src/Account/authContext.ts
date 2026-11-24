import { createContext } from "react";
import type { Account } from "./accountStorage";

export type AuthValue = {
  user: Account | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (pseudo: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  update: (patch: Partial<Account>) => void;
  changePassword: (current: string, next: string) => Promise<void>;
  deleteAccount: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);