"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Transaction, TransactionType } from '@/lib/types';

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => void;
  // Future methods: deleteTransaction, updateTransaction
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Initialize with some mock data or from localStorage if desired
    const initialTransactions: Transaction[] = [
      { id: '1', type: 'income', description: 'Salary', amount: 5000, date: new Date(2024, 6, 1).toISOString(), category: 'Salary' },
      { id: '2', type: 'expense', description: 'Rent', amount: 1500, date: new Date(2024, 6, 5).toISOString(), category: 'Housing' },
      { id: '3', type: 'expense', description: 'Groceries', amount: 300, date: new Date(2024, 6, 7).toISOString(), category: 'Food' },
      { id: '4', type: 'income', description: 'Freelance Project', amount: 750, date: new Date(2024, 6, 10).toISOString(), category: 'Freelance' },
      { id: '5', type: 'expense', description: 'Internet Bill', amount: 60, date: new Date(2024, 6, 12).toISOString(), category: 'Utilities' },
    ];
    return initialTransactions;
  });

  const addTransaction = useCallback((transactionInput: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
    const newTransaction: Transaction = {
      ...transactionInput,
      id: Date.now().toString(), // Simple ID generation
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
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
