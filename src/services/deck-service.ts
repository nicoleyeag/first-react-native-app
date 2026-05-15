import { getCardById } from "@/src/repositories/mock/card-repository";
import { getAllDecks, getDeckCardsByDeckId } from "@/src/repositories/mock/deck-repository";
import type { DeckCardView, DeckSummaryView } from "@/src/models/view-models";

export async function getDeckSummaries(): Promise<DeckSummaryView[]> {
  const decks = await getAllDecks();

  return Promise.all(
    decks.map(async (deck) => {
      const deckCards = await getDeckCardsByDeckId(deck.id);
      const featuredCards = await Promise.all(
        deckCards.slice(0, 3).map(async (entry) => {
          const card = await getCardById(entry.cardId);
          return card?.name ?? "Unknown Card";
        }),
      );

      const mainboardCount = deckCards
        .filter((entry) => entry.section === "mainboard")
        .reduce((total, entry) => total + entry.quantity, 0);

      const sideboardCount = deckCards
        .filter((entry) => entry.section === "sideboard")
        .reduce((total, entry) => total + entry.quantity, 0);

      return {
        ...deck,
        mainboardCount,
        sideboardCount,
        totalCards: mainboardCount + sideboardCount,
        featuredCards,
      };
    }),
  );
}

export async function getDeckCards(deckId: string): Promise<DeckCardView[]> {
  const deckCards = await getDeckCardsByDeckId(deckId);

  const cards = await Promise.all(
    deckCards.map(async (entry) => {
      const card = await getCardById(entry.cardId);

      if (!card) {
        return null;
      }

      return {
        deckCardId: entry.id,
        deckId: entry.deckId,
        cardId: entry.cardId,
        name: card.name,
        manaCost: card.manaCost,
        manaValue: card.manaValue,
        typeLine: card.typeLine,
        quantity: entry.quantity,
        section: entry.section,
      } satisfies DeckCardView;
    }),
  );

  return cards.filter((card): card is DeckCardView => card !== null);
}
