import { StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type PillProps = {
  label: string;
  tone?: "default" | "accent" | "success";
};

export function Pill({ label, tone = "default" }: PillProps) {
  return (
    <View
      style={[
        styles.container,
        tone === "accent" ? styles.accent : null,
        tone === "success" ? styles.success : null,
      ]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderRadius: appTheme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: appTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
  },
  accent: {
    backgroundColor: appTheme.colors.primarySoft,
  },
  success: {
    backgroundColor: "#163527",
    borderColor: "#24553E",
  },
  label: {
    color: appTheme.colors.text,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
