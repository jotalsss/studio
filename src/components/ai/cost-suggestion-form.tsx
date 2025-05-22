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
  spendingHabits: z.string().min(50, "Por favor, descreva seus hábitos de consumo em pelo menos 50 caracteres."),
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
         setError("Ocorreu um erro inesperado. Nenhuma sugestão foi retornada.");
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-accent" />
          Sugestões de Economia com IA
        </CardTitle>
        <CardDescription>
          Descreva seus hábitos de consumo e nossa IA fornecerá sugestões personalizadas para ajudá-lo a economizar.
          Inclua detalhes sobre sua renda, principais despesas e metas financeiras para melhores conselhos.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="spendingHabits" className="text-base">Seus Hábitos de Consumo</Label>
            <Textarea
              id="spendingHabits"
              placeholder="Ex: Ganho R$5000/mês. Minhas principais despesas são aluguel (R$1500), alimentação (R$800) e transporte (R$300). Gosto de jantar fora duas vezes por semana..."
              className="mt-1 min-h-[150px] resize-y"
              {...form.register("spendingHabits")}
            />
            {form.formState.errors.spendingHabits && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.spendingHabits.message}</p>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando Sugestões...
              </>
            ) : (
              "Obter Sugestões"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
