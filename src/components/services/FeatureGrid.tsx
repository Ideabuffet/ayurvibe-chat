import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FeatureGrid = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          onClick={() => navigate("/consultation")}
          className="group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in"
        >
          <div className="w-16 h-16 rounded-full bg-ayurveda-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-8 h-8 text-ayurveda-gold" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-white mb-4 group-hover:text-ayurveda-gold transition-colors">
            Персональная диагностика
          </h3>
          <p className="text-white/80">
            Определите свой тип доши и получите индивидуальные рекомендации для поддержания баланса
          </p>
        </div>

        <div 
          onClick={() => navigate("/chat/general")}
          className="group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in delay-100"
        >
          <div className="w-16 h-16 rounded-full bg-ayurveda-teal/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-8 h-8 text-ayurveda-teal" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-white mb-4 group-hover:text-ayurveda-teal transition-colors">
            Экспертная поддержка
          </h3>
          <p className="text-white/80">
            Получите консультацию от опытных специалистов по Аюрведе и найдите ответы на ваши вопросы
          </p>
        </div>

        <div 
          onClick={() => navigate("/education")}
          className="group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in delay-200"
        >
          <div className="w-16 h-16 rounded-full bg-ayurveda-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-ayurveda-accent" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-white mb-4 group-hover:text-ayurveda-accent transition-colors">
            Холистический подход
          </h3>
          <p className="text-white/80">
            Комплексные программы для достижения баланса тела, ума и духа
          </p>
        </div>
      </div>
    </div>
  );
};