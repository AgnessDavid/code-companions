import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Video, MapPin, Calendar, ExternalLink, Copy, Check } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  meeting_url: string | null;
  event_type: string | null;
}

const categories = ["Tous", "Classiques", "Poésie", "Ateliers", "Fiction"];

const Events = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [category, setCategory] = useState("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    const now = new Date().toISOString();
    let query = supabase.from("events").select("*");

    if (filter === "upcoming") {
      query = query.gte("event_date", now);
    } else {
      query = query.lt("event_date", now);
    }

    const { data, error } = await query.order("event_date", { ascending: filter === "upcoming" });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour vous inscrire à un événement.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("event_registrations").insert({
      event_id: eventId,
      user_id: user.id,
    });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Déjà inscrit",
          description: "Vous êtes déjà inscrit à cet événement.",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de s'inscrire à l'événement.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Inscription réussie",
        description: "Vous êtes inscrit à cet événement !",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-cream-dark py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
                Agenda des Événements
              </h1>
              <p className="text-muted-foreground max-w-xl">
                Rejoignez nos cercles de lecture et cafés littéraires virtuels pour échanger autour des plus belles œuvres.
              </p>
            </div>
            {user && (
              <Button className="bg-primary text-primary-foreground hover:bg-burgundy-dark gap-2 self-start">
                <Plus className="w-4 h-4" />
                Proposer un événement
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="bg-card">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  À venir
                </TabsTrigger>
                <TabsTrigger value="past">Passés</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-serif text-xl text-foreground mb-2">
                Aucun événement {filter === "upcoming" ? "à venir" : "passé"}
              </h3>
              <p className="text-muted-foreground">
                {filter === "upcoming"
                  ? "De nouveaux événements seront bientôt annoncés."
                  : "Les événements passés apparaîtront ici."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => {
                const eventDate = new Date(event.event_date);
                const isVirtual = event.event_type === 'virtual' || event.event_type === 'hybrid' || !event.location || event.location.toLowerCase().includes("virtuel") || event.location.toLowerCase().includes("en ligne");
                const hasMeeting = !!event.meeting_url;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                      {/* Image placeholder with date overlay */}
                      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted">
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                        
                        {/* Date badge */}
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center min-w-[60px]">
                          <span className="text-xs uppercase font-medium block">
                            {format(eventDate, "MMM", { locale: fr })}
                          </span>
                          <span className="text-2xl font-bold block">
                            {format(eventDate, "d")}
                          </span>
                        </div>

                        {/* Virtual badge */}
                        {isVirtual && (
                          <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground gap-1">
                            <Video className="w-3 h-3" />
                            Virtuel
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-5">
                        {/* Category & Time */}
                        <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2">
                          <span className="uppercase tracking-wide">Littérature</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {format(eventDate, "HH:mm", { locale: fr })} CET
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {event.description || "Discussion littéraire passionnante à ne pas manquer."}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {isVirtual ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span>{event.location || "En ligne"}</span>
                          </div>
                          
                          {filter === "upcoming" && (
                            <div className="flex gap-2">
                              {hasMeeting && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-1"
                                  onClick={() => window.open(event.meeting_url!, "_blank")}
                                >
                                  <Video className="w-3 h-3" />
                                  Rejoindre
                                </Button>
                              )}
                              <Button
                                size="sm"
                                className="bg-primary text-primary-foreground hover:bg-burgundy-dark"
                                onClick={() => handleRegister(event.id)}
                              >
                                S'inscrire
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {events.length >= 6 && (
            <div className="text-center mt-10">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Voir plus d'événements
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
