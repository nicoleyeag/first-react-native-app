import { StyleSheet, Text, View } from "react-native";

import { SectionCard } from "@/src/components/common/SectionCard";
import { appTheme } from "@/src/theme/app-theme";

type StatCardProps = {
  label: string;
  value: string | number;
  variant?: "default" | "compact";
};

export function StatCard({ label, value, variant = "default" }: StatCardProps) {
  const isCompact = variant === "compact";

  return (
    <View style={[styles.wrapper, isCompact ? styles.wrapperCompact : null]}>
      <SectionCard style={isCompact ? styles.cardCompact : null}>
        <Text style={[styles.value, isCompact ? styles.valueCompact : null]}>{value}</Text>
        <Text style={[styles.label, isCompact ? styles.labelCompact : null]}>{label}</Text>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 100,
  },
  wrapperCompact: {
    minWidth: 98,
  },
  cardCompact: {
    minHeight: 72,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  value: {
    color: appTheme.colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  valueCompact: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  label: {
    color: appTheme.colors.textMuted,
    fontSize: 14,
  },
  labelCompact: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
