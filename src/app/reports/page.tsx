import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Reports</h1>
        <p className="text-muted-foreground">Analyze your spending and income patterns.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle>Your Reports</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This is where your generated financial reports will appear. You'll be able to see detailed breakdowns of your income and expenses over various periods.
          </p>
          <p className="text-sm text-muted-foreground">
            <em>(Report generation and scheduling features are planned for a future update.)</em>
          </p>
           <img 
            src="https://placehold.co/800x400.png" 
            alt="Placeholder chart" 
            className="rounded-md border"
            data-ai-hint="financial chart"
          />
        </CardContent>
      </Card>
    </div>
  );
}
