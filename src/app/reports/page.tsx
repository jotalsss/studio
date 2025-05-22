import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Relatórios Financeiros</h1>
        <p className="text-muted-foreground">Analise seus padrões de gastos e receitas.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle>Seus Relatórios</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            É aqui que seus relatórios financeiros gerados aparecerão. Você poderá ver detalhamentos de suas receitas e despesas ao longo de vários períodos.
          </p>
          <p className="text-sm text-muted-foreground">
            <em>(Recursos de geração e agendamento de relatórios estão planejados para uma atualização futura.)</em>
          </p>
           <img 
            src="https://placehold.co/800x400.png" 
            alt="Gráfico de exemplo" 
            className="rounded-md border"
            data-ai-hint="financial chart"
          />
        </CardContent>
      </Card>
    </div>
  );
}
