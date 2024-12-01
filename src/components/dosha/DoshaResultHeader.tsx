import { CircleDot, Info, Leaf, UtensilsCrossed, PersonStanding, HeartPulse, Droplet, Flower2, User, Sun, Moon } from "lucide-react";
import { DoshaType } from "@/types/dosha";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { ServiceButton } from "@/components/ServiceButton";
import { useNavigate } from "react-router-dom";

interface DoshaResultHeaderProps {
  dominantDosha: DoshaType;
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

const doshaDescriptions = {
  vata: "Вата представляет движение, творчество и энергию. При балансе способствует жизненной силе, при дисбалансе может привести к беспокойству и сухости.",
  pitta: "Питта олицетворяет трансформацию и метаболизм. При балансе дает ясность ума и хорошее пищеварение, при дисбалансе может вызвать раздражительность и воспаление.",
  kapha: "Капха символизирует структуру и стабильность. При балансе обеспечивает силу и выносливость, при дисбалансе может привести к застою и избыточному весу."
};

const doshaNames: Record<DoshaType, string> = {
  vata: "Вата",
  pitta: "Питта",
  kapha: "Капха"
};

const doshaColors: Record<DoshaType, string> = {
  vata: "from-purple-500 to-blue-500",
  pitta: "from-red-500 to-orange-500",
  kapha: "from-green-500 to-emerald-500"
};

const services = [
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

export const DoshaResultHeader = ({ dominantDosha, scores }: DoshaResultHeaderProps) => {
  const navigate = useNavigate();
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={cn(
          "relative w-32 h-32 rounded-full bg-gradient-to-br p-1",
          doshaColors[dominantDosha]
        )}>
          <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl font-serif font-medium bg-gradient-to-br bg-clip-text text-transparent animate-pulse"
              style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
              {doshaNames[dominantDosha]}
            </span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-medium text-ayurveda-primary">
            Ваша доминирующая доша
          </h2>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xl text-ayurveda-text">
              {doshaNames[dominantDosha]}
            </p>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="h-5 w-5 text-ayurveda-accent cursor-help" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4 bg-white/95 backdrop-blur border-ayurveda-accent/20">
                <p className="text-sm leading-relaxed">{doshaDescriptions[dominantDosha]}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-white/50 backdrop-blur rounded-lg p-6">
        <h3 className="text-lg font-medium text-center">Распределение баллов:</h3>
        <div className="space-y-4">
          {(Object.entries(scores) as [DoshaType, number][]).map(([dosha, score]) => (
            <div key={dosha} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{doshaNames[dosha]}</span>
                <span className="text-ayurveda-text/60">{Math.round((score / totalScore) * 100)}%</span>
              </div>
              <div className="h-2 bg-ayurveda-accent/10 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    doshaColors[dosha]
                  )}
                  style={{ width: `${(score / totalScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-medium text-ayurveda-primary text-center">
          Персонализированные рекомендации
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceButton
              key={service.id}
              icon={service.icon}
              label={service.label}
              onClick={() => navigate(`/chat/${service.id}?dosha=${dominantDosha}`)}
              color={service.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};