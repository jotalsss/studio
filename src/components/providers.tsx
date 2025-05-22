"use client";

import type { ReactNode } from 'react';
import { TransactionsProvider } from '@/contexts/transactions-context';
import { Toaster } from '@/components/ui/toaster';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TransactionsProvider>
      {children}
      <Toaster />
    </TransactionsProvider>
  );
}
