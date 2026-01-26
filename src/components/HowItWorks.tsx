import { motion } from "framer-motion";
import { UserPlus, MessageSquareText, Users, Video } from "lucide-react";

const features = [
  {
    icon: UserPlus,
    title: "Créez votre profil",
    description: "Personnalisez votre espace littéraire et listez vos genres préférés.",
  },
  {
    icon: MessageSquareText,
    title: "Partagez vos critiques",
    description: "Donnez votre avis sur vos lectures et inspirez les autres membres.",
  },
  {
    icon: Users,
    title: "Rejoignez des clubs",
    description: "Intégrez des cercles de lecture thématiques et échangez en profondeur.",
  },
  {
    icon: Video,
    title: "Cafés virtuels",
    description: "Participez à des rencontres vidéo mensuelles avec des auteurs invités.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-border">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Comment ça marche ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Une plateforme pensée pour les amoureux des belles lettres.
            </p>
          </div>
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
              className="feature-card group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
