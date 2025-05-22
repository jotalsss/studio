"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTransactions } from "@/contexts/transactions-context";
import { TransactionFormFields } from "./transaction-form-fields";
import { TransactionFormSchema } from "./transaction-form-schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function ExpenseForm() {
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      description: "",
      amount: undefined, // or 0
      date: new Date(),
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof TransactionFormSchema>) {
    addTransaction({ ...values, type: 'expense', date: values.date });
    toast({
      title: "Despesa Registrada",
      description: `${values.description} de R$ ${values.amount.toFixed(2)} registrada.`,
      variant: "default",
    });
    form.reset();
    router.push("/"); 
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Registrar Nova Despesa</CardTitle>
        <CardDescription>Registre uma nova despesa para manter suas finanças sob controle.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TransactionFormFields control={form.control} transactionType="expense" />
            <Button type="submit" variant="destructive" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Registrando..." : "Registrar Despesa"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
