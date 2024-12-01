import { HeartPulse, Brain, Calendar, Apple, Flower2, Utensils, Stethoscope, Droplets, Heart, Sparkles, Zap, Moon, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoshaType } from "@/types/dosha";
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { DoshaNutritionSection } from "./DoshaNutritionSection";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionDialog } from "../SubscriptionDialog";
import { useToast } from "@/components/ui/use-toast";
import { premiumFeatures } from "@/constants/premiumFeatures";

const RecommendationsGrid = ({ hasActiveSubscription, handleNavigate }: { 
  hasActiveSubscription: boolean;
  handleNavigate: (category: string) => void;
}) => {
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

export const DoshaRecommendations = ({ dominantDosha }: { dominantDosha: DoshaType }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data: subscriptions, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id);
        
        if (error) {
          console.error('Error fetching subscription:', error);
          return;
        }
        
        setHasActiveSubscription(subscriptions?.some(sub => sub.is_active) ?? false);
      }
    };

    checkSubscription();
  }, []);

  const handleNavigate = (category: string) => {
    if (premiumFeatures.includes(category as any) && !hasActiveSubscription) {
      setSelectedFeature(category);
      setShowSubscriptionDialog(true);
      return;
    }
    navigate(`/chat/${category}?dosha=${dominantDosha}`);
  };

  const handleSubscribe = async () => {
    toast({
      title: "Скоро будет доступно",
      description: "Функция оплаты находится в разработке",
    });
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
        
        <RecommendationsGrid 
          hasActiveSubscription={hasActiveSubscription}
          handleNavigate={handleNavigate}
        />

        <Card className="p-4">
          <ChatContainer category="dosha" dosha={dominantDosha} />
        </Card>
      </div>

      <SubscriptionDialog
        isOpen={showSubscriptionDialog}
        onClose={() => setShowSubscriptionDialog(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};