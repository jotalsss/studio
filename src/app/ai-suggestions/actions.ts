"use server";

import { costSavingsSuggestions } from "@/ai/flows/cost-savings-suggestions";
import type { CostSavingsSuggestionsInput, CostSavingsSuggestionsOutput } from "@/ai/flows/cost-savings-suggestions";

export async function getCostSavingsSuggestionsAction(
  input: CostSavingsSuggestionsInput
): Promise<CostSavingsSuggestionsOutput | { error: string }> {
  try {
    // Basic validation (Genkit flow already has Zod validation)
    if (!input.spendingHabits || input.spendingHabits.trim().length < 50) {
      return { error: "Please provide more details about your spending habits (at least 50 characters)." };
    }

    const result = await costSavingsSuggestions(input);
    return result;
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    return { error: "Failed to generate suggestions. Please try again later." };
  }
}
