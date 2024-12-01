import { Apple, Leaf, Palette, Coffee, Utensils, Timer, Sprout } from "lucide-react";
import { DoshaType } from "@/types/dosha";
import { doshaData } from "./doshaData";

interface DoshaNutritionSectionProps {
  dominantDosha: DoshaType;
}

export const DoshaNutritionSection = ({ dominantDosha }: DoshaNutritionSectionProps) => {
  const data = doshaData[dominantDosha];

  return (
    <>
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
    </>
  );
};