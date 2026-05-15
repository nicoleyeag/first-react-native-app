export type Card = {
  id: string;
  name: string;
  setCode: string;
  collectorNumber: string;
  manaCost: string;
  manaValue: number;
  colors: string[];
  colorIdentity: string[];
  typeLine: string;
  oracleText?: string;
  rarity?: string;
  imageUrl?: string;
};
