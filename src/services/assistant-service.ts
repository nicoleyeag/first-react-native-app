import { mockAssistantInsights, mockAssistantPrompts } from "@/src/data/mock/assistant";

export async function getAssistantPrompts() {
  return [...mockAssistantPrompts];
}

export async function getAssistantInsights() {
  return [...mockAssistantInsights];
}
