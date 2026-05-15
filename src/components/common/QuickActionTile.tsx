import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type QuickActionTileProps = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
  accent?: boolean;
};

export function QuickActionTile({
  label,
  icon,
  onPress,
  accent = false,
}: QuickActionTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        accent ? styles.accent : null,
        pressed ? styles.pressed : null,
      ]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 130,
    borderRadius: appTheme.radius.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: appTheme.spacing.md,
    paddingHorizontal: appTheme.spacing.md,
    paddingVertical: appTheme.spacing.lg,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  accent: {
    backgroundColor: appTheme.colors.surfaceAccent,
    shadowColor: appTheme.colors.accent,
    shadowOpacity: 0.2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: appTheme.colors.text,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
