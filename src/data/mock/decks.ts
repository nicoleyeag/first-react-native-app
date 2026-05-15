import type { Deck } from "@/src/models/deck";

export const mockDecks: Deck[] = [
  {
    id: "deck-1",
    name: "Mono Green Ramp",
    format: "casual",
    description: "Simple ramp shell with mana dorks and big finishes.",
    createdAt: "2026-05-08T12:00:00.000Z",
    updatedAt: "2026-05-14T14:00:00.000Z",
  },
  {
    id: "deck-2",
    name: "Azorius Control",
    format: "modern",
    description: "Counterspells, removal, and steady card advantage.",
    createdAt: "2026-05-09T15:00:00.000Z",
    updatedAt: "2026-05-13T18:00:00.000Z",
  },
  {
    id: "deck-3",
    name: "Atraxa Value",
    format: "commander",
    description: "A splashy commander deck with ramp and late-game power.",
    createdAt: "2026-05-10T17:30:00.000Z",
    updatedAt: "2026-05-14T10:30:00.000Z",
  },
];
