
"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { FinancialSummaryDisplay } from "@/components/dashboard/financial-summary-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import type { FinancialSummary } from "@/lib/types";
import { useMemo } from "react";

export default function DashboardPage() {
  const { filteredTransactions } = useTransactions(); // Usa as transações já filtradas pelo contexto

  const summary: FinancialSummary = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
  }, [filteredTransactions]);

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Painel Principal
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo(a) ao Conta Clara, seu resumo financeiro.
          </p>
        </div>
        {/* O seletor de mês foi movido para o Header global */}
      </div>

      <FinancialSummaryDisplay summary={summary} />
      <RecentTransactions transactions={filteredTransactions} />
    </div>
  );
}
