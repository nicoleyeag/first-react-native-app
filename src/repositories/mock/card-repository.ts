import { mockCards } from "@/src/data/mock/cards";
import type { Card } from "@/src/models/card";

let scanIndex = 0;

export async function getAllCards(): Promise<Card[]> {
  return [...mockCards];
}

export async function getCardById(cardId: string): Promise<Card | null> {
  return mockCards.find((card) => card.id === cardId) ?? null;
}

export async function searchCards(query: string): Promise<Card[]> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [...mockCards];
  }

  return mockCards.filter((card) => {
    return (
      card.name.toLowerCase().includes(normalizedQuery) ||
      card.typeLine.toLowerCase().includes(normalizedQuery) ||
      card.setCode.toLowerCase().includes(normalizedQuery)
    );
  });
}

export async function getNextMockScanCard(): Promise<Card> {
  const nextCard = mockCards[scanIndex % mockCards.length];
  scanIndex += 1;
  return nextCard;
}
