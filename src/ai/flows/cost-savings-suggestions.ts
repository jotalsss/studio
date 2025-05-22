'use server';

/**
 * @fileOverview AI-powered cost savings suggestions based on spending habits.
 *
 * - costSavingsSuggestions - A function that provides cost savings suggestions.
 * - CostSavingsSuggestionsInput - The input type for the costSavingsSuggestions function.
 * - CostSavingsSuggestionsOutput - The return type for the costSavingsSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CostSavingsSuggestionsInputSchema = z.object({
  spendingHabits: z
    .string()
    .describe(
      'A description of the user spending habits, including income, expenses and categories.'
    ),
});

export type CostSavingsSuggestionsInput = z.infer<
  typeof CostSavingsSuggestionsInputSchema
>;

const CostSavingsSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of cost savings suggestions.'),
});

export type CostSavingsSuggestionsOutput = z.infer<
  typeof CostSavingsSuggestionsOutputSchema
>;

export async function costSavingsSuggestions(
  input: CostSavingsSuggestionsInput
): Promise<CostSavingsSuggestionsOutput> {
  return costSavingsSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'costSavingsSuggestionsPrompt',
  input: {schema: CostSavingsSuggestionsInputSchema},
  output: {schema: CostSavingsSuggestionsOutputSchema},
  prompt: `You are a personal finance advisor. Based on the user's spending habits, you will suggest ways to reduce expenses and save money.

Spending Habits: {{{spendingHabits}}}

Provide a list of actionable suggestions to reduce spending.`,
});

const costSavingsSuggestionsFlow = ai.defineFlow(
  {
    name: 'costSavingsSuggestionsFlow',
    inputSchema: CostSavingsSuggestionsInputSchema,
    outputSchema: CostSavingsSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
