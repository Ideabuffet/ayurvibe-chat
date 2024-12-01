import { Apple, Calendar, Brain, HeartPulse, Leaf, Utensils, Moon, Palette, Coffee, Sprout, FlaskConical, Droplets, Timer, GitBranch, User, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoshaType } from "@/types/dosha";
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/chat/ChatContainer";

interface DoshaRecommendationsProps {
  dominantDosha: DoshaType;
}

const doshaData = {
  vata: {
    flavors: ["Сладкий", "Кислый", "Соленый"],
    foodsToEat: {
      fruits: "Бананы, манго, инжир",
      vegetables: "Сладкий картофель, морковь, свекла",
      grains: "Рис, овсянка, киноа",
      proteins: "Чечевица, тофу, яйца"
    },
    foodsToAvoid: {
      fruits: "Яблоки, груши (в сыром виде)",
      vegetables: "Сырые салаты, капуста, брокколи"
    },
    mealTimes: {
      breakfast: "7:00 – 8:30 (теплая, питательная пища)",
      lunch: "12:00 – 13:30 (самый плотный прием пищи)",
      dinner: "18:00 – 19:30 (легкая и легко усваиваемая)"
    },
    tips: [
      "Используйте согревающие специи как корица, кардамон и имбирь",
      "Избегайте холодных напитков и льда"
    ]
  },
  pitta: {
    flavors: ["Сладкий", "Горький", "Вяжущий"],
    foodsToEat: {
      fruits: "Сладкие яблоки, сладкие груши, финики",
      vegetables: "Огурцы, листовая зелень, цуккини",
      grains: "Ячмень, пшеница, белый рис",
      proteins: "Маш, тофу, белое мясо"
    },
    foodsToAvoid: {
      fruits: "Кислые фрукты, цитрусовые",
      vegetables: "Острый перец, чеснок, лук"
    },
    mealTimes: {
      breakfast: "6:30 – 8:00 (прохладная, освежающая пища)",
      lunch: "12:00 – 13:00 (основной прием пищи)",
      dinner: "18:00 – 19:00 (легкий ужин)"
    },
    tips: [
      "Используйте охлаждающие специи как кориандр, фенхель и мята",
      "Избегайте острой и ферментированной пищи"
    ]
  },
  kapha: {
    flavors: ["Острый", "Горький", "Вяжущий"],
    foodsToEat: {
      fruits: "Яблоки, гранат, клюква",
      vegetables: "Листовая зелень, проростки, горькая тыква",
      grains: "Киноа, гречка, пшено",
      proteins: "Чечевица, курица, рыба"
    },
    foodsToAvoid: {
      fruits: "Бананы, кокос, финики",
      vegetables: "Сладкий картофель, огурцы, цуккини"
    },
    mealTimes: {
      breakfast: "7:00 – 8:00 (легкий завтрак)",
      lunch: "12:00 – 13:00 (основной прием пищи)",
      dinner: "17:30 – 18:30 (очень легкий ужин)"
    },
    tips: [
      "Используйте стимулирующие специи как черный перец, имбирь и куркума",
      "Избегайте тяжелой и жирной пищи"
    ]
  }
};

export const DoshaRecommendations = ({ dominantDosha }: DoshaRecommendationsProps) => {
  const navigate = useNavigate();
  const data = doshaData[dominantDosha];

  const handleNavigate = (category: string) => {
    navigate(`/chat/${category}?dosha=${dominantDosha}`);
  };

  return (
    <div className="space-y-8 p-6 bg-white/80 backdrop-blur rounded-lg">
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold tracking-wide text-ayurveda-primary">
          {dominantDosha === 'kapha' ? 'КАПХА' : dominantDosha.toUpperCase()} ДОША
        </h2>
      </div>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          РЕКОМЕНДАЦИИ ПО ПИТАНИЮ
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold mb-3">Рекомендуемые вкусы</h4>
            <ul className="list-none space-y-2">
              {data.flavors.map((flavor, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-ayurveda-primary" />
                  <span>{flavor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Рекомендуемые продукты</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-ayurveda-primary" />
                <span>Фрукты: {data.foodsToEat.fruits}</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-ayurveda-primary" />
                <span>Овощи: {data.foodsToEat.vegetables}</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-ayurveda-primary" />
                <span>Крупы: {data.foodsToEat.grains}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-ayurveda-primary" />
                <span>Белки: {data.foodsToEat.proteins}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Продукты, которых следует избегать</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-2 text-red-500">
                <Apple className="h-5 w-5" />
                <span>Фрукты: {data.foodsToAvoid.fruits}</span>
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <Palette className="h-5 w-5" />
                <span>Овощи: {data.foodsToAvoid.vegetables}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          ВРЕМЯ ПРИЕМА ПИЩИ
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-ayurveda-primary" />
            <span>Завтрак: {data.mealTimes.breakfast}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-ayurveda-primary" />
            <span>Обед: {data.mealTimes.lunch}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-ayurveda-primary" />
            <span>Ужин: {data.mealTimes.dinner}</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          ДОПОЛНИТЕЛЬНЫЕ СОВЕТЫ ПО ПИТАНИЮ
        </h3>
        <ul className="space-y-3">
          {data.tips.map((tip, index) => (
            <li key={index} className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-600" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 space-y-6">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          ПЕРСОНАЛИЗИРОВАННЫЕ РЕКОМЕНДАЦИИ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => handleNavigate('health')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <HeartPulse className="h-5 w-5" />
            Рекомендации по здоровью
          </Button>
          <Button 
            onClick={() => handleNavigate('meditation')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Brain className="h-5 w-5" />
            Медитации и практики
          </Button>
          <Button 
            onClick={() => handleNavigate('routine')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Calendar className="h-5 w-5" />
            Режим дня
          </Button>
          <Button 
            onClick={() => handleNavigate('nutrition')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Apple className="h-5 w-5" />
            Подробнее о питании
          </Button>
          <Button 
            onClick={() => handleNavigate('herbs')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Leaf className="h-5 w-5" />
            Травяные средства
          </Button>
          <Button 
            onClick={() => handleNavigate('diet')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Utensils className="h-5 w-5" />
            Диетические рекомендации
          </Button>
          <Button 
            onClick={() => handleNavigate('lifestyle')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <GitBranch className="h-5 w-5" />
            Образ жизни
          </Button>
          <Button 
            onClick={() => handleNavigate('chronic')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <HeartPulse className="h-5 w-5" />
            Хронические заболевания
          </Button>
          <Button 
            onClick={() => handleNavigate('detox')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Droplets className="h-5 w-5" />
            Детокс и очищение
          </Button>
          <Button 
            onClick={() => handleNavigate('stress')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Sprout className="h-5 w-5" />
            Стресс и эмоции
          </Button>
          <Button 
            onClick={() => handleNavigate('beauty')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <User className="h-5 w-5" />
            Красота и уход за кожей
          </Button>
          <Button 
            onClick={() => handleNavigate('energy')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Sun className="h-5 w-5" />
            Энергия и духовность
          </Button>
          <Button 
            onClick={() => handleNavigate('sleep')}
            className="w-full h-auto py-6 flex items-center gap-2 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
          >
            <Moon className="h-5 w-5" />
            Улучшение сна
          </Button>
        </div>

        <Card className="p-4">
          <ChatContainer category="dosha" dosha={dominantDosha} />
        </Card>
      </div>
    </div>
  );
};