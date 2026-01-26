import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  Settings, 
  HelpCircle, 
  LogOut,
  PenLine
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  profile: {
    display_name: string | null;
    membership_type: string | null;
    avatar_url: string | null;
  } | null;
  clubs: Array<{ id: string; name: string; abbreviation: string }>;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard" },
  { icon: BookOpen, label: "Ma bibliothèque", path: "/dashboard/library" },
  { icon: Users, label: "Clubs de lecture", path: "/dashboard/clubs" },
  { icon: Calendar, label: "Calendrier", path: "/dashboard/calendar" },
  { icon: Settings, label: "Paramètres", path: "/dashboard/settings" },
];

const DashboardSidebar = ({ profile, clubs }: DashboardSidebarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-cream-dark border-r border-burgundy/10 flex flex-col h-screen sticky top-0">
      {/* User Profile */}
      <div className="p-6 border-b border-burgundy/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-burgundy/20 flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif text-burgundy text-lg">
                {profile?.display_name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-serif font-semibold text-foreground">
              {profile?.display_name || "Utilisateur"}
            </h3>
            <p className="text-xs text-primary uppercase tracking-wide">
              {profile?.membership_type || "Membre"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-burgundy text-cream"
                  : "text-foreground hover:bg-burgundy/10"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Active Clubs */}
        {clubs.length > 0 && (
          <div className="pt-6">
            <h4 className="px-4 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Clubs actifs
            </h4>
            {clubs.map((club) => (
              <NavLink
                key={club.id}
                to={`/dashboard/clubs/${club.id}`}
                className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-burgundy/10 rounded-lg transition-colors"
              >
                <span className="w-8 h-8 rounded bg-burgundy/10 text-burgundy text-xs font-semibold flex items-center justify-center">
                  {club.abbreviation}
                </span>
                <span className="text-sm">{club.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* New Post Button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-burgundy text-cream py-3 px-4 rounded-lg hover:bg-burgundy/90 transition-colors">
          <PenLine className="w-5 h-5" />
          Nouveau Post
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-burgundy/10 space-y-1">
        <button className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-burgundy/10 rounded-lg transition-colors w-full">
          <HelpCircle className="w-5 h-5" />
          Aide
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-burgundy/10 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
