# Data Model And Service Plan

## Design Goals
- Keep card/deck data separate from UI components
- Start with mock data
- Make SQLite migration easy later
- Keep the model understandable for a beginner

## Recommended Domain Types

### `Card`
Represents one MTG card definition from a catalog.

```ts
export type Card = {
  id: string;
  name: string;
  setCode: string;
  collectorNumber: string;
  manaCost: string;
  manaValue: number;
  colors: string[];
  colorIdentity: string[];
  typeLine: string;
  oracleText?: string;
  rarity?: string;
  imageUrl?: string;
};
```

### `CollectionCard`
Represents a card the user owns in their collection.

```ts
export type CollectionCard = {
  id: string;
  cardId: string;
  quantity: number;
  finish?: "normal" | "foil";
  condition?: "mint" | "near_mint" | "light_played" | "moderately_played";
  addedAt: string;
};
```

### `Deck`
Represents a user-created deck.

```ts
export type Deck = {
  id: string;
  name: string;
  format: "standard" | "modern" | "commander" | "casual";
  description?: string;
  createdAt: string;
  updatedAt: string;
};
```

### `DeckCard`
Represents a card inside a deck.

```ts
export type DeckCard = {
  id: string;
  deckId: string;
  cardId: string;
  quantity: number;
  section: "mainboard" | "sideboard";
};
```

## Why Split The Models This Way
- `Card` is shared card reference data
- `CollectionCard` tracks ownership and quantity
- `Deck` tracks deck metadata
- `DeckCard` tracks which cards are used in each deck

This keeps deck state and collection state separate, which is important for future rules, analysis, and storage changes.

## Suggested View Models
Screens often need merged data for display. Instead of hardcoding joins in components, build them in services.

### `CollectionCardView`
```ts
export type CollectionCardView = {
  collectionId: string;
  cardId: string;
  name: string;
  manaCost: string;
  manaValue: number;
  typeLine: string;
  setCode: string;
  quantity: number;
  imageUrl?: string;
};
```

### `DeckCardView`
```ts
export type DeckCardView = {
  deckCardId: string;
  deckId: string;
  cardId: string;
  name: string;
  manaCost: string;
  manaValue: number;
  typeLine: string;
  quantity: number;
  section: "mainboard" | "sideboard";
};
```

## Service Function Contract
Use async service functions from day one, even when reading local mock arrays.

That keeps the screen API stable when you later swap in SQLite.

### Collection Services
```ts
getCollectionCards(): Promise<CollectionCardView[]>
addCardToCollection(cardId: string, quantity?: number): Promise<void>
removeCardFromCollection(collectionId: string): Promise<void>
updateCollectionQuantity(collectionId: string, quantity: number): Promise<void>
```

### Deck Services
```ts
getDecks(): Promise<Deck[]>
getDeckById(deckId: string): Promise<Deck | null>
createDeck(input: { name: string; format: Deck["format"] }): Promise<Deck>
getDeckCards(deckId: string): Promise<DeckCardView[]>
addCardToDeck(deckId: string, cardId: string, quantity?: number): Promise<void>
removeCardFromDeck(deckCardId: string): Promise<void>
updateDeckCardQuantity(deckCardId: string, quantity: number): Promise<void>
```

### Scan Services
```ts
scanMockCard(): Promise<Card>
getCardById(cardId: string): Promise<Card | null>
searchCards(query: string): Promise<Card[]>
```

## Storage Boundary
To stay SQLite-ready, separate services from the actual storage implementation.

### Recommended Layers
1. `models`: Type definitions only
2. `data/mock`: Mock arrays and seed data
3. `repositories`: Read/write storage adapters
4. `services`: App-facing business functions
5. `screens/components`: UI only

## Repository Pattern, Kept Simple
You do not need a complex architecture. A light abstraction is enough.

### Example
```ts
type CollectionRepository = {
  getAll(): Promise<CollectionCard[]>;
  add(cardId: string, quantity: number): Promise<void>;
  updateQuantity(collectionId: string, quantity: number): Promise<void>;
  remove(collectionId: string): Promise<void>;
};
```

The first implementation can use in-memory mock arrays. Later, a SQLite repository can implement the same contract.

## Suggested File Ownership
- `src/models/card.ts`: `Card`
- `src/models/collection.ts`: `CollectionCard`
- `src/models/deck.ts`: `Deck`, `DeckCard`
- `src/models/view-models.ts`: UI-ready merged types
- `src/data/mock/cards.ts`: card catalog seed data
- `src/data/mock/collection.ts`: collection seed data
- `src/data/mock/decks.ts`: deck seed data
- `src/repositories/mock/*.ts`: mock repository implementations
- `src/repositories/sqlite/*.ts`: future SQLite repository implementations
- `src/services/collection-service.ts`: collection business logic
- `src/services/deck-service.ts`: deck business logic
- `src/services/card-service.ts`: scan/search/card lookup logic

## SQLite Migration Strategy
When SQLite is added later:
- Keep screen components unchanged
- Keep service function names unchanged
- Replace mock repository imports with SQLite repository imports
- Preserve the same return types

That means `CollectionScreen` should still call `getCollectionCards()` and never care whether data came from mock arrays or SQLite.

## Important Rule
Do not store sample card objects directly inside screen components.

Bad:
```ts
const cards = [{ name: "Llanowar Elves" }];
```

Good:
```ts
const cards = await getCollectionCards();
```
