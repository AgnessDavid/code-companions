import { BookOpen, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Activity {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "book_added":
        return <BookOpen className="w-5 h-5" />;
      case "comment":
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "book_added":
        return "bg-burgundy/20 text-burgundy";
      case "comment":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="border-burgundy/10">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Mon activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Aucune activité récente</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-burgundy/10">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Mon activité récente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 bg-cream-dark rounded-lg">
            <div className={`p-2 rounded-lg ${getIconBg(activity.activity_type)}`}>
              {getIcon(activity.activity_type)}
            </div>
            <div className="flex-1">
              <p className="text-foreground" dangerouslySetInnerHTML={{ __html: activity.description }} />
              <p className="text-xs text-primary mt-1 uppercase">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: fr })}
              </p>
            </div>
            <button className="text-sm text-primary hover:underline">Voir</button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
