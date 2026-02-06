import { motion } from "framer-motion";
import { Book, AtSign, Share2, Rss, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cream-dark py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
              >
                <Book className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-serif text-xl font-semibold text-foreground">
                Café des Lettres
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-4">
              Plus qu'un réseau social, une maison pour votre esprit. 
              Participez à l'aventure littéraire et caféinée la plus 
              chaleureuse du web.
            </p>
            <p className="text-sm text-primary font-medium flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Créé avec amour pour les amoureux des livres
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/library" className="text-primary hover:text-burgundy-dark transition-colors hover:translate-x-1 inline-block">
                Bibliothèque
              </Link>
              <Link to="/clubs" className="text-primary hover:text-burgundy-dark transition-colors hover:translate-x-1 inline-block">
                Clubs de lecture
              </Link>
              <Link to="/events" className="text-primary hover:text-burgundy-dark transition-colors hover:translate-x-1 inline-block">
                Événements
              </Link>
              <Link to="/auth" className="text-primary hover:text-burgundy-dark transition-colors hover:translate-x-1 inline-block">
                Rejoindre la communauté
              </Link>
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              {[AtSign, Share2, Rss].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Rejoignez notre newsletter pour recevoir nos recommandations littéraires hebdomadaires.
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-border"
        >
          <p className="text-center text-muted-foreground text-sm">
            © 2024 Café des Lettres. Fabriqué avec passion et une tasse de café bien chaud ☕
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
