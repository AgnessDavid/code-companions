import { motion } from "framer-motion";
import { Heart, Bookmark, Share2, Calendar, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import articleHero from "@/assets/article-hero.jpg";
import articlePen from "@/assets/article-pen.jpg";
import relatedImg1 from "@/assets/article-related-1.jpg";
import relatedImg2 from "@/assets/article-related-2.jpg";
import relatedImg3 from "@/assets/article-related-3.jpg";

const relatedArticles = [
  {
    image: relatedImg1,
    category: "Architecture",
    title: "The Silent Majesty of Forgotten Libraries",
    excerpt: "Exploring the world's most beautiful and neglected book sanctuaries...",
  },
  {
    image: relatedImg2,
    category: "Culture",
    title: "Coffee & Classics: A Morning Ritual",
    excerpt: "How the perfect brew can unlock the depths of complex literature...",
  },
  {
    image: relatedImg3,
    category: "Poésie",
    title: "The Solitude of the Peak",
    excerpt: "Analyzing the motif of isolation in early romantic mountain poetry...",
  },
];

const Article = () => {
  const [likes, setLikes] = useState(136);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <section className="pt-24 sm:pt-32 pb-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-medium tracking-widest uppercase text-sm mb-6"
          >
            — Literary Essays —
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8"
          >
            La Renaissance de la Correspondance Manuscrite à l'Ère Numérique
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-muted-foreground text-sm"
          >
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">JV</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">Julian Vane</p>
                <p className="text-xs text-muted-foreground">Literary Critic</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Octobre 24, 2023</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="container mx-auto px-4 max-w-5xl mb-12"
      >
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src={articleHero} alt="Handwritten correspondence" className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover" />
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex gap-8">
          {/* Floating Sidebar Actions */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex flex-col items-center gap-6 sticky top-32 h-fit pt-4"
          >
            <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${liked ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-primary/10"}`}>
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </div>
              <span className="text-xs text-muted-foreground">{likes}</span>
            </button>
            <button onClick={() => setSaved(!saved)} className="flex flex-col items-center gap-1 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${saved ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-primary/10"}`}>
                <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
              </div>
              <span className="text-xs text-muted-foreground">Save</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-xs text-muted-foreground">Share</span>
            </button>
          </motion.aside>

          {/* Mobile Action Bar */}
          <div className="flex md:hidden justify-center gap-6 mb-6">
            <button onClick={handleLike} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${liked ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              </div>
              <span className="text-xs text-muted-foreground">{likes}</span>
            </button>
            <button onClick={() => setSaved(!saved)} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${saved ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              </div>
            </button>
            <button className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 prose prose-lg max-w-none"
          >
            <p className="text-lg text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Dans une ère dominée par la communication numérique instantanée, la grâce tactile d'une lettre manuscrite reste un témoignage inégalé de connexion humaine. Le poids du papier, la courbure unique de l'encre, et le rythme délibéré de la composition invitent un niveau d'intimité qu'un écran lumineux ne peut tout simplement pas reproduire.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">Le Rituel de l'Encre</h2>
            <p className="text-muted-foreground leading-relaxed">
              Il y a une qualité méditative dans la préparation : choisir la papeterie, remplir un stylo-plume à partir d'un encrier en verre, et sentir la légère résistance de la plume contre le grain du papier. Ce rituel exige de la présence. Contrairement à la nature éphémère d'un message texte, une lettre est un artefact physique d'un moment spécifique dans le temps.
            </p>

            {/* Mid-article image */}
            <div className="my-10 rounded-xl overflow-hidden shadow-lg">
              <img src={articlePen} alt="Fountain pen writing" className="w-full h-[300px] object-cover" />
              <p className="text-center text-sm text-muted-foreground py-3 bg-muted/30 italic">
                The ink flows like memory onto the page.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Psychologiquement, l'acte d'écrire à la main engage le cerveau de manières que la frappe ne pourra jamais reproduire. Cela force un ralentissement de la pensée, une curation de mots qui sont destinés à durer. Nous ne « supprimons » pas un trait de stylo ; nous l'incorporons, ou nous recommençons.
            </p>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-primary pl-6 my-10 italic text-foreground/80">
              <p className="text-lg">
                "Une lettre est un morceau de votre âme envoyé à distance. C'est la seule forme de voyage dans le temps accessible à l'homme ordinaire."
              </p>
            </blockquote>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">Un Héritage sur Papier</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les historiens du futur pourraient se retrouver dans un « âge sombre numérique » où nos serveurs ont été effacés et nos données ont disparu. Pourtant, les lettres du 18ème siècle restent, leur encre à peine estompée, leurs voix aussi claires que le jour où elles furent écrites. En reprenant le stylo, nous ne faisons pas que communiquer, nous préservons.
            </p>

            {/* Author Card */}
            <div className="bg-cream-dark/30 rounded-2xl p-4 sm:p-6 mt-12 flex flex-col sm:flex-row items-start gap-4">
              <Avatar className="w-14 h-14">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary">JV</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-serif font-bold text-foreground text-lg">About Julian Vane</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Julian est un romancier et essayiste dont le travail explore l'intersection entre l'artisanat traditionnel et la technologie moderne. Il vit dans un petit village en Provence, entouré de livres et de chats errants.
                </p>
                <Link to="/auteurs" className="text-primary text-sm font-medium mt-2 inline-block hover:underline">
                  View all articles by Julian →
                </Link>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Comments Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-12 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Conversation (12)</h2>

          {/* Sample Comment */}
          <div className="flex gap-3 sm:gap-4 mb-8 pb-6 border-b border-border">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">ER</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground text-sm">Eleanor Rigby</span>
                <span className="text-xs text-muted-foreground">il y a 3 heures</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cela résonne profondément. J'ai récemment commencé à écrire une lettre hebdomadaire à ma grand-mère. La connexion est tellement plus profonde que nos appels rapides habituels.
              </p>
              <div className="flex gap-4 mt-2">
                <button className="text-xs text-primary font-medium hover:underline">Reply</button>
                <button className="text-xs text-muted-foreground hover:text-primary">Like</button>
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Leave a comment</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Join the discussion..."
              className="mb-3 min-h-[100px] bg-background"
            />
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Post Comment
              </Button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Related Articles */}
      <section className="py-16 bg-cream-dark/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">More from Café des Lettres</h2>
            <Link to="/library" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedArticles.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-primary">{article.category}</span>
                <h3 className="font-serif text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm">{article.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Article;
