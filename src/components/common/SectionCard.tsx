import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type SectionCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "accent";
}>;

export function SectionCard({ children, style, variant = "default" }: SectionCardProps) {
  return (
    <View style={[styles.card, variant === "accent" ? styles.cardAccent : null, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: appTheme.spacing.md,
    gap: appTheme.spacing.sm,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  cardAccent: {
    backgroundColor: appTheme.colors.surfaceAccent,
    shadowColor: appTheme.colors.accent,
    shadowOpacity: 0.16,
  },
});
