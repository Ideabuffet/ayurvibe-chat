import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FeatureGrid = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          onClick={() => navigate("/consultation")}
          className="group p-8 rounded-2xl bg-white/80 border border-ayurveda-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-ayurveda-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-8 h-8 text-ayurveda-primary" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-ayurveda-primary mb-4">
            Персональная диагностика
          </h3>
          <p className="text-ayurveda-text">
            Определите свой тип доши и получите индивидуальные рекомендации для поддержания баланса
          </p>
        </div>

        <div 
          onClick={() => navigate("/chat/general")}
          className="group p-8 rounded-2xl bg-white/80 border border-ayurveda-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-ayurveda-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-8 h-8 text-ayurveda-primary" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-ayurveda-primary mb-4">
            Экспертная поддержка
          </h3>
          <p className="text-ayurveda-text">
            Получите консультацию от опытных специалистов по Аюрведе и найдите ответы на ваши вопросы
          </p>
        </div>

        <div 
          onClick={() => navigate("/education")}
          className="group p-8 rounded-2xl bg-white/80 border border-ayurveda-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-ayurveda-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-ayurveda-primary" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-ayurveda-primary mb-4">
            Холистический подход
          </h3>
          <p className="text-ayurveda-text">
            Комплексные программы для достижения баланса тела, ума и духа
          </p>
        </div>
      </div>
    </div>
  );
};