import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};