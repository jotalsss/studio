import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinancialSummary } from "@/lib/types";
import { TrendingUp, TrendingDown, Scale } from "lucide-react"; // Removed DollarSign as it wasn't used

interface FinancialSummaryCardProps {
  summary: FinancialSummary;
}

const StatCard = ({ title, value, icon, colorClass }: { title: string; value: number; icon: React.ElementType, colorClass: string }) => {
  const IconComponent = icon;
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className={`h-5 w-5 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      </CardContent>
    </Card>
  );
};


export function FinancialSummaryDisplay({ summary }: FinancialSummaryCardProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Receita Total" value={summary.totalIncome} icon={TrendingUp} colorClass="text-green-500"/>
      <StatCard title="Despesa Total" value={summary.totalExpenses} icon={TrendingDown} colorClass="text-red-500"/>
      <StatCard title="Saldo" value={summary.balance} icon={Scale} colorClass="text-primary"/>
    </div>
  );
}
