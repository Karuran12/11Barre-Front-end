# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Modules LDC et Mon club — intégration Figma

Cette livraison utilise les écrans **Classement** et **Mon club** du fichier Figma 11-barre (frames 1:209 et 1:555) et conserve React, TypeScript, Vite, `SignIn` et les styles CSS du projet initial.

### Installation

```bash
npm ci
cp .env.example .env
# Ajouter FOOTBALL_DATA_TOKEN dans .env
npm run dev
```

Obtenir une clé auprès de https://www.football-data.org/. L'API est utilisée via le proxy de développement Vite (`/api/football`) pour le classement `CL` et les fiches des clubs. L'accès aux données dépend des droits de la clé ; aucune donnée simulée ne remplace une erreur API. En production, déployer un proxy backend plutôt que d'exposer la clé.

### Fonctionnalités

- `/ldc` : classement API, recherche, actualisation, accès aux clubs, zones de qualification.
- `/club` : recherche et choix d'un club, accès au club suivi, ajout/suppression de favoris.
- `/club/:id` : fiche du club, statistiques si disponibles, joueurs, sélection de 11 titulaires, notes tactiques.
- `/SignIn` : page préexistante conservée.

Les clubs suivis, onze et notes sont conservés en `localStorage` sur l'appareil. Aucun serveur d'authentification ni synchronisation multi-appareils n'est fourni. Les onglets Matchs, Billetterie, Pronos et Jeux figurent visuellement dans la maquette, mais ne sont pas implémentés dans le périmètre livré.

### Vérification

La compilation n'a pas été vérifiée dans cet environnement : le cache npm ne contient pas la version de Vite demandée et l'installation hors ligne des dépendances a échoué. Après `npm ci` avec accès réseau, lancer `npm run build`.
