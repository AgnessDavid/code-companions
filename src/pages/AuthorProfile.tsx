import { motion } from "framer-motion";
import { Book, Mail, UserPlus, Pen, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import heroImage from "@/assets/hero-library.jpg";

const authorBooks = [
  { title: "L'Ombre du Quai", year: "2023", genre: "Roman Noir", cover: book1 },
  { title: "Les Brumes d'Antan", year: "2021", genre: "Thriller", cover: book2 },
  { title: "Le Silence des Pages", year: "2019", genre: "Essai", cover: book3 },
  { title: "Échos du Soir", year: "2017", genre: "Poésie", cover: book4 },
];

const articles = [
  {
    category: "CHRONIQUES",
    date: "12 OCTOBRE 2023",
    title: "Pourquoi le polar ne meurt jamais ?",
    excerpt: "Analyse de la fascination humaine pour l'énigme et le danger, des classiques d'Agatha Christie aux thrillers scandinaves contemporains...",
    cover: book1,
  },
  {
    category: "RÉFLEXIONS",
    date: "05 OCTOBRE 2023",
    title: "L'importance du silence dans l'écriture",
    excerpt: "Comment l'absence de mots forge le rythme d'une phrase. Une plongée dans le minimalisme littéraire et l'art de la suggestion.",
    cover: book3,
  },
];

const AuthorProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Banner */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img src={heroImage} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:left-12 flex items-end gap-3 sm:gap-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-background bg-muted overflow-hidden shadow-lg"
            >
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-serif">JL</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">Julien Lefebvre</h1>
              <p className="text-white/80 text-sm">Romancier & Critique Littéraire</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">À propos de l'auteur</h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Spécialiste du Roman Noir et de la Littérature Classique. Passionné par l'encre et les mots, j'explore les zones d'ombre de l'âme humaine à travers mes récits policiers et mes essais sur les grands maîtres du XIXe siècle. Lauréat du Prix des Lettres Modernes 2022.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["#RomanNoir", "#Essai", "#Critique"].map((tag) => (
                    <Badge key={tag} className="bg-primary text-primary-foreground">{tag}</Badge>
                  ))}
                </div>
              </motion.section>

              {/* Stats */}
              <div className="flex gap-6 sm:gap-8">
                <div className="text-right">
                  <p className="text-2xl font-serif font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Livres</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-serif font-bold text-primary">8.4k</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Lecteurs</p>
                </div>
              </div>

              {/* Bibliography */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-serif font-bold text-foreground">Ma Bibliographie</h2>
                  <button className="text-sm text-primary hover:underline">Voir tout</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {authorBooks.map((book, i) => (
                    <motion.div
                      key={book.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 shadow-md group-hover:shadow-lg transition-shadow">
                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h3 className="font-medium text-sm text-foreground">{book.title}</h3>
                      <p className="text-xs text-muted-foreground">{book.year} • {book.genre}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Writing desk */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-cream-dark rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Pen className="w-4 h-4 text-primary" />
                  <h3 className="font-serif font-bold text-foreground">Sur ma table d'écriture</h3>
                </div>
                <p className="text-muted-foreground italic leading-relaxed mb-4">
                  "Je travaille actuellement sur une nouvelle série se déroulant dans le Paris des années 50. Un mélange de polar et de réalisme social. Le premier tome 'Les Ombres du Marais' est en phase de relecture finale."
                </p>
                <div className="flex items-center gap-3">
                  <Progress value={85} className="flex-1" />
                  <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">85% DU PROJET TERMINÉ</span>
                </div>
              </motion.section>

              {/* Articles */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-xl font-serif font-bold text-foreground mb-5 pb-2 border-b border-border">Mes Articles & Chroniques</h2>
                <div className="space-y-6">
                  {articles.map((article, i) => (
                    <motion.div
                      key={article.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex gap-5 group cursor-pointer"
                    >
                      <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                        <img src={article.cover} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                          {article.category} • {article.date}
                        </p>
                        <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-burgundy-dark gap-2">
                <UserPlus className="w-4 h-4" /> Suivre l'auteur
              </Button>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                <Mail className="w-4 h-4" /> Envoyer un message
              </Button>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Suivre ailleurs</p>
                <div className="flex gap-3">
                  {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-cream-dark rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="w-4 h-4 text-primary" />
                  <h4 className="font-serif font-bold text-foreground text-sm">Club de Lecture</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Rejoignez mon club pour discuter de mes prochaines sorties en avant-première.
                </p>
                <a href="/clubs" className="text-sm font-semibold text-primary hover:underline">En savoir plus</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorProfile;
