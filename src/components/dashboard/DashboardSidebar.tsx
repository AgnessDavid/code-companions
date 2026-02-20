import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  Settings, 
  HelpCircle, 
  LogOut,
  PenLine,
  Menu,
  X
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
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const sidebarContent = (
    <>
      {/* User Profile */}
      <div className="p-4 sm:p-6 border-b border-burgundy/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-burgundy/20 flex items-center justify-center overflow-hidden shrink-0">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif text-burgundy text-base sm:text-lg">
                {profile?.display_name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-serif font-semibold text-foreground truncate">
              {profile?.display_name || "Utilisateur"}
            </h3>
            <p className="text-xs text-primary uppercase tracking-wide">
              {profile?.membership_type || "Membre"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={() => setOpen(false)}
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

        {clubs.length > 0 && (
          <div className="pt-6">
            <h4 className="px-4 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Clubs actifs
            </h4>
            {clubs.map((club) => (
              <NavLink
                key={club.id}
                to={`/dashboard/clubs/${club.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-burgundy/10 rounded-lg transition-colors"
              >
                <span className="w-8 h-8 rounded bg-burgundy/10 text-burgundy text-xs font-semibold flex items-center justify-center shrink-0">
                  {club.abbreviation}
                </span>
                <span className="text-sm truncate">{club.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* New Post Button */}
      <div className="p-3 sm:p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-burgundy text-cream py-3 px-4 rounded-lg hover:bg-burgundy/90 transition-colors">
          <PenLine className="w-5 h-5" />
          Nouveau Post
        </button>
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-burgundy/10 space-y-1">
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
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-md"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-cream-dark border-r border-burgundy/10 flex flex-col h-screen sticky top-0 z-40 transition-transform duration-300",
          "fixed md:relative w-64",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
