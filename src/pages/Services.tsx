import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Sparkles, ArrowRight, Users, Star, Clock, Shield, Leaf, BookOpen } from "lucide-react";
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

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-ayurveda-primary mb-2">5000+</div>
            <p className="text-ayurveda-text/70">Довольных клиентов</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-ayurveda-primary mb-2">15+</div>
            <p className="text-ayurveda-text/70">Лет опыта</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-ayurveda-primary mb-2">100%</div>
            <p className="text-ayurveda-text/70">Натуральные средства</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-ayurveda-primary mb-2">24/7</div>
            <p className="text-ayurveda-text/70">Поддержка</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16 bg-ayurveda-accent/5 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-ayurveda-primary mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-ayurveda-text/70 max-w-2xl mx-auto">
            Мы предлагаем комплексный подход к здоровью, основанный на древних знаниях Аюрведы и современных технологиях
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-ayurveda-gold/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-ayurveda-gold" />
            </div>
            <h3 className="text-xl font-serif font-medium text-ayurveda-primary mb-4">
              Персональный подход
            </h3>
            <p className="text-ayurveda-text/70">
              Индивидуальные рекомендации с учетом вашей конституции и образа жизни
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-ayurveda-teal/10 rounded-full flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-ayurveda-teal" />
            </div>
            <h3 className="text-xl font-serif font-medium text-ayurveda-primary mb-4">
              Опытные специалисты
            </h3>
            <p className="text-ayurveda-text/70">
              Консультации от сертифицированных врачей с многолетним опытом
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-ayurveda-accent/10 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-ayurveda-accent" />
            </div>
            <h3 className="text-xl font-serif font-medium text-ayurveda-primary mb-4">
              Безопасность
            </h3>
            <p className="text-ayurveda-text/70">
              Только проверенные методики и натуральные препараты
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-ayurveda-primary mb-4">
            Как это работает
          </h2>
          <p className="text-ayurveda-text/70 max-w-2xl mx-auto">
            Простой путь к гармонии и здоровью с помощью Аюрведы
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-ayurveda-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-ayurveda-gold" />
            </div>
            <h3 className="text-xl font-serif font-medium text-ayurveda-primary mb-4">
              1. Определите свою дошу
            </h3>
            <p className="text-ayurveda-text/70">
              Пройдите тест и узнайте свою конституцию
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ayurveda-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-ayurveda-teal" />
            </div>
            <h3 className="text-xl font-serif font-medium text-ayurveda-primary mb-4">
              2. Получите консультацию
            </h3>
            <p className="text-ayurveda-text/70">
              Обсудите свои цели со специалистом
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ayurveda-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-ayurveda-accent" />
            </div>
            <h3 className="text-xl font-serif font-medium text-ayurveda-primary mb-4">
              3. Следуйте рекомендациям
            </h3>
            <p className="text-ayurveda-text/70">
              Внедряйте полученные советы в свою жизнь
            </p>
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
