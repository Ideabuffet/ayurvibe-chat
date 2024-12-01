import { useNavigate } from "react-router-dom";
import {
  Heart,
  Leaf,
  UtensilsCrossed,
  PersonStanding,
  HeartPulse,
  Droplet,
  Flower2,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { ServiceButton } from "@/components/ServiceButton";

const services = [
  { id: "dosha", icon: Heart, label: "Определите\nсвою Дошу", color: "#D946EF" },
  { id: "herbs", icon: Leaf, label: "Травяные\nСредства", color: "#4A5D4F" },
  { id: "diet", icon: UtensilsCrossed, label: "Диетические\nРекомендации", color: "#D4A373" },
  { id: "lifestyle", icon: PersonStanding, label: "Образ\nЖизни", color: "#8B9D83" },
  { id: "chronic", icon: HeartPulse, label: "Хронические\nЗаболевания", color: "#ea384c" },
  { id: "detox", icon: Droplet, label: "Детокс и\nОчищение", color: "#0EA5E9" },
  { id: "stress", icon: Flower2, label: "Стресс и\nЭмоции", color: "#8B5CF6" },
  { id: "beauty", icon: User, label: "Красота и\nУход за Кожей", color: "#F97316" },
  { id: "energy", icon: Sun, label: "Энергия и\nДуховность", color: "#C6A760" },
  { id: "sleep", icon: Moon, label: "Улучшение\nСна", color: "#407D7A" },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ayurveda-background to-white p-8">
      <div className="container max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-ayurveda-text">
            Аюрведическая Мудрость
          </h1>
          <p className="text-ayurveda-text/80 max-w-2xl mx-auto">
            Откройте для себя древние практики исцеления и гармонии через нашу коллекцию аюрведических услуг
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => (
            <ServiceButton
              key={service.id}
              icon={service.icon}
              label={service.label}
              onClick={() => navigate(`/chat/${service.id}`)}
              color={service.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;