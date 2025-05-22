"use server";

import { costSavingsSuggestions } from "@/ai/flows/cost-savings-suggestions";
import type { CostSavingsSuggestionsInput, CostSavingsSuggestionsOutput } from "@/ai/flows/cost-savings-suggestions";

export async function getCostSavingsSuggestionsAction(
  input: CostSavingsSuggestionsInput
): Promise<CostSavingsSuggestionsOutput | { error: string }> {
  try {
    // Basic validation (Genkit flow already has Zod validation)
    if (!input.spendingHabits || input.spendingHabits.trim().length < 50) {
      return { error: "Por favor, forneça mais detalhes sobre seus hábitos de consumo (pelo menos 50 caracteres)." };
    }

    const result = await costSavingsSuggestions(input);
    return result;
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    return { error: "Falha ao gerar sugestões. Por favor, tente novamente mais tarde." };
  }
}
