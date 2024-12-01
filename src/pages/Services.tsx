import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Heart,
  BookOpen,
  Droplets,
  Flower2,
  ArrowRight
} from "lucide-react";
import { HeroSection } from "@/components/services/HeroSection";
import { FeatureGrid } from "@/components/services/FeatureGrid";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Консультации",
      description: "Консультации с опытным аюрведическим специалистом",
      icon: <Heart className="w-8 h-8 text-white" />,
      path: "/consultation"
    },
    {
      title: "Лекарства",
      description: "Натуральные аюрведические препараты и добавки",
      icon: <Leaf className="w-8 h-8 text-white" />,
      path: "/medicine"
    },
    {
      title: "Обучение",
      description: "Курсы и семинары по основам аюрведической медицины",
      icon: <BookOpen className="w-8 h-8 text-white" />,
      path: "/education"
    },
    {
      title: "Детокс",
      description: "Программы очищения организма по аюрведическим методикам",
      icon: <Droplets className="w-8 h-8 text-white" />,
      path: "/detox"
    },
    {
      title: "Панчакарма",
      description: "Традиционные процедуры глубокого очищения организма",
      icon: <Flower2 className="w-8 h-8 text-white" />,
      path: "/panchakarma"
    }
  ];

  return (
    <div>
      <HeroSection />
      <FeatureGrid />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <h1 className="text-4xl font-serif text-white mb-4">
            Наши Услуги
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Откройте для себя гармонию тела и души с нашими аюрведическими услугами, 
            разработанными для поддержания вашего здоровья и благополучия
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <Card 
              key={service.title}
              className="p-6 h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center h-full space-y-4">
                <div className="w-16 h-16 rounded-full bg-ayurveda-primary/20 backdrop-blur-sm flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-serif text-white">
                  {service.title}
                </h3>
                <p className="text-white/80 flex-grow">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-4 border-white/20 text-white hover:bg-white/20 hover:text-white w-full"
                  onClick={() => navigate(service.path)}
                >
                  Подробнее
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;