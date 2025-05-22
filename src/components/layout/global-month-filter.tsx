
"use client";

import { useTransactions } from "@/contexts/transactions-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function GlobalMonthFilter() {
  const { selectedMonth, setSelectedMonth, availableMonths } = useTransactions();

  if (availableMonths.length === 0) {
    return null; // Não mostra o filtro se não houver meses (sem transações)
  }

  return (
    <div className="w-full sm:w-auto">
      <Label htmlFor="global-month-filter" className="sr-only">
        Filtrar por mês
      </Label>
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger
          id="global-month-filter"
          className="w-full sm:w-[180px] md:w-[200px] shadow-sm h-9 text-xs md:text-sm bg-background text-foreground border-border hover:bg-muted"
        >
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
  );
}
