import { useNavigate } from "react-router-dom";
import {
  CircleDot,
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
  { id: "dosha", icon: CircleDot, label: "Определите свою Дошу" },
  { id: "herbs", icon: Leaf, label: "Травяные Средства" },
  { id: "diet", icon: UtensilsCrossed, label: "Диетические Рекомендации" },
  { id: "lifestyle", icon: PersonStanding, label: "Образ Жизни" },
  { id: "chronic", icon: HeartPulse, label: "Хронические Заболевания" },
  { id: "detox", icon: Droplet, label: "Детокс и Очищение" },
  { id: "stress", icon: Flower2, label: "Стресс и Эмоции" },
  { id: "beauty", icon: User, label: "Красота и Уход за Кожей" },
  { id: "energy", icon: Sun, label: "Энергия и Духовность" },
  { id: "sleep", icon: Moon, label: "Улучшение Сна" },
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;