import { HeartPulse, Brain, Calendar, Apple, Flower2, Utensils, User, Stethoscope, Droplets, Heart, Sparkles, Zap, Moon } from "lucide-react";
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
          <Button 
            onClick={() => handleNavigate('herbs')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Flower2 className="h-5 w-5" />
            Травяные средства
          </Button>
          <Button 
            onClick={() => handleNavigate('diet')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Utensils className="h-5 w-5" />
            Диетические рекомендации
          </Button>
          <Button 
            onClick={() => handleNavigate('lifestyle')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <User className="h-5 w-5" />
            Образ жизни
          </Button>
          <Button 
            onClick={() => handleNavigate('chronic')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Stethoscope className="h-5 w-5" />
            Хронические заболевания
          </Button>
          <Button 
            onClick={() => handleNavigate('detox')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Droplets className="h-5 w-5" />
            Детокс и очищение
          </Button>
          <Button 
            onClick={() => handleNavigate('stress')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Heart className="h-5 w-5" />
            Стресс и эмоции
          </Button>
          <Button 
            onClick={() => handleNavigate('beauty')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Sparkles className="h-5 w-5" />
            Красота и уход за кожей
          </Button>
          <Button 
            onClick={() => handleNavigate('energy')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Zap className="h-5 w-5" />
            Энергия и духовность
          </Button>
          <Button 
            onClick={() => handleNavigate('sleep')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Moon className="h-5 w-5" />
            Улучшение сна
          </Button>
        </div>

        <Card className="p-4">
          <ChatContainer category="dosha" dosha={dominantDosha} />
        </Card>
      </div>
    </div>
  );
};