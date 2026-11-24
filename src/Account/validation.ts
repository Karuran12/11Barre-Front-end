export const PASSWORD_RULES: { label: string; test: (p: string) => boolean }[] = [
    { label: "8 caractères minimum", test: (p) => p.length >= 8 },
    { label: "Au moins un chiffre", test: (p) => /\d/.test(p) },
    { label: "Au moins une majuscule", test: (p) => /[A-Z]/.test(p) },
  ];
  
  export function isPasswordValid(password: string): boolean {
    return PASSWORD_RULES.every((r) => r.test(password));
  }
  
  export function emailError(email: string): string | undefined {
    if (!email.trim()) return "Entre ton adresse e-mail.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Entre une adresse e-mail valide.";
    return undefined;
  }
  
  export function pseudoError(pseudo: string): string | undefined {
    const p = pseudo.trim();
    if (p.length < 2) return "Ton pseudo doit faire au moins 2 caractères.";
    if (p.length > 20) return "Ton pseudo doit faire 20 caractères maximum.";
    return undefined;
  }