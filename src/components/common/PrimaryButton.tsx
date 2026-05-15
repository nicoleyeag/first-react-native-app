import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  rightAdornment?: ReactNode;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  rightAdornment,
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" ? styles.primary : null,
        variant === "secondary" ? styles.secondary : null,
        variant === "ghost" ? styles.ghost : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}>
      <Text
        style={[
          styles.label,
          variant === "primary" ? styles.primaryLabel : styles.secondaryLabel,
        ]}>
        {label}
      </Text>
      {rightAdornment}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: appTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: appTheme.spacing.xs,
    paddingHorizontal: appTheme.spacing.md,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: appTheme.colors.primary,
    borderColor: appTheme.colors.primary,
  },
  secondary: {
    backgroundColor: appTheme.colors.primarySoft,
    borderColor: appTheme.colors.primarySoft,
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: appTheme.colors.border,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
  primaryLabel: {
    color: "#FFFFFF",
  },
  secondaryLabel: {
    color: appTheme.colors.text,
  },
});
