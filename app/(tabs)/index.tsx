import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CardListItem } from "@/src/components/cards/CardListItem";
import { LoadingState } from "@/src/components/common/LoadingState";
import { QuickActionTile } from "@/src/components/common/QuickActionTile";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { StatCard } from "@/src/components/common/StatCard";
import { DeckListItem } from "@/src/components/decks/DeckListItem";
import type { HomeSummary } from "@/src/models/view-models";
import { getHomeSummary } from "@/src/services/home-service";
import { appTheme } from "@/src/theme/app-theme";

export default function HomeScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<HomeSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSummary = useCallback(async () => {
    setIsLoading(true);
    const nextSummary = await getHomeSummary();
    setSummary(nextSummary);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadSummary();
    }, [loadSummary]),
  );

  const quickActions = [
    {
      key: "scanner",
      label: "Scan Cards",
      icon: "scan-outline" as const,
      onPress: () => router.navigate("/scanner"),
    },
    {
      key: "collection",
      label: "My Collection",
      icon: "albums-outline" as const,
      onPress: () => router.navigate("/collection"),
    },
    {
      key: "decks",
      label: "My Decks",
      icon: "library-outline" as const,
      onPress: () => router.navigate("/decks"),
    },
    {
      key: "assistant",
      label: "AI Assistant",
      icon: "sparkles-outline" as const,
      accent: true,
      onPress: () => router.navigate("/assistant"),
    },
    {
      key: "import",
      label: "Import",
      icon: "download-outline" as const,
      onPress: () => undefined,
    },
  ];

  return (
    <ScreenContainer
      contentContainerStyle={styles.content}
      header={
        <View style={styles.headerBlock}>
          <View style={styles.headerRow}>
            <View style={styles.greetingBlock}>
              <Text style={styles.greeting}>Hey Nicole 👋</Text>
            </View>
            <View style={styles.profileButton}>
              <Ionicons color={appTheme.colors.background} name="person-outline" size={24} />
            </View>
          </View>
          <Text style={styles.subtitle}>Ready to optimize your next deck?</Text>
        </View>
      }>
      {isLoading || !summary ? (
        <LoadingState label="Loading your dashboard..." />
      ) : (
        <>
          <View style={styles.statsRow}>
            <StatCard label="Cards" value={summary.totalOwnedCards} variant="compact" />
            <StatCard label="Decks" value={summary.totalDecks} variant="compact" />
            <StatCard label="Unique" value={summary.uniqueCollectionCards} variant="compact" />
          </View>

          <View style={styles.quickActionsBlock}>
            <View style={styles.quickActionsHeader}>
              <Ionicons color="#FCD34D" name="flash" size={14} />
              <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            </View>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <View key={action.label} style={styles.quickActionWrapper}>
                  <QuickActionTile
                    accent={action.accent}
                    icon={<Ionicons color={appTheme.colors.text} name={action.icon} size={44} />}
                    label={action.label}
                    onPress={action.onPress}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.sectionBlock, styles.lowerSectionStart]}>
            <Text style={styles.sectionTitle}>Recent Collection</Text>
            {summary.recentCollectionCards.map((card) => (
              <CardListItem card={card} key={card.collectionId} />
            ))}
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Featured Decks</Text>
            {summary.featuredDecks.map((deck) => (
              <DeckListItem deck={deck} key={deck.id} />
            ))}
          </View>
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: appTheme.spacing.lg,
    paddingHorizontal: appTheme.spacing.md,
    paddingBottom: appTheme.spacing.xl,
  },
  headerBlock: {
    gap: appTheme.spacing.lg,
    paddingTop: appTheme.spacing.xs,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  greetingBlock: {
    flex: 1,
    paddingTop: appTheme.spacing.lg,
  },
  greeting: {
    color: appTheme.colors.text,
    fontSize: 33,
    fontWeight: "500",
    lineHeight: 40,
  },
  profileButton: {
    width: 46,
    height: 46,
    borderRadius: appTheme.radius.pill,
    backgroundColor: appTheme.colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: appTheme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  quickActionsBlock: {
    gap: appTheme.spacing.md,
  },
  quickActionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.sm,
  },
  quickActionsTitle: {
    color: appTheme.colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  quickActionWrapper: {
    width: "48%",
  },
  lowerSectionStart: {
    marginTop: appTheme.spacing.xs,
  },
  sectionBlock: {
    gap: appTheme.spacing.sm,
  },
  sectionTitle: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
});
