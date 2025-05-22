"use client";

import { useState } from "react";
import { CostSuggestionForm } from "@/components/ai/cost-suggestion-form";
import { SuggestionDisplay } from "@/components/ai/suggestion-display";

export default function AiSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSuggestionsReceived = (newSuggestions: string[]) => {
    setSuggestions(newSuggestions);
  };

  const handleClearSuggestions = () => {
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Cost Savings Advisor</h1>
        <p className="text-muted-foreground">Get smart tips to reduce your expenses.</p>
      </div>
      
      <CostSuggestionForm 
        onSuggestionsReceived={handleSuggestionsReceived} 
        onClearSuggestions={handleClearSuggestions}
      />
      
      {suggestions.length > 0 && (
        <SuggestionDisplay suggestions={suggestions} />
      )}
    </div>
  );
}
