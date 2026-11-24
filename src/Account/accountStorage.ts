export type NotificationKey = "goals" | "kickoff" | "pronoResult" | "pronoReminder" | "tickets";
export type Notifications = Record<NotificationKey, boolean>;

export type Account = {
  pseudo: string;
  email: string;
  passwordHash: string;
  createdAt: string; // date ISO
  notifications: Notifications;
};

export const DEFAULT_NOTIFICATIONS: Notifications = {
  goals: true,
  kickoff: true,
  pronoResult: true,
  pronoReminder: false,
  tickets: false,
};

const ACCOUNTS_KEY = "11barre.accounts";
const SESSION_KEY = "11barre.session";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

function readAccounts(): Account[] {
  try {
    const data = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
    return Array.isArray(data) ? (data as Account[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: Account[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export async function hashPassword(password: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function findAccount(email: string): Account | undefined {
  return readAccounts().find((a) => a.email === normalizeEmail(email));
}

export async function createAccount(pseudo: string, email: string, password: string): Promise<Account> {
  if (findAccount(email)) throw new Error("Un compte existe déjà avec cette adresse e-mail.");
  const account: Account = {
    pseudo: pseudo.trim(),
    email: normalizeEmail(email),
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
    notifications: { ...DEFAULT_NOTIFICATIONS },
  };
  writeAccounts([...readAccounts(), account]);
  return account;
}

export async function checkCredentials(email: string, password: string): Promise<Account> {
  const account = findAccount(email);
  if (!account || account.passwordHash !== (await hashPassword(password))) {
    throw new Error("Adresse e-mail ou mot de passe incorrect.");
  }
  return account;
}

export function updateAccount(email: string, patch: Partial<Account>): Account {
  const accounts = readAccounts();
  const i = accounts.findIndex((a) => a.email === normalizeEmail(email));
  if (i === -1) throw new Error("Compte introuvable.");
  accounts[i] = { ...accounts[i], ...patch, email: accounts[i].email };
  writeAccounts(accounts);
  return accounts[i];
}

export function deleteAccount(email: string): void {
  writeAccounts(readAccounts().filter((a) => a.email !== normalizeEmail(email)));
}

export function readSession(): Account | undefined {
  try {
    const email = localStorage.getItem(SESSION_KEY);
    return email ? findAccount(email) : undefined;
  } catch {
    return undefined;
  }
}

export function writeSession(email: string | null): void {
  if (email) localStorage.setItem(SESSION_KEY, normalizeEmail(email));
  else localStorage.removeItem(SESSION_KEY);
}