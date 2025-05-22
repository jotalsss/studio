"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from "lucide-react";
import { getCostSavingsSuggestionsAction } from "@/app/ai-suggestions/actions";
import type { CostSavingsSuggestionsOutput } from "@/ai/flows/cost-savings-suggestions";

const FormSchema = z.object({
  spendingHabits: z.string().min(50, "Please describe your spending habits in at least 50 characters."),
});
type FormData = z.infer<typeof FormSchema>;

interface CostSuggestionFormProps {
  onSuggestionsReceived: (suggestions: string[]) => void;
  onClearSuggestions: () => void;
}

export function CostSuggestionForm({ onSuggestionsReceived, onClearSuggestions }: CostSuggestionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setError(null);
    onClearSuggestions(); 
    startTransition(async () => {
      const result = await getCostSavingsSuggestionsAction({ spendingHabits: data.spendingHabits });
      if ("error" in result) {
        setError(result.error);
      } else if (result.suggestions) {
        onSuggestionsReceived(result.suggestions);
      } else {
         setError("An unexpected error occurred. No suggestions were returned.");
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-accent" />
          AI-Powered Cost Savings
        </CardTitle>
        <CardDescription>
          Describe your spending habits, and our AI will provide personalized suggestions to help you save money.
          Include details about your income, main expenses, and financial goals for better advice.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="spendingHabits" className="text-base">Your Spending Habits</Label>
            <Textarea
              id="spendingHabits"
              placeholder="e.g., I earn R$5000/month. My main expenses are rent (R$1500), food (R$800), and transport (R$300). I like to dine out twice a week..."
              className="mt-1 min-h-[150px] resize-y"
              {...form.register("spendingHabits")}
            />
            {form.formState.errors.spendingHabits && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.spendingHabits.message}</p>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              "Get Suggestions"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
