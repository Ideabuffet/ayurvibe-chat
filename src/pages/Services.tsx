import { useNavigate } from "react-router-dom";
import {
  CircleDot,
  Leaf,
  UtensilsCrossed,
  UserStanding,
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
  { id: "lifestyle", icon: UserStanding, label: "Образ Жизни" },
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
    <div className="min-h-screen bg-ayurveda-background p-4">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-ayurveda-text mb-6 text-center">
          Аюрведическая Мудрость
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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