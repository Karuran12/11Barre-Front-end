// Postes renvoyés par football-data.org -> libellés français et ordre d'affichage
const GROUPS: { label: string; match: RegExp }[] = [
    { label: "Gardiens", match: /goalkeeper/i },
    { label: "Défenseurs", match: /defen[cs]e|back/i },
    { label: "Milieux", match: /midfield/i },
    { label: "Attaquants", match: /offen[cs]e|forward|winger|striker/i },
  ];
  
  export const OTHER_GROUP = "Autres";
  
  export function positionGroup(position: string | null | undefined): string {
    return GROUPS.find((g) => position && g.match.test(position))?.label ?? OTHER_GROUP;
  }
  
  export const GROUP_ORDER = [...GROUPS.map((g) => g.label), OTHER_GROUP];