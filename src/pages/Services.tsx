import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import { ServiceButton } from "@/components/ServiceButton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Services = () => {
  const navigate = useNavigate();
  const [hasDosha, setHasDosha] = useState<boolean>(false);

  useEffect(() => {
    const checkDoshaResults = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('dosha')
          .eq('id', session.user.id)
          .single();
        
        setHasDosha(!!data?.dosha);
      }
    };

    checkDoshaResults();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ayurveda-background to-white p-8">
      <div className="container max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-ayurveda-text">
            Добро пожаловать в мир Аюрведы
          </h1>
          <p className="text-ayurveda-text/80 max-w-2xl mx-auto">
            {hasDosha 
              ? "Выберите интересующий вас раздел или задайте вопрос нашему эксперту"
              : "Определите свою дошу для получения персонализированных рекомендаций или задайте вопрос нашему эксперту"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <ServiceButton
            icon={Heart}
            label={hasDosha ? "Посмотреть результаты\nанализа доши" : "Определить вашу\nдошу"}
            onClick={() => navigate("/chat/dosha")}
            color="#D946EF"
          />
          <ServiceButton
            icon={MessageCircle}
            label="Задать вопрос\nэксперту"
            onClick={() => navigate("/chat/general")}
            color="#4A5D4F"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;