import { CircleDot, Info } from "lucide-react";
import { DoshaType } from "@/types/dosha";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

export const DoshaResultHeader = ({ dominantDosha, scores }: DoshaResultHeaderProps) => {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return (
    <div className="space-y-6 text-center">
      <div className="relative inline-block">
        <CircleDot className="w-20 h-20 text-ayurveda-primary animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-serif font-medium">
            {doshaNames[dominantDosha]}
          </span>
        </div>
      </div>

      <div className="space-y-2">
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
            <HoverCardContent className="w-80">
              <p className="text-sm">{doshaDescriptions[dominantDosha]}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Распределение баллов:</h3>
        <div className="space-y-3">
          {(Object.entries(scores) as [DoshaType, number][]).map(([dosha, score]) => (
            <div key={dosha} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{doshaNames[dosha]}</span>
                <span>{Math.round((score / totalScore) * 100)}%</span>
              </div>
              <div className="h-2 bg-ayurveda-accent/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ayurveda-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${(score / totalScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};