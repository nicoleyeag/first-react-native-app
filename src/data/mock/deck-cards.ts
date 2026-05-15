import type { DeckCard } from "@/src/models/deck";

export const mockDeckCards: DeckCard[] = [
  {
    id: "deck-card-1",
    deckId: "deck-1",
    cardId: "llanowar-elves",
    quantity: 4,
    section: "mainboard",
  },
  {
    id: "deck-card-2",
    deckId: "deck-1",
    cardId: "cultivate",
    quantity: 3,
    section: "mainboard",
  },
  {
    id: "deck-card-3",
    deckId: "deck-2",
    cardId: "counterspell",
    quantity: 4,
    section: "mainboard",
  },
  {
    id: "deck-card-4",
    deckId: "deck-2",
    cardId: "swords-to-plowshares",
    quantity: 2,
    section: "sideboard",
  },
  {
    id: "deck-card-5",
    deckId: "deck-3",
    cardId: "atrixa-grand-unifier",
    quantity: 1,
    section: "mainboard",
  },
  {
    id: "deck-card-6",
    deckId: "deck-3",
    cardId: "arcane-signet",
    quantity: 1,
    section: "mainboard",
  },
  {
    id: "deck-card-7",
    deckId: "deck-3",
    cardId: "cultivate",
    quantity: 1,
    section: "mainboard",
  },
];
