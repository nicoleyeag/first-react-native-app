import type { CollectionCard } from "@/src/models/collection";

export const mockCollectionCards: CollectionCard[] = [
  {
    id: "collection-1",
    cardId: "llanowar-elves",
    quantity: 4,
    finish: "normal",
    condition: "near_mint",
    addedAt: "2026-05-10T10:00:00.000Z",
  },
  {
    id: "collection-2",
    cardId: "lightning-bolt",
    quantity: 3,
    finish: "normal",
    condition: "light_played",
    addedAt: "2026-05-11T09:00:00.000Z",
  },
  {
    id: "collection-3",
    cardId: "sol-ring",
    quantity: 1,
    finish: "foil",
    condition: "mint",
    addedAt: "2026-05-12T08:30:00.000Z",
  },
  {
    id: "collection-4",
    cardId: "cultivate",
    quantity: 2,
    finish: "normal",
    condition: "near_mint",
    addedAt: "2026-05-13T14:45:00.000Z",
  },
];
