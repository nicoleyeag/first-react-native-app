import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type ScannerPermissionGateProps = {
  isLoading: boolean;
  isGranted: boolean;
  canAskAgain: boolean;
  onRequestPermission: () => void;
  onOpenSettings: () => void;
};

export function ScannerPermissionGate({
  isLoading,
  isGranted,
  canAskAgain,
  onRequestPermission,
  onOpenSettings,
}: ScannerPermissionGateProps) {
  if (isGranted) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={appTheme.colors.primary} size="large" />
        <Text style={styles.muted}>Checking camera access…</Text>
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <View style={styles.iconWrap}>
        <Ionicons color={appTheme.colors.text} name="camera-outline" size={40} />
      </View>
      <Text style={styles.title}>Camera access</Text>
      <Text style={styles.body}>
        Allow camera access to frame your cards and capture scans. Recognition will come later.
      </Text>
      {canAskAgain ? (
        <Pressable onPress={onRequestPermission} style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
          <Text style={styles.primaryLabel}>Continue</Text>
        </Pressable>
      ) : (
        <Pressable onPress={onOpenSettings} style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
          <Text style={styles.primaryLabel}>Open settings</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: appTheme.spacing.lg,
    gap: appTheme.spacing.md,
    backgroundColor: appTheme.colors.surfaceMuted,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: appTheme.radius.pill,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appTheme.colors.surface,
  },
  title: {
    color: appTheme.colors.text,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  body: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  muted: {
    marginTop: appTheme.spacing.sm,
    color: appTheme.colors.textMuted,
    fontSize: 15,
  },
  primaryBtn: {
    marginTop: appTheme.spacing.sm,
    minHeight: 48,
    paddingHorizontal: appTheme.spacing.xl,
    borderRadius: appTheme.radius.md,
    backgroundColor: appTheme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.88,
  },
  primaryLabel: {
    color: appTheme.colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
});
