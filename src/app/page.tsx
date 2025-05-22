"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { FinancialSummaryDisplay } from "@/components/dashboard/financial-summary-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import type { FinancialSummary } from "@/lib/types";
import { useMemo } from "react";

export default function DashboardPage() {
  const { transactions } = useTransactions();

  const summary: FinancialSummary = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
  }, [transactions]);

  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Painel Principal</h1>
        <p className="text-muted-foreground">Bem-vindo(a) ao Conta Clara, seu resumo financeiro.</p>
      </div>
      
      <FinancialSummaryDisplay summary={summary} />
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
