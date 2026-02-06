import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Star, ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  category: string | null;
  description: string | null;
}

interface BookWithRating extends Book {
  avg_rating: number;
  review_count: number;
}

const genres = [
  { id: "roman", label: "Roman", count: 142 },
  { id: "poesie", label: "Poésie", count: 45 },
  { id: "essai", label: "Essai", count: 89 },
  { id: "theatre", label: "Théâtre", count: 34 },
  { id: "biographie", label: "Biographie", count: 21 },
];

const Library = () => {
  const [books, setBooks] = useState<BookWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [genreOpen, setGenreOpen] = useState(true);
  const [languageOpen, setLanguageOpen] = useState(false);
  const booksPerPage = 12;

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedGenres, sortBy, currentPage]);

  const fetchBooks = async () => {
    setLoading(true);
    
    // Fetch books
    let query = supabase.from("books").select("*");

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }

    if (selectedGenres.length > 0) {
      query = query.in("category", selectedGenres);
    }

    const { data: booksData, error } = await query
      .range((currentPage - 1) * booksPerPage, currentPage * booksPerPage - 1);

    if (!error && booksData) {
      // Fetch reviews for ratings
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("book_id, rating");

      const ratingMap: Record<string, { total: number; count: number }> = {};
      reviewsData?.forEach((review) => {
        if (review.rating) {
          if (!ratingMap[review.book_id]) {
            ratingMap[review.book_id] = { total: 0, count: 0 };
          }
          ratingMap[review.book_id].total += review.rating;
          ratingMap[review.book_id].count += 1;
        }
      });

      const booksWithRatings: BookWithRating[] = booksData.map((book) => ({
        ...book,
        avg_rating: ratingMap[book.id]
          ? ratingMap[book.id].total / ratingMap[book.id].count
          : 0,
        review_count: ratingMap[book.id]?.count || 0,
      }));

      // Sort
      if (sortBy === "rating") {
        booksWithRatings.sort((a, b) => b.avg_rating - a.avg_rating);
      } else if (sortBy === "popular") {
        booksWithRatings.sort((a, b) => b.review_count - a.review_count);
      }

      setBooks(booksWithRatings);
    }
    setLoading(false);
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? "fill-accent text-accent"
                : star - 0.5 <= rating
                ? "fill-accent/50 text-accent"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-cream-dark py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
            Bibliothèque du Café des Lettres
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Explorez notre collection soigneusement sélectionnée d'œuvres littéraires et de manuscrits rares.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, auteur ou ISBN..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-12 py-6 bg-card border-border text-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <Filter className="w-4 h-4" />
                  Filtrer par
                </div>

                {/* Genre Filter */}
                <Collapsible open={genreOpen} onOpenChange={setGenreOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-b border-border">
                    <span className="font-medium text-foreground">Genre</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${genreOpen ? "rotate-180" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-2">
                    {genres.map((genre) => (
                      <label
                        key={genre.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedGenres.includes(genre.label)}
                          onCheckedChange={() => toggleGenre(genre.label)}
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {genre.label}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          ({genre.count})
                        </span>
                      </label>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Language Filter */}
                <Collapsible open={languageOpen} onOpenChange={setLanguageOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 border-b border-border">
                    <span className="font-medium text-foreground">Langue</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${languageOpen ? "rotate-180" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox className="border-border" />
                      <span className="text-sm text-muted-foreground">Français</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox className="border-border" />
                      <span className="text-sm text-muted-foreground">Anglais</span>
                    </label>
                  </CollapsibleContent>
                </Collapsible>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium text-foreground py-2 border-b border-border">
                    Note des lecteurs
                  </h4>
                  <div className="pt-3 flex items-center gap-2">
                    {renderStars(4)}
                    <span className="text-sm text-muted-foreground">& plus</span>
                  </div>
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={resetFilters}
                >
                  Réinitialiser
                </Button>
              </div>
            </aside>

            {/* Books Grid */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <p className="text-sm text-primary">
                  Affichage de 1-{Math.min(booksPerPage, books.length)} sur {books.length} ouvrages
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] border-border">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Nouveautés</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="popular">Les plus populaires</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Books */}
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[2/3] bg-muted rounded-lg mb-3" />
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    Aucun livre trouvé
                  </h3>
                  <p className="text-muted-foreground">
                    Essayez de modifier vos critères de recherche.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {books.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <div className="aspect-[2/3] bg-secondary rounded-lg overflow-hidden mb-3 relative">
                          {book.cover_url ? (
                            <img
                              src={book.cover_url}
                              alt={book.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                              <span className="font-serif text-2xl text-muted-foreground">
                                {book.title[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-0">
                          <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {book.title}
                          </h3>
                          <p className="text-sm text-primary mb-2">{book.author}</p>
                          {book.review_count > 0 && (
                            <div className="flex items-center gap-2">
                              {renderStars(book.avg_rating)}
                              <span className="text-xs text-muted-foreground">
                                ({book.review_count})
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {books.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-border"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {[1, 2, 3].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "border-border"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  <span className="text-muted-foreground">...</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="border-border"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Library;
