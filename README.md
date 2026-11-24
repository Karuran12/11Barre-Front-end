# 11Barre

Site d'actualité sur la Ligue des champions : accueil, scores, classement, fiche des clubs et espace compte.
Projet de groupe réalisé en React, TypeScript et Vite.

## L'équipe

| Membre | GitHub | Partie |
|---|---|---|
| Karuran | [@Karuran12](https://github.com/Karuran12) | Accueil, barre de navigation, footer, club favori et personnalisation, mentions légales, intégration |
| Aness | [@AnessFOUKA](https://github.com/AnessFOUKA) | Compte : connexion, inscription, paramètres |
| Malik | [@Malikhelif9](https://github.com/Malikhelif9) | Ligue des champions : classement, matchs, mon club, billetterie |
| Hugo | [@Lovanlyh](https://github.com/Lovanlyh) | Mon club et classement relié à l'API |

## Lancer le projet

Il faut Node.js 20 ou plus.

```bash
git clone https://github.com/Karuran12/11Barre-Front-end.git
cd 11Barre-Front-end
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173.

## Clé API (facultatif)

Sans clé, le site marche avec des données de démonstration.
Pour avoir les vrais scores, classements et logos :

1. Créer un compte gratuit sur [football-data.org](https://www.football-data.org/client/register) et récupérer la clé reçue par mail.
2. Copier le fichier d'exemple :
   ```bash
   cp .env.example .env.local
   ```
3. Coller la clé dans `.env.local` :
   ```
   FOOTBALL_DATA_KEY=ta_cle_ici
   ```
4. Relancer `npm run dev`.

Le fichier `.env.local` ne doit jamais être poussé sur GitHub. Il est déjà dans le `.gitignore`.

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le site en local |
| `npm run build` | Vérifie les types et crée la version finale dans `dist/` |
| `npm run preview` | Affiche la version finale en local |
| `npm run lint` | Vérifie le code |

## Organisation du code

```
src/
├── Home/             page d'accueil
├── Navbar/           barre de navigation
├── Footer/           pied de page
├── LDC/              pages Ligue des champions
├── Club/             club favori, logos, couleurs
├── ClubDetail/       fiche d'un club et effectif
├── Account/          comptes et session
├── SignIn/ SignUp/   connexion et inscription
├── AccountSettings/  paramètres du compte
├── services/         appels à l'API football-data.org
├── mocks/            données de démonstration
├── routes/           adresses des pages
└── styles/           un dossier CSS par partie
```

## Limites

- Les comptes sont gardés dans le navigateur : il n'y a pas de serveur.
- L'API passe par le serveur de Vite. Une fois en ligne, le site repasse sur les données de démonstration.
- Les pages Pronos et Jeux ne sont pas encore faites.

Données fournies par l'API Football-Data.org.