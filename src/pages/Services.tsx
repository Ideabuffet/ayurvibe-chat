import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { ServiceButton } from "@/components/ServiceButton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-b from-ayurveda-background to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-ayurveda-gold/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 pt-16 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ayurveda-accent/10 text-ayurveda-primary animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Откройте для себя мудрость Аюрведы</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-ayurveda-primary leading-tight animate-message-appear">
              Ваш путь к <span className="text-ayurveda-gold">гармонии</span> и <span className="text-ayurveda-teal">здоровью</span>
            </h1>
            
            <p className="text-lg md:text-xl text-ayurveda-text/80 max-w-2xl mx-auto animate-message-appear delay-100">
              Персонализированный подход к здоровью, основанный на древней мудрости Аюрведы и современных технологиях
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-message-appear delay-200">
              <Button
                size="lg"
                onClick={() => navigate("/chat/dosha")}
                className="bg-gradient-to-r from-ayurveda-teal to-ayurveda-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-white text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Определить свою дошу
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/chat/general")}
                className="border-2 border-ayurveda-primary text-ayurveda-primary hover:bg-ayurveda-primary/5 transition-all duration-300 transform hover:scale-105 text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Задать вопрос эксперту
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px bg-ayurveda-accent/30 flex-1" />
          <div className="text-ayurveda-gold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="h-px bg-ayurveda-accent/30 flex-1" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div 
            onClick={() => navigate("/consultation")}
            className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in"
          >
            <div className="w-16 h-16 rounded-full bg-ayurveda-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-ayurveda-gold" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-ayurveda-primary mb-4 group-hover:text-ayurveda-gold transition-colors">
              Персональная диагностика
            </h3>
            <p className="text-ayurveda-text/70">
              Определите свой тип доши и получите индивидуальные рекомендации для поддержания баланса
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => navigate("/chat/general")}
            className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in delay-100"
          >
            <div className="w-16 h-16 rounded-full bg-ayurveda-teal/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-8 h-8 text-ayurveda-teal" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-ayurveda-primary mb-4 group-hover:text-ayurveda-teal transition-colors">
              Экспертная поддержка
            </h3>
            <p className="text-ayurveda-text/70">
              Получите консультацию от опытных специалистов по Аюрведе и найдите ответы на ваши вопросы
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => navigate("/education")}
            className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in delay-200"
          >
            <div className="w-16 h-16 rounded-full bg-ayurveda-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-ayurveda-accent" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-ayurveda-primary mb-4 group-hover:text-ayurveda-accent transition-colors">
              Холистический подход
            </h3>
            <p className="text-ayurveda-text/70">
              Комплексные программы для достижения баланса тела, ума и духа
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;