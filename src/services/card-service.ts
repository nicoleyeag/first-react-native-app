import {
  getCardById as getCardByIdFromRepository,
  getNextMockScanCard,
  searchCards as searchCardsInRepository,
} from "@/src/repositories/mock/card-repository";

export async function scanMockCard() {
  return getNextMockScanCard();
}

export async function getCardById(cardId: string) {
  return getCardByIdFromRepository(cardId);
}

export async function searchCards(query: string) {
  return searchCardsInRepository(query);
}
