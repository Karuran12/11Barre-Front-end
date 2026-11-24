import type { Club } from "../types/club";

export const CLUBS: Club[] = [
  // Chapeau 1
  { id: "psg", name: "PSG", shortName: "PSG", country: "France", colors: { primary: "#004170", secondary: "#DA291C" }, fdId: 524, aliases: ["Paris Saint-Germain"] },
  { id: "bayern", name: "Bayern Munich", shortName: "Bayern", country: "Allemagne", colors: { primary: "#DC052D", secondary: "#FFFFFF" }, fdId: 5, aliases: ["FC Bayern München"] },
  { id: "real", name: "Real Madrid", shortName: "Real", country: "Espagne", colors: { primary: "#FFFFFF", secondary: "#00529F" }, fdId: 86 },
  { id: "liverpool", name: "Liverpool", shortName: "Liverpool", country: "Angleterre", colors: { primary: "#C8102E", secondary: "#FFFFFF" }, fdId: 64 },
  { id: "inter", name: "Inter", shortName: "Inter", country: "Italie", colors: { primary: "#0068A8", secondary: "#000000" }, fdId: 108, aliases: ["Inter Milan", "FC Internazionale Milano"] },
  { id: "mancity", name: "Manchester City", shortName: "Man City", country: "Angleterre", colors: { primary: "#6CABDD", secondary: "#1C2C5B" }, fdId: 65 },
  { id: "arsenal", name: "Arsenal", shortName: "Arsenal", country: "Angleterre", colors: { primary: "#EF0107", secondary: "#FFFFFF" }, fdId: 57 },
  { id: "barca", name: "FC Barcelone", shortName: "Barça", country: "Espagne", colors: { primary: "#A50044", secondary: "#004D98" }, fdId: 81, aliases: ["Barcelona", "FC Barcelona"] },
  { id: "atletico", name: "Atlético Madrid", shortName: "Atlético", country: "Espagne", colors: { primary: "#CB3524", secondary: "#272E61" }, fdId: 78, aliases: ["Club Atlético de Madrid", "Atleti"] },

  // Chapeau 2
  { id: "dortmund", name: "Dortmund", shortName: "Dortmund", country: "Allemagne", colors: { primary: "#FDE100", secondary: "#000000" }, fdId: 4, aliases: ["Borussia Dortmund", "BVB"] },
  { id: "roma", name: "AS Roma", shortName: "Roma", country: "Italie", colors: { primary: "#8E1F2F", secondary: "#F0BC42" }, fdId: 100 },
  { id: "sporting", name: "Sporting CP", shortName: "Sporting", country: "Portugal", colors: { primary: "#008057", secondary: "#FFFFFF" }, fdId: 498, aliases: ["Sporting Lisbon", "Sporting Clube de Portugal"] },
  { id: "astonvilla", name: "Aston Villa", shortName: "Aston Villa", country: "Angleterre", colors: { primary: "#670E36", secondary: "#95BFE5" }, fdId: 58 },
  { id: "porto", name: "FC Porto", shortName: "Porto", country: "Portugal", colors: { primary: "#00428C", secondary: "#FFFFFF" }, fdId: 503 },
  { id: "manutd", name: "Manchester United", shortName: "Man United", country: "Angleterre", colors: { primary: "#DA291C", secondary: "#FFFFFF" }, fdId: 66, aliases: ["Man Utd"] },
  { id: "brugge", name: "Club Bruges", shortName: "Bruges", country: "Belgique", colors: { primary: "#0067CE", secondary: "#000000" }, fdId: 851, aliases: ["Club Brugge", "Club Brugge KV"] },
  { id: "betis", name: "Real Betis", shortName: "Betis", country: "Espagne", colors: { primary: "#00954C", secondary: "#FFFFFF" }, fdId: 90, aliases: ["Real Betis Balompié"] },
  { id: "psv", name: "PSV Eindhoven", shortName: "PSV", country: "Pays-Bas", colors: { primary: "#ED1C24", secondary: "#FFFFFF" }, fdId: 674 },

  // Chapeau 3
  { id: "feyenoord", name: "Feyenoord", shortName: "Feyenoord", country: "Pays-Bas", colors: { primary: "#E30613", secondary: "#FFFFFF" }, fdId: 675, aliases: ["Feyenoord Rotterdam"] },
  { id: "lille", name: "LOSC Lille", shortName: "Lille", country: "France", colors: { primary: "#E01E13", secondary: "#24216A" }, fdId: 521, aliases: ["Lille OSC", "Lille"] },
  { id: "bodo", name: "Bodø/Glimt", shortName: "Bodø/Glimt", country: "Norvège", colors: { primary: "#FFE600", secondary: "#000000" }, aliases: ["FK Bodø/Glimt", "Bodo/Glimt"] },
  { id: "napoli", name: "Naples", shortName: "Naples", country: "Italie", colors: { primary: "#12A0D7", secondary: "#FFFFFF" }, fdId: 113, aliases: ["Napoli", "SSC Napoli"] },
  { id: "leipzig", name: "RB Leipzig", shortName: "Leipzig", country: "Allemagne", colors: { primary: "#DD0741", secondary: "#FFFFFF" }, fdId: 721 },
  { id: "villarreal", name: "Villarreal", shortName: "Villarreal", country: "Espagne", colors: { primary: "#FFE667", secondary: "#005187" }, fdId: 94, aliases: ["Villarreal CF"] },
  { id: "fenerbahce", name: "Fenerbahçe", shortName: "Fenerbahçe", country: "Turquie", colors: { primary: "#003C80", secondary: "#FFED00" }, aliases: ["Fenerbahce SK", "Fenerbahçe SK"] },
  { id: "shakhtar", name: "Chakhtar Donetsk", shortName: "Chakhtar", country: "Ukraine", colors: { primary: "#F26522", secondary: "#000000" }, aliases: ["Shakhtar Donetsk", "FC Shakhtar Donetsk"] },
  { id: "galatasaray", name: "Galatasaray", shortName: "Galatasaray", country: "Turquie", colors: { primary: "#A90432", secondary: "#FDB912" }, fdId: 610, aliases: ["Galatasaray SK"] },

  // Chapeau 4
  { id: "slavia", name: "Slavia Prague", shortName: "Slavia", country: "Tchéquie", colors: { primary: "#E2001A", secondary: "#FFFFFF" }, aliases: ["SK Slavia Praha", "Slavia Praha"] },
  { id: "slovan", name: "Slovan Bratislava", shortName: "Slovan", country: "Slovaquie", colors: { primary: "#0075BF", secondary: "#FFFFFF" }, aliases: ["ŠK Slovan Bratislava"] },
  { id: "stuttgart", name: "VfB Stuttgart", shortName: "Stuttgart", country: "Allemagne", colors: { primary: "#E32219", secondary: "#FFFFFF" }, fdId: 10 },
  { id: "aek", name: "AEK Athènes", shortName: "AEK", country: "Grèce", colors: { primary: "#FFDD00", secondary: "#000000" }, aliases: ["AEK Athens", "AEK Athens FC"] },
  { id: "lask", name: "LASK", shortName: "LASK", country: "Autriche", colors: { primary: "#000000", secondary: "#FFFFFF" }, aliases: ["LASK Linz"] },
  { id: "como", name: "Côme", shortName: "Côme", country: "Italie", colors: { primary: "#0055A4", secondary: "#FFFFFF" }, aliases: ["Como", "Como 1907"] },
  { id: "lens", name: "RC Lens", shortName: "Lens", country: "France", colors: { primary: "#FFE500", secondary: "#E30613" }, fdId: 546, aliases: ["Racing Club de Lens", "Lens"] },
  { id: "viking", name: "Viking", shortName: "Viking", country: "Norvège", colors: { primary: "#002F6C", secondary: "#FFFFFF" }, aliases: ["Viking FK"] },
  { id: "sabah", name: "Sabah", shortName: "Sabah", country: "Azerbaïdjan", colors: { primary: "#F58220", secondary: "#1A1A1A" }, aliases: ["Sabah FK", "Sabah FC"] },
];

const BY_ID = new Map(CLUBS.map((c) => [c.id, c]));

export function getClub(id: string | null | undefined): Club | undefined {
  return id ? BY_ID.get(id) : undefined;
}

export function clubName(id: string): string {
  return BY_ID.get(id)?.name ?? id;
}