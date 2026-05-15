import {
  addCollectionCard,
  getAllCollectionCards,
  updateCollectionQuantity as updateCollectionQuantityInRepository,
} from "@/src/repositories/mock/collection-repository";
import { getCardById } from "@/src/repositories/mock/card-repository";
import type { CollectionCardView } from "@/src/models/view-models";

export async function getCollectionCards(): Promise<CollectionCardView[]> {
  const collectionEntries = await getAllCollectionCards();

  const cards = await Promise.all(
    collectionEntries.map(async (entry) => {
      const card = await getCardById(entry.cardId);

      if (!card) {
        return null;
      }

      return {
        collectionId: entry.id,
        cardId: entry.cardId,
        name: card.name,
        manaCost: card.manaCost,
        manaValue: card.manaValue,
        typeLine: card.typeLine,
        setCode: card.setCode,
        quantity: entry.quantity,
        finish: entry.finish,
        condition: entry.condition,
      } satisfies CollectionCardView;
    }),
  );

  return cards.filter((card): card is CollectionCardView => card !== null);
}

export async function addCardToCollection(cardId: string, quantity = 1): Promise<void> {
  await addCollectionCard(cardId, quantity);
}

export async function updateCollectionQuantity(collectionId: string, quantity: number): Promise<void> {
  await updateCollectionQuantityInRepository(collectionId, quantity);
}
