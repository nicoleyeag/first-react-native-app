import type { AssistantInsight, AssistantPrompt } from "@/src/models/view-models";

export const mockAssistantPrompts: AssistantPrompt[] = [
  {
    id: "prompt-1",
    title: "Upgrade my green deck",
    body: "Show a sample recommendation flow for improving my Mono Green Ramp list.",
  },
  {
    id: "prompt-2",
    title: "What should I scan next?",
    body: "Suggest useful card types to add next based on my current collection.",
  },
  {
    id: "prompt-3",
    title: "Organize my decks",
    body: "Give a mock summary of how I might sort decks by format and power level.",
  },
];

export const mockAssistantInsights: AssistantInsight[] = [
  {
    id: "insight-1",
    title: "Ramp package looks healthy",
    description: "Your mock collection already supports a solid green ramp shell with cheap acceleration.",
  },
  {
    id: "insight-2",
    title: "Removal is still light",
    description: "The deck list UI is ready for future suggestions once real AI and deck rules are added.",
  },
  {
    id: "insight-3",
    title: "Commander path is promising",
    description: "Atraxa and Arcane Signet provide a good placeholder foundation for a future commander build.",
  },
];
