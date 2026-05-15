import { mockCollectionCards } from "@/src/data/mock/collection";
import type { CollectionCard } from "@/src/models/collection";

let collectionState = mockCollectionCards.map((entry) => ({ ...entry }));

export async function getAllCollectionCards(): Promise<CollectionCard[]> {
  return collectionState.map((entry) => ({ ...entry }));
}

export async function addCollectionCard(cardId: string, quantity: number): Promise<void> {
  const existingEntry = collectionState.find((entry) => entry.cardId === cardId);

  if (existingEntry) {
    existingEntry.quantity += quantity;
    existingEntry.addedAt = new Date().toISOString();
    return;
  }

  collectionState = [
    {
      id: `collection-${Date.now()}`,
      cardId,
      quantity,
      finish: "normal",
      condition: "near_mint",
      addedAt: new Date().toISOString(),
    },
    ...collectionState,
  ];
}

export async function updateCollectionQuantity(collectionId: string, quantity: number): Promise<void> {
  collectionState = collectionState.map((entry) =>
    entry.id === collectionId ? { ...entry, quantity: Math.max(1, quantity) } : entry,
  );
}
