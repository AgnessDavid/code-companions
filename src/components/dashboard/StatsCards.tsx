import { BookOpen, MessageSquare, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsCardsProps {
  booksRead: number;
  booksThisMonth: number;
  reviewsCount: number;
  reviewsThisMonth: number;
  goalProgress: number;
  goalTarget: number;
}

const StatsCards = ({
  booksRead,
  booksThisMonth,
  reviewsCount,
  reviewsThisMonth,
  goalProgress,
  goalTarget,
}: StatsCardsProps) => {
  const progressPercentage = Math.round((goalProgress / goalTarget) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Books Read */}
      <Card className="border-burgundy/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Livres lus ({new Date().getFullYear()})</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-serif font-bold text-foreground">{booksRead}</span>
                {booksThisMonth > 0 && (
                  <span className="text-sm text-primary">+{booksThisMonth} ce mois</span>
                )}
              </div>
            </div>
            <div className="p-2 bg-burgundy/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-burgundy" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="border-burgundy/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critiques publiées</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-serif font-bold text-foreground">{reviewsCount}</span>
                {reviewsThisMonth > 0 && (
                  <span className="text-sm text-primary">+{reviewsThisMonth}</span>
                )}
              </div>
            </div>
            <div className="p-2 bg-burgundy/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-burgundy" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Goal */}
      <Card className="border-burgundy/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="w-full">
              <p className="text-sm text-muted-foreground">Objectif annuel</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-serif font-bold text-foreground">{progressPercentage}%</span>
                <span className="text-sm text-primary">{goalProgress}/{goalTarget} livres</span>
              </div>
              <Progress value={progressPercentage} className="mt-3 h-2" />
            </div>
            <div className="p-2 bg-burgundy/10 rounded-lg ml-4">
              <Target className="w-5 h-5 text-burgundy" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
