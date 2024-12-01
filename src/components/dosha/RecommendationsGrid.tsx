import { Button } from "@/components/ui/button";
import { HeartPulse, Brain, Calendar, Apple, Flower2, Utensils, Stethoscope, Droplets, Heart, Sparkles, Zap, Moon, Crown } from "lucide-react";
import { premiumFeatures } from "@/constants/premiumFeatures";

interface RecommendationsGridProps {
  hasActiveSubscription: boolean;
  handleNavigate: (category: string) => void;
}

export const RecommendationsGrid = ({ hasActiveSubscription, handleNavigate }: RecommendationsGridProps) => {
  return (
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
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Flower2 className="h-5 w-5" />
        Травяные средства
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
      </Button>
      <Button 
        onClick={() => handleNavigate('diet')}
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Utensils className="h-5 w-5" />
        Диетические рекомендации
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
      </Button>
      <Button 
        onClick={() => handleNavigate('chronic')}
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Stethoscope className="h-5 w-5" />
        Хронические заболевания
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
      </Button>
      <Button 
        onClick={() => handleNavigate('detox')}
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Droplets className="h-5 w-5" />
        Детокс и очищение
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
      </Button>
      <Button 
        onClick={() => handleNavigate('stress')}
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Heart className="h-5 w-5" />
        Стресс и эмоции
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
      </Button>
      <Button 
        onClick={() => handleNavigate('beauty')}
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Sparkles className="h-5 w-5" />
        Красота и уход за кожей
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
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
        className="relative w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
      >
        <Moon className="h-5 w-5" />
        Улучшение сна
        {!hasActiveSubscription && (
          <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />
        )}
      </Button>
    </div>
  );
};