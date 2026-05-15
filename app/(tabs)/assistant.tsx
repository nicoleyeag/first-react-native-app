import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { LoadingState } from "@/src/components/common/LoadingState";
import { Pill } from "@/src/components/common/Pill";
import { ScreenContainer } from "@/src/components/common/ScreenContainer";
import { SectionCard } from "@/src/components/common/SectionCard";
import type { AssistantInsight, AssistantPrompt, HomeSummary } from "@/src/models/view-models";
import { getAssistantInsights, getAssistantPrompts } from "@/src/services/assistant-service";
import { getHomeSummary } from "@/src/services/home-service";
import { appTheme } from "@/src/theme/app-theme";

export default function AssistantScreen() {
  const [prompts, setPrompts] = useState<AssistantPrompt[]>([]);
  const [insights, setInsights] = useState<AssistantInsight[]>([]);
  const [summary, setSummary] = useState<HomeSummary | null>(null);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAssistantData = useCallback(async () => {
    setIsLoading(true);
    const [nextPrompts, nextInsights, nextSummary] = await Promise.all([
      getAssistantPrompts(),
      getAssistantInsights(),
      getHomeSummary(),
    ]);

    setPrompts(nextPrompts);
    setInsights(nextInsights);
    setSummary(nextSummary);
    setSelectedPromptId((current) => current ?? nextPrompts[0]?.id ?? null);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadAssistantData();
    }, [loadAssistantData]),
  );

  const selectedPrompt = useMemo(
    () => prompts.find((prompt) => prompt.id === selectedPromptId) ?? null,
    [prompts, selectedPromptId],
  );

  const mockResponse = selectedPrompt
    ? `${selectedPrompt.body} For now this is a UI-only response based on ${summary?.uniqueCollectionCards ?? 0} unique cards and ${summary?.totalDecks ?? 0} decks.`
    : "Pick a prompt to preview the AI assistant layout.";

  return (
    <ScreenContainer
      subtitle="This tab is intentionally mock-only so the layout can mature before real AI logic arrives."
      title="AI Assistant">
      {isLoading ? (
        <LoadingState label="Loading assistant preview..." />
      ) : (
        <>
          <SectionCard>
            <Pill label="Coming soon" tone="accent" />
            <Text style={styles.title}>Assistant Preview</Text>
            <Text style={styles.description}>
              Prompt suggestions and insight cards are mocked for now, but the screen is ready for a
              future service-backed AI layer.
            </Text>
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Try a mock prompt</Text>
            <View style={styles.promptList}>
              {prompts.map((prompt) => {
                const isSelected = prompt.id === selectedPromptId;

                return (
                  <Pressable
                    key={prompt.id}
                    onPress={() => setSelectedPromptId(prompt.id)}
                    style={[styles.promptButton, isSelected ? styles.promptButtonActive : null]}>
                    <Text style={styles.promptTitle}>{prompt.title}</Text>
                    <Text style={styles.promptBody}>{prompt.body}</Text>
                  </Pressable>
                );
              })}
            </View>
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Mock response</Text>
            <Text style={styles.responseText}>{mockResponse}</Text>
          </SectionCard>

          <View style={styles.insightBlock}>
            <Text style={styles.sectionTitle}>Starter insights</Text>
            {insights.map((insight) => (
              <SectionCard key={insight.id}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.description}>{insight.description}</Text>
              </SectionCard>
            ))}
          </View>
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: appTheme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  sectionTitle: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  description: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  promptList: {
    gap: appTheme.spacing.sm,
  },
  promptButton: {
    borderRadius: appTheme.radius.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    padding: appTheme.spacing.md,
    gap: appTheme.spacing.xs,
    backgroundColor: appTheme.colors.background,
  },
  promptButtonActive: {
    borderColor: appTheme.colors.primary,
    backgroundColor: appTheme.colors.primarySoft,
  },
  promptTitle: {
    color: appTheme.colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  promptBody: {
    color: appTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  responseText: {
    color: appTheme.colors.text,
    fontSize: 15,
    lineHeight: 24,
  },
  insightBlock: {
    gap: appTheme.spacing.sm,
  },
  insightTitle: {
    color: appTheme.colors.text,
    fontSize: 17,
    fontWeight: "700",
  },
});
