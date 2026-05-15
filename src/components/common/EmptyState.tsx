import { StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.colors.surface,
    borderRadius: appTheme.radius.lg,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: appTheme.spacing.lg,
    gap: appTheme.spacing.xs,
  },
  title: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
