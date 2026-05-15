import { Pressable, StyleSheet, Text, View } from "react-native";

import { CardQuantityBadge } from "@/src/components/cards/CardQuantityBadge";
import { Pill } from "@/src/components/common/Pill";
import { SectionCard } from "@/src/components/common/SectionCard";
import type { CollectionCardView } from "@/src/models/view-models";
import { appTheme } from "@/src/theme/app-theme";

type CardListItemProps = {
  card: CollectionCardView;
  onIncrease?: (card: CollectionCardView) => void;
};

export function CardListItem({ card, onIncrease }: CardListItemProps) {
  return (
    <SectionCard>
      <View style={styles.topRow}>
        <View style={styles.content}>
          <Text style={styles.name}>{card.name}</Text>
          <Text style={styles.typeLine}>{card.typeLine}</Text>
        </View>
        <CardQuantityBadge quantity={card.quantity} />
      </View>

      <View style={styles.metaRow}>
        <Pill label={card.setCode} />
        <Pill label={card.manaCost || "No Cost"} tone="accent" />
        {card.finish ? <Pill label={card.finish} tone="success" /> : null}
      </View>

      {onIncrease ? (
        <Pressable onPress={() => onIncrease(card)} style={styles.actionButton}>
          <Text style={styles.actionLabel}>Add one more copy</Text>
        </Pressable>
      ) : null}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.md,
  },
  content: {
    flex: 1,
    gap: appTheme.spacing.xs,
  },
  name: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  typeLine: {
    color: appTheme.colors.textMuted,
    fontSize: 14,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.xs,
  },
  actionButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },
  actionLabel: {
    color: appTheme.colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
