import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-library.jpg";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1] as const,
    },
  },
};

const Hero = () => {
  return (
    <section className="relative w-full">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Background Image */}
          <div className="relative h-[550px] md:h-[600px]">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={heroImage}
              alt="Bibliothèque chaleureuse"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 hero-overlay" />

            {/* Floating decorative elements */}
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              className="absolute top-20 left-10 md:left-20 w-12 h-12 rounded-full bg-accent/30 backdrop-blur-sm flex items-center justify-center"
            >
              <BookOpen className="w-6 h-6 text-warm-white" />
            </motion.div>
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
              className="absolute bottom-32 right-10 md:right-24 w-10 h-10 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-warm-white" />
            </motion.div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {/* Warm welcome badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-warm-white text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Bienvenue dans votre refuge littéraire
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white mb-6 max-w-3xl leading-tight"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
              >
                L'endroit où les mots{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-accent"
                >
                  se rencontrent
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-warm-white/90 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
              >
                Rejoignez la première communauté de passionnés de littérature et de café. 
                Partagez vos coups de cœur, découvrez des trésors cachés et tissez des liens 
                avec des âmes sœurs littéraires.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  asChild
                  size="lg" 
                  className="bg-primary hover:bg-burgundy-dark text-primary-foreground px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link to="/auth">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Créer mon compte gratuitement
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-warm-white hover:bg-white/20 px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300"
                >
                  <Link to="/library">
                    Découvrir les livres
                  </Link>
                </Button>
              </motion.div>

              {/* Warm message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-8 text-warm-white/70 text-sm flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-accent" />
                Déjà 12 000+ passionnés nous ont rejoints
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
