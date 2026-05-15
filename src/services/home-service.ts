import { getCollectionCards } from "@/src/services/collection-service";
import { getDeckSummaries } from "@/src/services/deck-service";
import type { HomeSummary } from "@/src/models/view-models";

export async function getHomeSummary(): Promise<HomeSummary> {
  const [collectionCards, deckSummaries] = await Promise.all([getCollectionCards(), getDeckSummaries()]);

  return {
    totalOwnedCards: collectionCards.reduce((total, entry) => total + entry.quantity, 0),
    uniqueCollectionCards: collectionCards.length,
    totalDecks: deckSummaries.length,
    recentCollectionCards: collectionCards.slice(0, 3),
    featuredDecks: deckSummaries.slice(0, 2),
  };
}
