import type { Deck } from "@/src/models/deck";

export type CollectionCardView = {
  collectionId: string;
  cardId: string;
  name: string;
  manaCost: string;
  manaValue: number;
  typeLine: string;
  setCode: string;
  quantity: number;
  finish?: "normal" | "foil";
  condition?: "mint" | "near_mint" | "light_played" | "moderately_played";
};

export type DeckCardView = {
  deckCardId: string;
  deckId: string;
  cardId: string;
  name: string;
  manaCost: string;
  manaValue: number;
  typeLine: string;
  quantity: number;
  section: "mainboard" | "sideboard";
};

export type DeckSummaryView = Deck & {
  mainboardCount: number;
  sideboardCount: number;
  totalCards: number;
  featuredCards: string[];
};

export type HomeSummary = {
  totalOwnedCards: number;
  uniqueCollectionCards: number;
  totalDecks: number;
  recentCollectionCards: CollectionCardView[];
  featuredDecks: DeckSummaryView[];
};

export type AssistantPrompt = {
  id: string;
  title: string;
  body: string;
};

export type AssistantInsight = {
  id: string;
  title: string;
  description: string;
};
