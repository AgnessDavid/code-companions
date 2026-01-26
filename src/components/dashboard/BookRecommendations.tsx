import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
}

interface BookRecommendationsProps {
  books: Book[];
}

const BookRecommendations = ({ books }: BookRecommendationsProps) => {
  const getBookCover = (book: Book) => {
    if (book.cover_url) return book.cover_url;
    // Generate a placeholder based on book title
    const colors = ["#722F37", "#4A5568", "#2D3748", "#1A365D"];
    const colorIndex = book.title.length % colors.length;
    return null;
  };

  return (
    <Card className="border-burgundy/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl">Recommandations pour vous</CardTitle>
        <a href="#" className="text-sm text-primary flex items-center gap-1 hover:underline">
          Voir tout <ArrowRight className="w-4 h-4" />
        </a>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {books.slice(0, 3).map((book) => (
            <div key={book.id} className="group cursor-pointer">
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-burgundy/80 flex items-center justify-center mb-2">
                {book.cover_url ? (
                  <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-cream text-center p-4">
                    <p className="font-serif text-sm uppercase tracking-wider">{book.title}</p>
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                {book.title}
              </h4>
              <p className="text-xs text-muted-foreground">{book.author}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookRecommendations;
