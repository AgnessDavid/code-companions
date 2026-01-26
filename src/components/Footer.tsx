import { Book, AtSign, Share2, Rss } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cream-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Book className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                Café des Lettres
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Plus qu'un réseau social, une maison pour votre esprit. 
              Participez à l'aventure littéraire et caféinée la plus 
              chaleureuse du web.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-primary hover:text-burgundy-dark transition-colors">
                Le concept
              </a>
              <a href="#" className="text-primary hover:text-burgundy-dark transition-colors">
                Boutique
              </a>
              <a href="#" className="text-primary hover:text-burgundy-dark transition-colors">
                Partenariats
              </a>
              <a href="#" className="text-primary hover:text-burgundy-dark transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Suivez-nous
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <AtSign className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © 2024 Café des Lettres. Fabriqué avec passion et une tasse de café bien chaud.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
