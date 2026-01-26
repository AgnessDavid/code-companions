import { Search, Bell, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  breadcrumb?: string[];
}

const DashboardHeader = ({ breadcrumb = ["Accueil", "Tableau de bord"] }: DashboardHeaderProps) => {
  return (
    <header className="h-16 border-b border-burgundy/10 bg-cream px-6 flex items-center justify-between">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumb.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-muted-foreground">/</span>}
            <span className={index === breadcrumb.length - 1 ? "font-medium text-foreground" : "text-muted-foreground"}>
              {item}
            </span>
          </span>
        ))}
      </nav>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un livre, un auteur..."
            className="pl-10 w-64 bg-cream-dark border-burgundy/20"
          />
        </div>
        <button className="p-2 text-foreground hover:bg-burgundy/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-foreground hover:bg-burgundy/10 rounded-lg transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
