import { Apple, Calendar, Brain, HeartPulse, Leaf, Utensils, Moon, Palette, Coffee, Sprout, Flask, Droplets, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoshaType } from "@/types/dosha";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface DoshaRecommendationsProps {
  dominantDosha: DoshaType;
}

const recommendationCategories = {
  nutrition: {
    icon: Apple,
    title: "Питание",
    description: "Рекомендации по питанию",
    path: "nutrition"
  },
  health: {
    icon: HeartPulse,
    title: "Здоровье",
    description: "Здоровье и лечение",
    path: "health"
  },
  meditation: {
    icon: Brain,
    title: "Медитация",
    description: "Практики и медитации",
    path: "meditation"
  },
  routine: {
    icon: Calendar,
    title: "Распорядок",
    description: "Ежедневные рутины",
    path: "routine"
  }
};

export const DoshaRecommendations = ({ dominantDosha }: DoshaRecommendationsProps) => {
  const navigate = useNavigate();

  const handleNavigate = (category: string) => {
    navigate(`/chat/${category}?dosha=${dominantDosha}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif font-medium text-ayurveda-primary">
          Рекомендации для вашей доши
        </h3>
        <p className="text-ayurveda-text/60">
          Выберите категорию для получения персонализированных рекомендаций
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(recommendationCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <Card
              key={key}
              className="group relative overflow-hidden border-ayurveda-accent/20 hover:border-ayurveda-primary/40 transition-colors"
            >
              <Button
                variant="ghost"
                className="w-full h-full p-6 hover:bg-ayurveda-accent/5"
                onClick={() => handleNavigate(category.path)}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="bg-ayurveda-primary/10 p-3 rounded-full group-hover:bg-ayurveda-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-ayurveda-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-lg">{category.title}</div>
                    <div className="text-sm text-ayurveda-text/60">
                      {category.description}
                    </div>
                  </div>
                </div>
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-ayurveda-text/60 mt-8">
        Нажмите на категорию для получения подробных рекомендаций
      </div>
    </div>
  );
};