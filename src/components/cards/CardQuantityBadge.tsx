import { StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type CardQuantityBadgeProps = {
  quantity: number;
};

export function CardQuantityBadge({ quantity }: CardQuantityBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>x{quantity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: appTheme.radius.pill,
    backgroundColor: appTheme.colors.primarySoft,
  },
  label: {
    color: appTheme.colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
});
