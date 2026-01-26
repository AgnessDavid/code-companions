import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BookCard from "./BookCard";

import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import book5 from "@/assets/book-5.jpg";

const books = [
  {
    image: book1,
    title: "Les Misérables",
    author: "Victor Hugo",
    category: "Classique",
    rating: 5,
  },
  {
    image: book2,
    title: "La Vie Devant Soi",
    author: "Romain Gary",
    category: "Contemporain",
    rating: 5,
  },
  {
    image: book3,
    title: "Les Fleurs du Mal",
    author: "Charles Baudelaire",
    category: "Poésie",
    rating: 5,
  },
  {
    image: book4,
    title: "L'Étranger",
    author: "Albert Camus",
    category: "Histoire",
    rating: 5,
  },
  {
    image: book5,
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Fantastique",
    rating: 5,
  },
];

const BooksSection = () => {
  return (
    <section className="py-20 bg-cream-dark/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div className="section-border">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Livres du moment
            </h2>
            <p className="text-muted-foreground text-lg">
              Les pépites sélectionnées par notre comité de lecture.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group"
          >
            Tout voir
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book, index) => (
            <BookCard key={index} {...book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
