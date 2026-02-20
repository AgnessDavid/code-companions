import { useState } from "react";
import { Book, MessageSquare, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/clubs", label: "Clubs" },
  { to: "/library", label: "Bibliothèque" },
  { to: "/events", label: "Événements" },
  { to: "/auteurs", label: "Auteurs" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center">
            <Book className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-semibold text-foreground">
            Café des Lettres
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <Button asChild className="bg-primary text-primary-foreground hover:bg-burgundy-dark">
              <Link to="/dashboard">Mon espace</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/auth">Se connecter</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-burgundy-dark">
                <Link to="/auth">S'inscrire</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3 rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2">
                {user ? (
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-burgundy-dark">
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Mon espace</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Link to="/auth" onClick={() => setMobileOpen(false)}>Se connecter</Link>
                    </Button>
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-burgundy-dark">
                      <Link to="/auth" onClick={() => setMobileOpen(false)}>S'inscrire</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
