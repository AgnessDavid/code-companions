import { motion } from "framer-motion";
import { Heart, BookOpen, Coffee, Users } from "lucide-react";

const testimonials = [
  {
    quote: "J'ai retrouvé le plaisir de lire grâce à cette communauté. Chaque discussion est une invitation au voyage.",
    author: "Marie-Claire",
    role: "Membre depuis 2023",
  },
  {
    quote: "Les cafés virtuels du dimanche sont devenus mon rituel préféré. On parle livres, on parle vie.",
    author: "Jean-Pierre",
    role: "Animateur de club",
  },
  {
    quote: "Ici, chaque recommandation est une pépite. J'ai découvert des auteurs qui ont changé ma façon de voir le monde.",
    author: "Émilie",
    role: "Lectrice passionnée",
  },
];

const stats = [
  { icon: Users, value: "12 000+", label: "Lecteurs passionnés" },
  { icon: BookOpen, value: "45 000+", label: "Livres partagés" },
  { icon: Coffee, value: "2 500+", label: "Cafés virtuels" },
  { icon: Heart, value: "150 000+", label: "Coups de cœur" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const CommunitySection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
          >
            ✨ Une communauté qui a du cœur
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto leading-tight">
            Là où les pages deviennent des ponts entre les âmes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Chaque livre lu ensemble crée un lien invisible. Rejoignez une famille 
            de passionnés qui partagent bien plus que des recommandations.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"
              >
                <stat.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Warm Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl" />
          <div className="relative p-8 md:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Coffee className="w-10 h-10 mx-auto mb-6 text-primary" />
              <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed max-w-3xl mx-auto mb-6">
                "Prenez une tasse de café, installez-vous confortablement, 
                et laissez-vous porter par les mots. Ici, chaque lecteur 
                trouve sa place, chaque histoire trouve son écho."
              </p>
              <p className="text-primary font-medium">
                — L'équipe Café des Lettres
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                    className="text-gold"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-serif text-primary font-semibold">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
