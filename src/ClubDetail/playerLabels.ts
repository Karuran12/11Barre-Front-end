const POSITIONS: Record<string, string> = {
    goalkeeper: "Gardien",
    defence: "Défenseur",
    defender: "Défenseur",
    "centre-back": "Défenseur central",
    "left-back": "Latéral gauche",
    "right-back": "Latéral droit",
    midfield: "Milieu",
    midfielder: "Milieu",
    "defensive midfield": "Milieu défensif",
    "central midfield": "Milieu central",
    "attacking midfield": "Milieu offensif",
    "left midfield": "Milieu gauche",
    "right midfield": "Milieu droit",
    offence: "Attaquant",
    attacker: "Attaquant",
    forward: "Attaquant",
    "centre-forward": "Avant-centre",
    "left winger": "Ailier gauche",
    "right winger": "Ailier droit",
  };
  
  export function positionLabel(position: string | null | undefined): string | undefined {
    if (!position) return undefined;
    return POSITIONS[position.toLowerCase()] ?? position;
  }
  
  const COUNTRIES: Record<string, string> = {
    Albania: "Albanie", Algeria: "Algérie", Argentina: "Argentine", Australia: "Australie", Austria: "Autriche",
    Belgium: "Belgique", "Bosnia-Herzegovina": "Bosnie-Herzégovine", Brazil: "Brésil", Bulgaria: "Bulgarie",
    Cameroon: "Cameroun", Canada: "Canada", Chile: "Chili", Colombia: "Colombie", Croatia: "Croatie",
    "Czech Republic": "Tchéquie", Czechia: "Tchéquie", Denmark: "Danemark", Ecuador: "Équateur", Egypt: "Égypte",
    England: "Angleterre", Finland: "Finlande", France: "France", Georgia: "Géorgie", Germany: "Allemagne",
    Ghana: "Ghana", Greece: "Grèce", Hungary: "Hongrie", Iceland: "Islande", Ireland: "Irlande",
    "Republic of Ireland": "Irlande", Israel: "Israël", Italy: "Italie", "Ivory Coast": "Côte d'Ivoire",
    "Côte d’Ivoire": "Côte d'Ivoire", Jamaica: "Jamaïque", Japan: "Japon", "Korea Republic": "Corée du Sud",
    "South Korea": "Corée du Sud", Kosovo: "Kosovo", Mali: "Mali", Mexico: "Mexique", Morocco: "Maroc",
    Netherlands: "Pays-Bas", Nigeria: "Nigeria", "North Macedonia": "Macédoine du Nord",
    "Northern Ireland": "Irlande du Nord", Norway: "Norvège", Paraguay: "Paraguay", Peru: "Pérou",
    Poland: "Pologne", Portugal: "Portugal", Romania: "Roumanie", Russia: "Russie", Scotland: "Écosse",
    Senegal: "Sénégal", Serbia: "Serbie", Slovakia: "Slovaquie", Slovenia: "Slovénie", Spain: "Espagne",
    Sweden: "Suède", Switzerland: "Suisse", Tunisia: "Tunisie", Turkey: "Turquie", "Türkiye": "Turquie",
    Ukraine: "Ukraine", "United States": "États-Unis", USA: "États-Unis", Uruguay: "Uruguay",
    Venezuela: "Venezuela", Wales: "Pays de Galles", Azerbaijan: "Azerbaïdjan", Montenegro: "Monténégro",
    Guinea: "Guinée", "DR Congo": "RD Congo", "Congo DR": "RD Congo", "Cape Verde Islands": "Cap-Vert",
    "Cape Verde": "Cap-Vert", Gabon: "Gabon", "Burkina Faso": "Burkina Faso", Zambia: "Zambie",
    Armenia: "Arménie", Cyprus: "Chypre", Luxembourg: "Luxembourg", Suriname: "Suriname", Curacao: "Curaçao",
  };
  
  export function countryLabel(country: string | null | undefined): string | undefined {
    if (!country) return undefined;
    return COUNTRIES[country] ?? country;
  }
  
  export function ageFrom(dateOfBirth: string | null | undefined): number | undefined {
    if (!dateOfBirth) return undefined;
    const birth = new Date(dateOfBirth);
    if (Number.isNaN(birth.getTime())) return undefined;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const beforeBirthday =
      now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
    if (beforeBirthday) age -= 1;
    return age;
  }
  
  export function playerInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    const first = words[0]?.[0] ?? "";
    const last = words.length > 1 ? words[words.length - 1][0] : "";
    return (first + last).toUpperCase();
  }