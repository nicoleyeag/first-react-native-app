import type { PropsWithChildren, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { appTheme } from "@/src/theme/app-theme";

type ScreenContainerProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  header?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function ScreenContainer({
  children,
  title,
  subtitle,
  header,
  contentContainerStyle,
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}>
        {header ? (
          header
        ) : title || subtitle ? (
          <View style={styles.header}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        ) : null}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  content: {
    padding: appTheme.spacing.lg,
    gap: appTheme.spacing.md,
    paddingBottom: appTheme.spacing.xl,
  },
  header: {
    gap: appTheme.spacing.xs,
  },
  title: {
    color: appTheme.colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
