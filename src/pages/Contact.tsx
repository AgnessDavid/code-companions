import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-library.jpg";

const faqItems = [
  {
    question: "Comment puis-je créer un compte ?",
    answer: "C'est très simple ! Cliquez sur le bouton \"S'inscrire\" en haut à droite de la page. Remplissez le formulaire avec votre nom, votre email et choisissez un mot de passe sécurisé. Vous recevrez un email de confirmation pour activer votre accès à notre bibliothèque numérique.",
  },
  {
    question: "Comment rejoindre un club de lecture ?",
    answer: "Une fois connecté, rendez-vous dans la section \"Clubs\". Vous y trouverez la liste des thématiques actuelles (Classiques, Poésie moderne, Polar, etc.). Cliquez sur le club qui vous intéresse pour voir les prochaines dates de rencontre et cliquez sur \"Rejoindre\".",
  },
  {
    question: "Puis-je organiser un événement privé au Café ?",
    answer: "Absolument. Nous mettons nos salons à disposition pour des lancements de livres, des cercles littéraires ou des ateliers d'écriture. Veuillez nous envoyer une demande détaillée via le formulaire de contact ci-dessus avec la date souhaitée et le nombre de participants.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    toast.success("Message envoyé avec succès ! Nous vous répondrons sous 48h.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img src={heroImage} alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-serif font-bold text-white"
            >
              Contactez-nous
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 italic mt-2"
            >
              Une question ? Une suggestion ? Nous sommes à votre écoute.
            </motion.p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Nom complet</label>
                    <Input
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">E-mail</label>
                    <Input
                      type="email"
                      placeholder="jean.dupont@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={255}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Objet</label>
                  <Input
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    maxLength={200}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Votre message</label>
                  <Textarea
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={1000}
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-burgundy-dark gap-2">
                  <Send className="w-4 h-4" /> Envoyer le message
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
              <h2 className="text-xl font-serif font-bold text-foreground">Nos coordonnées</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Adresse", value: "42 Rue de la Littérature\n75005 Paris, France" },
                  { icon: Mail, label: "Email", value: "contact@cafedeslettres.fr" },
                  { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{label}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden h-48 bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">PARIS</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cream/30 to-cream-dark/30" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-cream-dark py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Questions Fréquentes</h2>
              <p className="text-muted-foreground italic mt-2">Retrouvez ici les réponses aux interrogations les plus courantes.</p>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <AccordionItem value={`item-${i}`} className="bg-background rounded-xl border border-border px-5">
                    <AccordionTrigger className="font-serif font-bold text-foreground text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
