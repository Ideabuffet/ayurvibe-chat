import { Button } from "@/components/ui/button";
import { Apple, HeartPulse, Brain, Calendar } from "lucide-react";

interface NavigationButtonsProps {
  onNavigate: (category: string) => void;
  currentCategory?: string;
}

export const NavigationButtons = ({ onNavigate, currentCategory }: NavigationButtonsProps) => {
  const getButtonClass = (category: string) => {
    const baseClass = "w-full";
    const activeClass = currentCategory === category 
      ? "bg-ayurveda-primary text-white hover:bg-ayurveda-primary/90" 
      : "bg-white hover:bg-ayurveda-accent/5";
    return `${baseClass} ${activeClass}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <Button 
        className={getButtonClass('nutrition')}
        variant={currentCategory === 'nutrition' ? 'default' : 'outline'}
        onClick={() => onNavigate('nutrition')}
      >
        <Apple className="mr-2 h-5 w-5" />
        Рекомендации по питанию
      </Button>
      <Button 
        className={getButtonClass('health')}
        variant={currentCategory === 'health' ? 'default' : 'outline'}
        onClick={() => onNavigate('health')}
      >
        <HeartPulse className="mr-2 h-5 w-5" />
        Здоровье и лечение
      </Button>
      <Button 
        className={getButtonClass('meditation')}
        variant={currentCategory === 'meditation' ? 'default' : 'outline'}
        onClick={() => onNavigate('meditation')}
      >
        <Brain className="mr-2 h-5 w-5" />
        Практики и медитации
      </Button>
      <Button 
        className={getButtonClass('routine')}
        variant={currentCategory === 'routine' ? 'default' : 'outline'}
        onClick={() => onNavigate('routine')}
      >
        <Calendar className="mr-2 h-5 w-5" />
        Ежедневные рутины
      </Button>
    </div>
  );
};