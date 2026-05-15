import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type ScannerCaptureBarProps = {
  torchOn: boolean;
  onToggleTorch: () => void;
  onCapture: () => void;
  onGalleryPress: () => void;
  isCapturing: boolean;
};

export function ScannerCaptureBar({
  torchOn,
  onToggleTorch,
  onCapture,
  onGalleryPress,
  isCapturing,
}: ScannerCaptureBarProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel={torchOn ? "Turn flash off" : "Turn flash on"}
        onPress={onToggleTorch}
        style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}>
        <Ionicons
          color={torchOn ? appTheme.colors.warning : appTheme.colors.text}
          name={torchOn ? "flash" : "flash-outline"}
          size={26}
        />
        <Text style={styles.sideLabel}>Flash</Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Capture scan"
        disabled={isCapturing}
        onPress={onCapture}
        style={({ pressed }) => [
          styles.shutterOuter,
          pressed && styles.pressed,
          isCapturing && styles.shutterDisabled,
        ]}>
        <View style={styles.shutterInner} />
      </Pressable>

      <Pressable
        accessibilityLabel="Import from gallery"
        onPress={onGalleryPress}
        style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}>
        <Ionicons color={appTheme.colors.text} name="images-outline" size={26} />
        <Text style={styles.sideLabel}>Gallery</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: appTheme.spacing.lg,
    paddingTop: appTheme.spacing.md,
    paddingBottom: appTheme.spacing.sm,
    backgroundColor: appTheme.colors.surfaceMuted,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
  },
  sideButton: {
    width: 72,
    alignItems: "center",
    gap: appTheme.spacing.xs,
  },
  sideLabel: {
    color: appTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.85,
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: appTheme.colors.text,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: appTheme.colors.text,
  },
  shutterDisabled: {
    opacity: 0.5,
  },
});
