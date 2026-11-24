export const LEGAL_UPDATED = "24 novembre 2026";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    paragraphs: [
      "11barre est un projet étudiant réalisé dans le cadre d'un cours, sans but commercial.",
      "Équipe : [noms des membres du groupe] — [nom de l'école].",
      "Responsable de la publication : [nom du responsable].",
      "Contact : [adresse e-mail du groupe].",
    ],
  },
  {
    id: "hebergement",
    title: "Hébergement",
    paragraphs: [
      "Le site n'est pas encore mis en ligne publiquement. En cas de mise en ligne, l'hébergeur sera indiqué ici : [nom, adresse et téléphone de l'hébergeur].",
    ],
  },
  {
    id: "contenus",
    title: "Contenus et données",
    paragraphs: [
      "Les actualités, scores, classements, pronostics et transferts affichés sur 11barre sont fictifs. Ils servent uniquement à illustrer le fonctionnement du site.",
    ],
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    paragraphs: [
      "Les noms, logos et couleurs des clubs sont des marques appartenant à leurs propriétaires respectifs. Leur affichage ne signifie aucun partenariat avec ces clubs ni avec l'UEFA.",
      "Le nom 11barre, son logo (le maillot) et le design du site appartiennent à l'équipe du projet.",
    ],
  },
  {
    id: "donnees",
    title: "Données personnelles et cookies",
    paragraphs: [
      "11barre ne crée pas de compte et n'envoie aucune donnée personnelle à un serveur.",
      "Le site n'utilise pas de cookies. Il garde seulement deux informations dans ton navigateur (stockage local) : ton équipe favorite et, pendant 24 heures, la liste des logos des clubs.",
      "Tu peux effacer ces informations à tout moment avec le bouton ci-dessous.",
    ],
  },
];