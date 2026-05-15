export type Deck = {
  id: string;
  name: string;
  format: "standard" | "modern" | "commander" | "casual";
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type DeckCard = {
  id: string;
  deckId: string;
  cardId: string;
  quantity: number;
  section: "mainboard" | "sideboard";
};
