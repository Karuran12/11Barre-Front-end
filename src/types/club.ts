export type Club = {
    
  // Identifiant unique du club
  
  id: string;
  name: string;
  shortName: string; 
  country: string;
  city?: string;
  colors: {
    primary: string;
    secondary: string; 
  };
  fdId?: number; 
  aliases?: string[]; 
};