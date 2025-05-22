
"use client";

import { useTransactions } from "@/contexts/transactions-context";
import { FinancialSummaryDisplay } from "@/components/dashboard/financial-summary-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import type { FinancialSummary } from "@/lib/types";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function DashboardPage() {
  const { transactions } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState<string>("all"); // "all" ou "YYYY-MM"

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach((t) => {
      const date = new Date(t.date);
      months.add(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      );
    });

    return Array.from(months)
      .map((monthStr) => {
        const [year, month] = monthStr.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        return {
          value: monthStr,
          label: date.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          }).replace(/^\w/, (c) => c.toUpperCase()), // Capitaliza a primeira letra
        };
      })
      .sort((a, b) => b.value.localeCompare(a.value)); // Ordenar decrescente
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (selectedMonth === "all") {
      return transactions;
    }
    return transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      const [year, month] = selectedMonth.split("-");
      return (
        transactionDate.getFullYear() === Number(year) &&
        transactionDate.getMonth() + 1 === Number(month)
      );
    });
  }, [transactions, selectedMonth]);

  const summary: FinancialSummary = useMemo(() => {
    const currentTransactions = filteredTransactions;
    const totalIncome = currentTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = currentTransactions
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
        <div className="w-full sm:w-auto">
          <Label htmlFor="month-filter" className="sr-only">Filtrar por mês</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger id="month-filter" className="w-full sm:w-[200px] shadow-sm">
              <SelectValue placeholder="Filtrar por mês..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Meses</SelectItem>
              {availableMonths.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <FinancialSummaryDisplay summary={summary} />
      <RecentTransactions transactions={filteredTransactions} />
    </div>
  );
}
