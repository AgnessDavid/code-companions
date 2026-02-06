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
import { Search, Users, Plus, BookOpen, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Club {
  id: string;
  name: string;
  abbreviation: string;
  description: string | null;
  member_count?: number;
}

const categories = ["Tous les genres", "Fiction", "Philosophie", "Histoire", "Classiques", "Thriller", "Poésie"];

const Clubs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [userClubs, setUserClubs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous les genres");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchClubs();
    if (user) {
      fetchUserClubs();
    }
  }, [user, activeTab]);

  const fetchClubs = async () => {
    const { data: clubsData, error } = await supabase
      .from("reading_clubs")
      .select("*");

    if (!error && clubsData) {
      // Fetch member counts
      const { data: membersData } = await supabase
        .from("club_members")
        .select("club_id");

      const memberCounts: Record<string, number> = {};
      membersData?.forEach((m) => {
        memberCounts[m.club_id] = (memberCounts[m.club_id] || 0) + 1;
      });

      const clubsWithCounts = clubsData.map((club) => ({
        ...club,
        member_count: memberCounts[club.id] || 0,
      }));

      setClubs(clubsWithCounts);
    }
    setLoading(false);
  };

  const fetchUserClubs = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("club_members")
      .select("club_id")
      .eq("user_id", user.id);

    if (data) {
      setUserClubs(data.map((m) => m.club_id));
    }
  };

  const handleJoinClub = async (clubId: string) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour rejoindre un club.",
        variant: "destructive",
      });
      return;
    }

    if (userClubs.includes(clubId)) {
      // Leave club
      const { error } = await supabase
        .from("club_members")
        .delete()
        .eq("club_id", clubId)
        .eq("user_id", user.id);

      if (!error) {
        setUserClubs((prev) => prev.filter((id) => id !== clubId));
        toast({
          title: "Club quitté",
          description: "Vous avez quitté ce club.",
        });
        fetchClubs();
      }
    } else {
      // Join club
      const { error } = await supabase.from("club_members").insert({
        club_id: clubId,
        user_id: user.id,
      });

      if (!error) {
        setUserClubs((prev) => [...prev, clubId]);
        toast({
          title: "Bienvenue !",
          description: "Vous avez rejoint ce club de lecture.",
        });
        fetchClubs();
      }
    }
  };

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "my" && user) {
      return matchesSearch && userClubs.includes(club.id);
    }

    return matchesSearch;
  });

  const getClubBadge = (index: number) => {
    const badges = [
      { label: "Très actif", color: "bg-primary text-primary-foreground" },
      { label: "Élite", color: "bg-accent text-accent-foreground" },
      { label: "Nouveau", color: "bg-secondary text-secondary-foreground" },
    ];
    return badges[index % badges.length];
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
                Tous les Clubs de Lecture
              </h1>
              <p className="text-muted-foreground">
                Découvrez et rejoignez des cercles de lecture passionnés.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${viewMode === "grid" ? "bg-secondary" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${viewMode === "list" ? "bg-secondary" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              {user && (
                <Button className="bg-primary text-primary-foreground hover:bg-burgundy-dark gap-2">
                  <Plus className="w-4 h-4" />
                  Créer un Club
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Search */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent border-b border-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none bg-transparent"
                >
                  Tous les clubs
                </TabsTrigger>
                {user && (
                  <>
                    <TabsTrigger
                      value="my"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none bg-transparent"
                    >
                      Mes clubs
                    </TabsTrigger>
                    <TabsTrigger
                      value="trending"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none bg-transparent"
                    >
                      Tendances
                    </TabsTrigger>
                  </>
                )}
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-t-lg" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredClubs.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-serif text-xl text-foreground mb-2">
                Aucun club trouvé
              </h3>
              <p className="text-muted-foreground">
                {activeTab === "my"
                  ? "Vous n'avez rejoint aucun club pour l'instant."
                  : "Essayez de modifier vos critères de recherche."}
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
              {filteredClubs.map((club, index) => {
                const badge = getClubBadge(index);
                const isMember = userClubs.includes(club.id);

                return (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`group overflow-hidden border-border hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex flex-row" : ""}`}>
                      {/* Cover Image */}
                      <div className={`relative bg-gradient-to-br from-secondary to-muted ${viewMode === "list" ? "w-48 shrink-0" : "aspect-[3/4]"}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-4xl text-muted-foreground/50">
                            {club.abbreviation}
                          </span>
                        </div>
                        
                        {/* Badge */}
                        <Badge className={`absolute top-3 left-3 ${badge.color}`}>
                          {badge.label}
                        </Badge>
                      </div>

                      <CardContent className={`${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""} p-4`}>
                        <h3 className="font-serif font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                          {club.name}
                        </h3>

                        {/* Categories */}
                        <div className="flex gap-1 text-xs text-primary font-medium mb-3">
                          <span>Littérature</span>
                          <span className="text-muted-foreground">•</span>
                          <span>Classiques</span>
                        </div>

                        {/* Current Reading */}
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Lecture actuelle :</p>
                          <p className="text-sm text-foreground flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-primary" />
                            {club.description?.slice(0, 40) || "En attente de sélection"}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1.5 text-sm text-primary">
                            <Users className="w-4 h-4" />
                            <span>{club.member_count} membres</span>
                          </div>
                          
                          <Button
                            variant={isMember ? "outline" : "ghost"}
                            size="sm"
                            className={
                              isMember
                                ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                : "text-primary font-semibold hover:bg-primary/10"
                            }
                            onClick={() => handleJoinClub(club.id)}
                          >
                            {isMember ? "Quitter" : "Rejoindre"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {filteredClubs.length >= 6 && (
            <div className="text-center mt-10">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Charger plus de clubs
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clubs;
