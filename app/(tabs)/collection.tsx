import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CardListItem } from "@/src/components/cards/CardListItem";
import { EmptyState } from "@/src/components/common/EmptyState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { Pill } from "@/src/components/common/Pill";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { SectionCard } from "@/src/components/common/SectionCard";
import type { CollectionCardView } from "@/src/models/view-models";
import { addCardToCollection, getCollectionCards } from "@/src/services/collection-service";
import { appTheme } from "@/src/theme/app-theme";

export default function CollectionScreen() {
  const [cards, setCards] = useState<CollectionCardView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCollection = useCallback(async () => {
    setIsLoading(true);
    const nextCards = await getCollectionCards();
    setCards(nextCards);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadCollection();
    }, [loadCollection]),
  );

  async function handleIncrease(card: CollectionCardView) {
    await addCardToCollection(card.cardId, 1);
    await loadCollection();
  }

  const totalOwnedCards = cards.reduce((total, card) => total + card.quantity, 0);

  return (
    <ScreenContainer
      subtitle="Your collection view reads from async services instead of hardcoded screen data."
      title="Collection">
      <SectionCard>
        <Text style={styles.summaryTitle}>Collection Snapshot</Text>
        <View style={styles.summaryRow}>
          <Pill label={`${cards.length} unique`} />
          <Pill label={`${totalOwnedCards} total copies`} tone="accent" />
        </View>
      </SectionCard>

      {isLoading ? <LoadingState label="Loading collection..." /> : null}

      {!isLoading && cards.length === 0 ? (
        <EmptyState
          description="Run a mock scan to seed your collection UI and verify the screen flow."
          title="No cards yet"
        />
      ) : null}

      {!isLoading &&
        cards.map((card) => (
          <CardListItem card={card} key={card.collectionId} onIncrease={handleIncrease} />
        ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summaryTitle: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.xs,
  },
});
