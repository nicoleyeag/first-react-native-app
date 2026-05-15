# MTG Collection App MVP Spec

## Goal
Build a beginner-friendly React Native app with Expo that helps a user scan Magic: The Gathering cards, save them to a personal collection, and build decks from saved cards.

The MVP should prove the app structure, screen flow, and data boundaries without requiring a real card-scanning backend or database yet.

## Tech Direction
- React Native with Expo
- Expo Router for navigation
- TypeScript
- Mock data first
- Service layer between screens and data
- SQLite-ready structure later without rebuilding screens

## Core MVP Features

### 1. Scan Card Flow
The MVP version of scanning should be simple:
- User opens a Scan screen
- User taps a mock "Scan Card" action
- App returns a mock MTG card result
- User can review that result and add it to collection

This keeps the screen flow realistic while avoiding camera, OCR, and API complexity in the first version.

### 2. Collection Flow
- User can view saved collection cards
- User can see card name, mana cost, type, set, and quantity
- User can add a scanned card to collection
- User can increment quantity if the card already exists

### 3. Deck Flow
- User can view saved decks
- User can create a deck with a name and format
- User can open a deck and add cards from collection
- User can see deck card quantities

## Out Of Scope For MVP
- Real camera scanning
- OCR or image recognition
- Online MTG card API integration
- User authentication
- Cloud sync
- Pricing/history
- AI analysis features
- Advanced deck validation rules
- Commander/color identity enforcement

## Future-Ready Requirements
The MVP architecture should support these upgrades later:
- Replace mock data with SQLite storage
- Add real scan pipeline
- Add AI deck analysis for mana curve, mana base, and suggestions
- Add search/filter/sort
- Add card details and deck statistics

## Product Principles
- Keep screens simple
- Keep business logic out of UI components
- Never hardcode card data inside screen files
- Keep collection and deck logic separate
- Prefer small reusable service functions
- Make service APIs async now so storage can change later with minimal screen changes

## Recommended User Flow

### Flow A: Add Card To Collection
1. User opens `Scan`
2. User runs mock scan
3. User sees scanned card result
4. User taps `Add to Collection`
5. App saves the card through `addCardToCollection()`
6. User sees it on `Collection`

### Flow B: Build Deck
1. User opens `Decks`
2. User creates a deck
3. User opens the deck detail screen
4. User browses collection cards available to add
5. User adds a card through `addCardToDeck()`
6. User sees updated deck list

## MVP Screens
- `Collection`: list of saved cards
- `Scan`: mock scan entry point and result preview
- `Decks`: list of decks
- `Deck Detail`: cards inside one deck, plus add-from-collection flow
- `Create Deck` modal or simple screen

## Suggested Milestones

### Milestone 1
- Define types
- Add mock data files
- Add collection and deck services
- Build basic tab navigation

### Milestone 2
- Build scan screen with mock scan result
- Add save-to-collection flow
- Build collection list screen

### Milestone 3
- Build deck list screen
- Build create deck flow
- Build add-card-to-deck flow

### Milestone 4
- Swap mock repository with SQLite-backed repository
- Keep screen contracts unchanged

## Success Criteria
The MVP is successful if:
- A mock scanned card can be added to collection
- Collection cards can be listed without hardcoded screen data
- Decks can be created and viewed
- Collection cards can be added to decks
- Replacing mock data with SQLite only requires service/repository changes, not screen rewrites
