import { HeartPulse, Brain, Calendar, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoshaType } from "@/types/dosha";
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { DoshaNutritionSection } from "./DoshaNutritionSection";

interface DoshaRecommendationsProps {
  dominantDosha: DoshaType;
}

export const DoshaRecommendations = ({ dominantDosha }: DoshaRecommendationsProps) => {
  const navigate = useNavigate();

  const handleNavigate = (category: string) => {
    navigate(`/chat/${category}?dosha=${dominantDosha}`);
  };

  return (
    <div className="space-y-8 p-6 bg-white/80 backdrop-blur rounded-lg">
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold tracking-wide text-ayurveda-primary">
          {dominantDosha === 'kapha' ? 'КАПХА' : dominantDosha.toUpperCase()} ДОША
        </h2>
      </div>

      <DoshaNutritionSection dominantDosha={dominantDosha} />

      <div className="mt-8 space-y-6">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          ПЕРСОНАЛИЗИРОВАННЫЕ РЕКОМЕНДАЦИИ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => handleNavigate('health')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <HeartPulse className="h-5 w-5" />
            Рекомендации по здоровью
          </Button>
          <Button 
            onClick={() => handleNavigate('meditation')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Brain className="h-5 w-5" />
            Медитации и практики
          </Button>
          <Button 
            onClick={() => handleNavigate('routine')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Calendar className="h-5 w-5" />
            Режим дня
          </Button>
          <Button 
            onClick={() => handleNavigate('nutrition')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Apple className="h-5 w-5" />
            Подробнее о питании
          </Button>
        </div>

        <Card className="p-4">
          <ChatContainer category="dosha" dosha={dominantDosha} />
        </Card>
      </div>
    </div>
  );
};