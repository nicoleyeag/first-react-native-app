export type CollectionCard = {
  id: string;
  cardId: string;
  quantity: number;
  finish?: "normal" | "foil";
  condition?: "mint" | "near_mint" | "light_played" | "moderately_played";
  addedAt: string;
};
