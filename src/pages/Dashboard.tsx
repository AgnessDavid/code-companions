import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import BookRecommendations from "@/components/dashboard/BookRecommendations";
import QuoteOfTheDay from "@/components/dashboard/QuoteOfTheDay";
import ReadingCalendar from "@/components/dashboard/ReadingCalendar";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  display_name: string | null;
  membership_type: string | null;
  avatar_url: string | null;
}

interface Club {
  id: string;
  name: string;
  abbreviation: string;
}

interface Activity {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  event_date: string;
  location: string | null;
}

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState({
    booksRead: 0,
    booksThisMonth: 0,
    reviewsCount: 0,
    reviewsThisMonth: 0,
    goalProgress: 0,
    goalTarget: 20,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("display_name, membership_type, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle();
    setProfile(profileData);

    // Fetch user's clubs
    const { data: memberData } = await supabase
      .from("club_members")
      .select("club_id, reading_clubs(id, name, abbreviation)")
      .eq("user_id", user.id);
    
    if (memberData) {
      const userClubs = memberData
        .map((m) => m.reading_clubs as unknown as Club)
        .filter(Boolean);
      setClubs(userClubs);
    }

    // Fetch activities
    const { data: activityData } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);
    setActivities(activityData || []);

    // Fetch upcoming events
    const { data: eventData } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", new Date().toISOString())
      .order("event_date", { ascending: true })
      .limit(3);
    setEvents(eventData || []);

    // Fetch book recommendations
    const { data: bookData } = await supabase
      .from("books")
      .select("*")
      .limit(6);
    setBooks(bookData || []);

    // Fetch stats
    const currentYear = new Date().getFullYear();
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

    const { data: userBooksData } = await supabase
      .from("user_books")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "finished");

    const { data: reviewsData } = await supabase
      .from("reviews")
      .select("*")
      .eq("user_id", user.id);

    const { data: goalData } = await supabase
      .from("reading_goals")
      .select("*")
      .eq("user_id", user.id)
      .eq("year", currentYear)
      .maybeSingle();

    const booksThisMonth = (userBooksData || []).filter(
      (b) => b.finished_at && new Date(b.finished_at) >= new Date(startOfMonth)
    ).length;

    const reviewsThisMonth = (reviewsData || []).filter(
      (r) => new Date(r.created_at) >= new Date(startOfMonth)
    ).length;

    setStats({
      booksRead: userBooksData?.length || 0,
      booksThisMonth,
      reviewsCount: reviewsData?.length || 0,
      reviewsThisMonth,
      goalProgress: userBooksData?.length || 0,
      goalTarget: goalData?.target_books || 20,
    });
  };

  const handleEventRegister = async (eventId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("event_registrations")
      .insert({ event_id: eventId, user_id: user.id });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Déjà inscrit",
          description: "Vous êtes déjà inscrit à cet événement",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de s'inscrire à l'événement",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Inscription confirmée !",
        description: "Vous êtes inscrit à l'événement",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-burgundy">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream flex w-full">
      <DashboardSidebar profile={profile} clubs={clubs} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground pl-10 md:pl-0">
              Bonjour, {profile?.display_name?.split(" ")[0] || "Lecteur"} !
            </h1>
            <p className="text-muted-foreground mt-1">
              Ravi de vous revoir au Café des Lettres. Voici vos lectures du jour.
            </p>
          </div>

          {/* Stats */}
          <StatsCards {...stats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity activities={activities} />
              <BookRecommendations books={books} />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              <UpcomingEvents events={events} onRegister={handleEventRegister} />
              <QuoteOfTheDay />
              <ReadingCalendar readingDays={[3, 5]} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
