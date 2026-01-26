import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-library.jpg";

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
          <div className="relative h-[500px] md:h-[550px]">
            <img
              src={heroImage}
              alt="Bibliothèque chaleureuse"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 hero-overlay" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-white mb-6 max-w-3xl leading-tight"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
              >
                L'endroit où les mots se rencontrent
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-warm-white/90 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
              >
                Rejoignez la première communauté de passionnés de littérature et de café. 
                Partagez, discutez et découvrez vos prochaines lectures.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-burgundy-dark text-primary-foreground px-8 py-6 text-lg font-medium rounded-lg shadow-hover transition-all duration-300"
                >
                  Créer mon compte gratuitement
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
