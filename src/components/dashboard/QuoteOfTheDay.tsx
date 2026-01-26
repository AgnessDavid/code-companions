import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

const quotes = [
  { text: "La lecture est une amitié.", author: "Marcel Proust" },
  { text: "Un livre est un ami qui ne trompe jamais.", author: "Prosper Mérimée" },
  { text: "La lecture, c'est le voyage de ceux qui ne peuvent prendre le train.", author: "Francis de Croisset" },
  { text: "Un livre qu'on quitte sans en avoir extrait quelque chose est un livre qu'on n'a pas lu.", author: "Antoine Albalat" },
];

const QuoteOfTheDay = () => {
  // Use date to get a "random" quote that changes daily
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quote = quotes[dayOfYear % quotes.length];

  return (
    <Card className="border-burgundy/10 bg-cream-dark">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg uppercase tracking-wide text-primary flex items-center gap-2">
          <Quote className="w-4 h-4" />
          Citation du jour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="text-foreground">
          <p className="text-lg font-serif italic mb-2">"{quote.text}"</p>
          <footer className="text-primary font-medium">— {quote.author}</footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default QuoteOfTheDay;
