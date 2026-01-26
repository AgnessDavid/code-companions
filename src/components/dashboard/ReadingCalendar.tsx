import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

interface ReadingCalendarProps {
  readingDays: number[];
}

const ReadingCalendar = ({ readingDays }: ReadingCalendarProps) => {
  const today = new Date();
  const currentDay = today.getDate();
  
  // Get first day of month and number of days
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0

  const days = ["L", "M", "M", "J", "V", "S", "D"];

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Only show first 2 weeks for compact view
  const visibleDays = calendarDays.slice(0, 14);

  return (
    <Card className="border-burgundy/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-serif text-lg uppercase tracking-wide text-primary">
          Calendrier de lecture
        </CardTitle>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day, index) => (
            <div key={index} className="text-center text-xs text-muted-foreground font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {visibleDays.map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg
                ${day === null ? "" : ""}
                ${day === currentDay ? "bg-primary text-cream font-bold" : ""}
                ${day && readingDays.includes(day) && day !== currentDay ? "bg-burgundy text-cream" : ""}
                ${day && !readingDays.includes(day) && day !== currentDay ? "text-foreground" : ""}
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingCalendar;
