import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Heart,
  BookOpen,
  Droplets,
  Lotus,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Консультации",
      description: "Персональные консультации с опытным аюрведическим специалистом",
      icon: <Heart className="w-8 h-8 text-ayurveda-primary" />,
      path: "/consultation"
    },
    {
      title: "Лекарства",
      description: "Натуральные аюрведические препараты и добавки",
      icon: <Leaf className="w-8 h-8 text-ayurveda-primary" />,
      path: "/medicine"
    },
    {
      title: "Обучение",
      description: "Курсы и семинары по основам аюрведической медицины",
      icon: <BookOpen className="w-8 h-8 text-ayurveda-primary" />,
      path: "/education"
    },
    {
      title: "Детокс",
      description: "Программы очищения организма по аюрведическим методикам",
      icon: <Droplets className="w-8 h-8 text-ayurveda-primary" />,
      path: "/detox"
    },
    {
      title: "Панчакарма",
      description: "Традиционные процедуры глубокого очищения организма",
      icon: <Lotus className="w-8 h-8 text-ayurveda-primary" />,
      path: "/panchakarma"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-ayurveda-primary text-center mb-8">
        Наши Услуги
      </h1>
      <p className="text-center text-ayurveda-text mb-12 max-w-2xl mx-auto">
        Откройте для себя гармонию тела и души с нашими аюрведическими услугами, 
        разработанными для поддержания вашего здоровья и благополучия
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card 
            key={service.title}
            className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {service.icon}
              <h3 className="text-xl font-serif text-ayurveda-primary">
                {service.title}
              </h3>
              <p className="text-ayurveda-text">
                {service.description}
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-ayurveda-primary text-ayurveda-primary hover:bg-ayurveda-primary hover:text-white"
                onClick={() => navigate(service.path)}
              >
                Подробнее
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;