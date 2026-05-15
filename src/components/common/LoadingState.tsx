import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={appTheme.colors.primary} size="small" />
      <Text style={styles.label}>{label}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    gap: appTheme.spacing.sm,
  },
  label: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
  },
});
