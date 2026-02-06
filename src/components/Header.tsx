import { Book, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Book className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-semibold text-foreground">
            Café des Lettres
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/clubs" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Clubs
          </Link>
          <Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Bibliothèque
          </Link>
          <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Événements
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <Button asChild className="bg-primary text-primary-foreground hover:bg-burgundy-dark">
              <Link to="/dashboard">Mon espace</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/auth">Se connecter</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-burgundy-dark">
                <Link to="/auth">S'inscrire</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
