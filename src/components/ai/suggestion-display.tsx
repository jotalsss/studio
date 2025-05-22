import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";

interface SuggestionDisplayProps {
  suggestions: string[];
}

export function SuggestionDisplay({ suggestions }: SuggestionDisplayProps) {
  if (suggestions.length === 0) {
    return null; 
  }

  return (
    <Card className="mt-8 w-full max-w-2xl mx-auto shadow-lg bg-accent/10 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-accent">
          <Lightbulb className="h-6 w-6" />
          Sugestões de Economia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <p className="text-foreground">{suggestion}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
