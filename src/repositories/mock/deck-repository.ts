import { mockDeckCards } from "@/src/data/mock/deck-cards";
import { mockDecks } from "@/src/data/mock/decks";
import type { Deck, DeckCard } from "@/src/models/deck";

let deckState = mockDecks.map((deck) => ({ ...deck }));
let deckCardState = mockDeckCards.map((card) => ({ ...card }));

export async function getAllDecks(): Promise<Deck[]> {
  return deckState.map((deck) => ({ ...deck }));
}

export async function getDeckCardsByDeckId(deckId: string): Promise<DeckCard[]> {
  return deckCardState.filter((entry) => entry.deckId === deckId).map((entry) => ({ ...entry }));
}
