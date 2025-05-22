"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Transaction } from '@/lib/types'; // Removed TransactionType as it's part of Transaction

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => void;
  // Future methods: deleteTransaction, updateTransaction
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const initialTransactions: Transaction[] = [
      { id: '1', type: 'income', description: 'Salário', amount: 5000, date: new Date(2024, 6, 1).toISOString(), category: 'Salário' },
      { id: '2', type: 'expense', description: 'Aluguel', amount: 1500, date: new Date(2024, 6, 5).toISOString(), category: 'Moradia' },
      { id: '3', type: 'expense', description: 'Supermercado', amount: 300, date: new Date(2024, 6, 7).toISOString(), category: 'Alimentação' },
      { id: '4', type: 'income', description: 'Projeto Freelance', amount: 750, date: new Date(2024, 6, 10).toISOString(), category: 'Freelance' },
      { id: '5', type: 'expense', description: 'Conta de Internet', amount: 60, date: new Date(2024, 6, 12).toISOString(), category: 'Contas Fixas' },
    ];
    return initialTransactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // ensure initial sort
  });

  const addTransaction = useCallback((transactionInput: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
    const newTransaction: Transaction = {
      ...transactionInput,
      id: Date.now().toString(), 
      date: transactionInput.date.toISOString(),
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const value = useMemo(() => ({
    transactions,
    addTransaction,
  }), [transactions, addTransaction]);

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
