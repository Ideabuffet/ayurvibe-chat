import { Apple, Calendar, Brain, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoshaType } from "@/types/dosha";

interface DoshaRecommendationsProps {
  dominantDosha: DoshaType;
}

export const DoshaRecommendations = ({ dominantDosha }: DoshaRecommendationsProps) => {
  const navigate = useNavigate();

  const handleNavigate = (category: string) => {
    navigate(`/chat/${category}?dosha=${dominantDosha}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-center">Что дальше?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-ayurveda-accent/5 group"
          onClick={() => handleNavigate('nutrition')}
        >
          <div className="flex items-center space-x-3 w-full">
            <div className="bg-ayurveda-primary/10 p-2 rounded-full group-hover:bg-ayurveda-primary/20 transition-colors">
              <Apple className="h-5 w-5 text-ayurveda-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">Питание</div>
              <div className="text-sm text-muted-foreground">
                Рекомендации по питанию
              </div>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full bg-white hover:bg-ayurveda-accent/5 group"
          onClick={() => handleNavigate('health')}
        >
          <div className="flex items-center space-x-3 w-full">
            <div className="bg-ayurveda-primary/10 p-2 rounded-full group-hover:bg-ayurveda-primary/20 transition-colors">
              <HeartPulse className="h-5 w-5 text-ayurveda-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">Здоровье</div>
              <div className="text-sm text-muted-foreground">
                Здоровье и лечение
              </div>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full bg-white hover:bg-ayurveda-accent/5 group"
          onClick={() => handleNavigate('meditation')}
        >
          <div className="flex items-center space-x-3 w-full">
            <div className="bg-ayurveda-primary/10 p-2 rounded-full group-hover:bg-ayurveda-primary/20 transition-colors">
              <Brain className="h-5 w-5 text-ayurveda-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">Медитация</div>
              <div className="text-sm text-muted-foreground">
                Практики и медитации
              </div>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full bg-white hover:bg-ayurveda-accent/5 group"
          onClick={() => handleNavigate('routine')}
        >
          <div className="flex items-center space-x-3 w-full">
            <div className="bg-ayurveda-primary/10 p-2 rounded-full group-hover:bg-ayurveda-primary/20 transition-colors">
              <Calendar className="h-5 w-5 text-ayurveda-primary" />
            </div>
            <div className="text-left">
              <div className="font-medium">Распорядок</div>
              <div className="text-sm text-muted-foreground">
                Ежедневные рутины
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};