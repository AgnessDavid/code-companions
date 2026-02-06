import { motion } from "framer-motion";
import { UserPlus, MessageSquareText, Users, Video, Sparkles } from "lucide-react";

const features = [
  {
    icon: UserPlus,
    title: "Créez votre profil",
    description: "Personnalisez votre espace littéraire et listez vos genres préférés. Votre bibliothèque virtuelle vous attend.",
    warmMessage: "Votre histoire commence ici ✨",
  },
  {
    icon: MessageSquareText,
    title: "Partagez vos critiques",
    description: "Donnez votre avis sur vos lectures et inspirez les autres membres. Chaque mot compte.",
    warmMessage: "Votre voix fait la différence 💬",
  },
  {
    icon: Users,
    title: "Rejoignez des clubs",
    description: "Intégrez des cercles de lecture thématiques et échangez en profondeur avec des passionnés.",
    warmMessage: "Trouvez votre tribu 📚",
  },
  {
    icon: Video,
    title: "Cafés virtuels",
    description: "Participez à des rencontres vidéo mensuelles avec des auteurs invités et d'autres lecteurs.",
    warmMessage: "Partageons un café ☕",
  },
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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Simple comme bonjour
          </motion.span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une plateforme pensée avec amour pour les amoureux des belles lettres. 
            Quatre étapes pour rejoindre une communauté qui vous ressemble.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="feature-card group relative"
            >
              {/* Step number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-lg"
              >
                {index + 1}
              </motion.div>

              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300"
              >
                <feature.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-sm text-primary font-medium"
              >
                {feature.warmMessage}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
