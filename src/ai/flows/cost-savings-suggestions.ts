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
      'Uma descrição dos hábitos de consumo do usuário, incluindo renda, despesas e categorias.'
    ),
});

export type CostSavingsSuggestionsInput = z.infer<
  typeof CostSavingsSuggestionsInputSchema
>;

const CostSavingsSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('Uma lista de sugestões de economia.'),
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
  prompt: `Você é um consultor financeiro pessoal. Com base nos hábitos de consumo do usuário, você sugerirá maneiras de reduzir despesas e economizar dinheiro. Responda em Português do Brasil.

Hábitos de Consumo: {{{spendingHabits}}}

Forneça uma lista de sugestões práticas para reduzir gastos.`,
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
