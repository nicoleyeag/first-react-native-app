# Component And File Structure Plan

## Guiding Rule
Expo Router screens should orchestrate data loading and user actions, but card data and deck logic should live in services, models, and repositories.

## Recommended Project Structure

```text
my-first-expo-app/
  app/
    _layout.tsx
    (tabs)/
      _layout.tsx
      collection.tsx
      scan.tsx
      decks.tsx
    deck/
      [deckId].tsx
    modals/
      create-deck.tsx

  src/
    components/
      cards/
        CardListItem.tsx
        CardQuantityBadge.tsx
        ScanResultCard.tsx
      decks/
        DeckListItem.tsx
        DeckCardListItem.tsx
        AddToDeckButton.tsx
      common/
        EmptyState.tsx
        LoadingState.tsx
        ScreenContainer.tsx

    models/
      card.ts
      collection.ts
      deck.ts
      view-models.ts

    data/
      mock/
        cards.ts
        collection.ts
        decks.ts
        deck-cards.ts

    repositories/
      mock/
        card-repository.ts
        collection-repository.ts
        deck-repository.ts
      sqlite/
        card-repository.ts
        collection-repository.ts
        deck-repository.ts

    services/
      card-service.ts
      collection-service.ts
      deck-service.ts

    hooks/
      useCollectionCards.ts
      useDecks.ts
      useDeckCards.ts

    utils/
      format-mana-cost.ts
      deck-stats.ts
```

## Why This Structure Works
- `app/` stays focused on routes and screens
- `src/components/` holds reusable UI pieces
- `src/models/` defines app data clearly
- `src/data/mock/` contains seed data only
- `src/repositories/` isolates storage details
- `src/services/` exposes simple app actions
- `src/hooks/` keeps screen code clean without mixing in storage logic

## Screen Plan

### `app/(tabs)/collection.tsx`
Purpose:
- Show collection cards from `getCollectionCards()`
- Render empty state when no cards exist
- Navigate later to card detail if needed

Screen responsibilities:
- Call a hook or service
- Show loading / empty / list states
- Handle refresh

Should not do:
- Hardcode card objects
- Join card data manually in JSX

### `app/(tabs)/scan.tsx`
Purpose:
- Trigger `scanMockCard()`
- Show a scan preview
- Add the result to collection through `addCardToCollection()`

MVP behavior:
- One button for mock scan
- One preview card
- One add-to-collection button

### `app/(tabs)/decks.tsx`
Purpose:
- Show deck list from `getDecks()`
- Open deck detail
- Open create deck modal

### `app/deck/[deckId].tsx`
Purpose:
- Show selected deck metadata
- Show deck cards from `getDeckCards(deckId)`
- Let user add a collection card into the deck

Keep this simple for MVP:
- Start with a basic "Add from Collection" list or button flow
- Full search/filter can come later

### `app/modals/create-deck.tsx`
Purpose:
- Let user enter name and choose format
- Submit through `createDeck()`

## Component Plan

### Reusable Card Components
- `CardListItem.tsx`: collection list row
- `ScanResultCard.tsx`: preview for scanned card
- `CardQuantityBadge.tsx`: small quantity display

These components should receive ready-to-render props, not fetch data directly.

### Reusable Deck Components
- `DeckListItem.tsx`: deck summary row
- `DeckCardListItem.tsx`: card row inside a deck
- `AddToDeckButton.tsx`: simple action button

### Shared Components
- `ScreenContainer.tsx`: consistent screen padding/layout
- `LoadingState.tsx`: reusable loading view
- `EmptyState.tsx`: reusable empty message block

## Service Usage In Screens

Each screen should depend on simple service functions like:

```ts
getCollectionCards()
addCardToCollection(cardId, quantity)
getDecks()
addCardToDeck(deckId, cardId, quantity)
```

This keeps screens stable if mock storage becomes SQLite later.

## Example Responsibility Split

### Screen
```ts
const cards = await getCollectionCards();
```

### Service
```ts
export async function getCollectionCards() {
  // Load collection rows
  // Join with card catalog
  // Return view models for UI
}
```

### Component
```ts
<CardListItem name={card.name} manaCost={card.manaCost} quantity={card.quantity} />
```

## Beginner-Friendly Implementation Order
1. Create models and mock data
2. Create mock repositories
3. Create services
4. Build collection screen
5. Build scan screen
6. Build decks screen
7. Build deck detail screen
8. Add hooks only where they reduce repeated screen logic

## Minimum Hook Plan
Hooks are optional, but helpful once multiple screens need loading state.

Recommended starter hooks:
- `useCollectionCards()`
- `useDecks()`
- `useDeckCards(deckId)`

Each hook should:
- call a service
- manage loading/error state
- return UI-ready data

## Architecture Rule To Protect
If a screen needs card data, it should ask a service or hook.

It should not import mock seed files directly.
