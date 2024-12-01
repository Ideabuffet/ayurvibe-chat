import { Button } from "@/components/ui/button";
import { Apple, HeartPulse, Brain, Calendar } from "lucide-react";
import { DoshaType } from "@/types/dosha";

interface NavigationButtonsProps {
  onNavigate: (category: string) => void;
}

export const NavigationButtons = ({ onNavigate }: NavigationButtonsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <Button 
        className="w-full bg-white hover:bg-ayurveda-accent/5" 
        variant="outline"
        onClick={() => onNavigate('nutrition')}
      >
        <Apple className="mr-2 h-5 w-5 text-ayurveda-primary" />
        Рекомендации по питанию
      </Button>
      <Button 
        className="w-full bg-white hover:bg-ayurveda-accent/5" 
        variant="outline"
        onClick={() => onNavigate('health')}
      >
        <HeartPulse className="mr-2 h-5 w-5 text-ayurveda-primary" />
        Здоровье и лечение
      </Button>
      <Button 
        className="w-full bg-white hover:bg-ayurveda-accent/5" 
        variant="outline"
        onClick={() => onNavigate('meditation')}
      >
        <Brain className="mr-2 h-5 w-5 text-ayurveda-primary" />
        Практики и медитации
      </Button>
      <Button 
        className="w-full bg-white hover:bg-ayurveda-accent/5" 
        variant="outline"
        onClick={() => onNavigate('routine')}
      >
        <Calendar className="mr-2 h-5 w-5 text-ayurveda-primary" />
        Ежедневные рутины
      </Button>
    </div>
  );
};