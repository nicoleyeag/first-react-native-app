import { StyleSheet, Text, View } from "react-native";

import { Pill } from "@/src/components/common/Pill";
import { SectionCard } from "@/src/components/common/SectionCard";
import type { DeckSummaryView } from "@/src/models/view-models";
import { appTheme } from "@/src/theme/app-theme";

type DeckListItemProps = {
  deck: DeckSummaryView;
};

export function DeckListItem({ deck }: DeckListItemProps) {
  return (
    <SectionCard>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.name}>{deck.name}</Text>
          <Text style={styles.description}>{deck.description}</Text>
        </View>
        <Pill label={deck.format} tone="accent" />
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.stat}>Total: {deck.totalCards}</Text>
        <Text style={styles.stat}>Main: {deck.mainboardCount}</Text>
        <Text style={styles.stat}>Side: {deck.sideboardCount}</Text>
      </View>

      <Text style={styles.previewLabel}>Featured cards</Text>
      <View style={styles.previewRow}>
        {deck.featuredCards.map((cardName) => (
          <Pill key={`${deck.id}-${cardName}`} label={cardName} />
        ))}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: appTheme.spacing.md,
    alignItems: "flex-start",
  },
  titleBlock: {
    flex: 1,
    gap: appTheme.spacing.xs,
  },
  name: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  description: {
    color: appTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.sm,
  },
  stat: {
    color: appTheme.colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  previewLabel: {
    color: appTheme.colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.xs,
  },
});
