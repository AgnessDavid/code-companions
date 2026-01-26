import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Event {
  id: string;
  title: string;
  event_date: string;
  location: string | null;
}

interface UpcomingEventsProps {
  events: Event[];
  onRegister: (eventId: string) => void;
}

const UpcomingEvents = ({ events, onRegister }: UpcomingEventsProps) => {
  if (events.length === 0) {
    return (
      <Card className="border-burgundy/10">
        <CardHeader>
          <CardTitle className="font-serif text-lg uppercase tracking-wide text-primary">
            Événements à venir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Aucun événement à venir</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-burgundy/10">
      <CardHeader>
        <CardTitle className="font-serif text-lg uppercase tracking-wide text-primary">
          Événements à venir
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => {
          const eventDate = new Date(event.event_date);
          return (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-burgundy text-cream rounded-lg px-3 py-2 min-w-[60px]">
                <span className="text-xs uppercase">{format(eventDate, "MMM", { locale: fr })}</span>
                <span className="text-2xl font-bold">{format(eventDate, "d")}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {format(eventDate, "HH:mm", { locale: fr })} • {event.location || "En ligne"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs border-burgundy text-burgundy hover:bg-burgundy hover:text-cream"
                  onClick={() => onRegister(event.id)}
                >
                  S'inscrire
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
