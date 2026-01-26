import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  index: number;
}

const BookCard = ({ image, title, author, category, rating, index }: BookCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="book-card mb-3 aspect-[2/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="category-badge">{category}</span>
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-2">{author}</p>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-gold fill-gold" : "text-border"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BookCard;
