import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { useState } from "react";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  index: number;
}

const BookCard = ({ image, title, author, category, rating, index }: BookCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="book-card mb-3 aspect-[2/3] relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="category-badge">{category}</span>
        
        {/* Heart button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isLiked ? "text-primary fill-primary" : "text-muted-foreground"
            }`} 
          />
        </motion.button>
      </div>
      <motion.h3 
        className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
      >
        {title}
      </motion.h3>
      <p className="text-muted-foreground text-sm mb-2">{author}</p>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.05 + i * 0.05 }}
          >
            <Star
              className={`w-4 h-4 ${
                i < rating ? "text-gold fill-gold" : "text-border"
              }`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookCard;
