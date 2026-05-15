import { StyleSheet, Text, View } from "react-native";

import { Pill } from "@/src/components/common/Pill";
import { PrimaryButton } from "@/src/components/common/PrimaryButton";
import { SectionCard } from "@/src/components/common/SectionCard";
import type { Card } from "@/src/models/card";
import { appTheme } from "@/src/theme/app-theme";

type ScanResultCardProps = {
  card: Card;
  onAddToCollection: () => void;
  isSaving?: boolean;
};

export function ScanResultCard({
  card,
  onAddToCollection,
  isSaving = false,
}: ScanResultCardProps) {
  return (
    <SectionCard>
      <Pill label="Mock scan result" tone="accent" />
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.typeLine}>{card.typeLine}</Text>

      <View style={styles.metaRow}>
        <Pill label={card.setCode} />
        <Pill label={card.manaCost || "No Cost"} />
        <Pill label={`MV ${card.manaValue}`} tone="success" />
      </View>

      {card.oracleText ? <Text style={styles.oracleText}>{card.oracleText}</Text> : null}

      <PrimaryButton
        disabled={isSaving}
        label={isSaving ? "Adding..." : "Add To Collection"}
        onPress={onAddToCollection}
      />
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  title: {
    color: appTheme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  typeLine: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.xs,
  },
  oracleText: {
    color: appTheme.colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
});
