import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { EmptyState } from "@/src/components/common/EmptyState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { Pill } from "@/src/components/common/Pill";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { SectionCard } from "@/src/components/common/SectionCard";
import { DeckListItem } from "@/src/components/decks/DeckListItem";
import type { DeckSummaryView } from "@/src/models/view-models";
import { getDeckSummaries } from "@/src/services/deck-service";
import { appTheme } from "@/src/theme/app-theme";

export default function DecksScreen() {
  const [decks, setDecks] = useState<DeckSummaryView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDecks = useCallback(async () => {
    setIsLoading(true);
    const nextDecks = await getDeckSummaries();
    setDecks(nextDecks);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadDecks();
    }, [loadDecks]),
  );

  const totalCardsAcrossDecks = useMemo(
    () => decks.reduce((total, deck) => total + deck.totalCards, 0),
    [decks],
  );

  return (
    <ScreenContainer
      subtitle="This basic deck hub shows mock deck summaries and leaves room for detail screens later."
      title="Decks">
      <SectionCard>
        <Text style={styles.title}>Deck Overview</Text>
        <View style={styles.summaryRow}>
          <Pill label={`${decks.length} decks`} />
          <Pill label={`${totalCardsAcrossDecks} cards tracked`} tone="accent" />
        </View>
        <Text style={styles.description}>
          Create-deck flows, validation, and deck detail editing can plug into the same services later.
        </Text>
      </SectionCard>

      {isLoading ? <LoadingState label="Loading deck summaries..." /> : null}

      {!isLoading && decks.length === 0 ? (
        <EmptyState
          description="Seeded decks will appear here while the deck builder is still mocked."
          title="No decks yet"
        />
      ) : null}

      {!isLoading && decks.map((deck) => <DeckListItem deck={deck} key={deck.id} />)}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.xs,
  },
  description: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
