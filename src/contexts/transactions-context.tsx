
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Transaction } from '@/lib/types';

interface AvailableMonth {
  value: string; // "YYYY-MM" ou "all"
  label: string;
}

interface TransactionsContextType {
  allTransactions: Transaction[]; // Renomeado para clareza
  filteredTransactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  availableMonths: AvailableMonth[];
  // Future methods: deleteTransaction, updateTransaction
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
    const initialTransactions: Transaction[] = [
      { id: '1', type: 'income', description: 'Salário', amount: 5000, date: new Date(2024, 6, 1).toISOString(), category: 'Salário' },
      { id: '2', type: 'expense', description: 'Aluguel', amount: 1500, date: new Date(2024, 6, 5).toISOString(), category: 'Moradia' },
      { id: '3', type: 'expense', description: 'Supermercado', amount: 300, date: new Date(2024, 6, 7).toISOString(), category: 'Alimentação' },
      { id: '4', type: 'income', description: 'Projeto Freelance', amount: 750, date: new Date(2024, 6, 10).toISOString(), category: 'Freelance' },
      { id: '5', type: 'expense', description: 'Conta de Internet', amount: 60, date: new Date(2024, 6, 12).toISOString(), category: 'Contas Fixas' },
      { id: '6', type: 'income', description: 'Salário', amount: 5000, date: new Date(2024, 5, 1).toISOString(), category: 'Salário' }, // Maio
      { id: '7', type: 'expense', description: 'Aluguel', amount: 1500, date: new Date(2024, 5, 5).toISOString(), category: 'Moradia' }, // Maio
    ];
    return initialTransactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  const [selectedMonth, setSelectedMonth] = useState<string>("all"); // "all" ou "YYYY-MM"

  const addTransaction = useCallback((transactionInput: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
    const newTransaction: Transaction = {
      ...transactionInput,
      id: Date.now().toString(), 
      date: transactionInput.date.toISOString(),
    };
    setAllTransactions((prevTransactions) => 
      [...prevTransactions, newTransaction].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    allTransactions.forEach((t) => {
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
          }).replace(/^\w/, (c) => c.toUpperCase()),
        };
      })
      .sort((a, b) => b.value.localeCompare(a.value));
  }, [allTransactions]);

  const filteredTransactions = useMemo(() => {
    if (selectedMonth === "all") {
      return allTransactions;
    }
    return allTransactions.filter((t) => {
      const transactionDate = new Date(t.date);
      const [year, month] = selectedMonth.split("-");
      return (
        transactionDate.getFullYear() === Number(year) &&
        transactionDate.getMonth() + 1 === Number(month)
      );
    });
  }, [allTransactions, selectedMonth]);

  const value = useMemo(() => ({
    allTransactions,
    filteredTransactions,
    addTransaction,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
  }), [allTransactions, filteredTransactions, addTransaction, selectedMonth, setSelectedMonth, availableMonths]);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider');
  }
  return context;
}
