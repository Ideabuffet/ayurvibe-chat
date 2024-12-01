import { Apple, Calendar, Brain, HeartPulse, Leaf, Utensils, Moon, Palette, Coffee, Sprout, FlaskConical, Droplets, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoshaType } from "@/types/dosha";
import { Card } from "@/components/ui/card";

interface DoshaRecommendationsProps {
  dominantDosha: DoshaType;
}

const doshaData = {
  vata: {
    flavors: ["Sweet", "Sour", "Salty"],
    foodsToEat: {
      fruits: "Bananas, mangoes, figs",
      vegetables: "Sweet potatoes, carrots, beets",
      grains: "Rice, oatmeal, quinoa",
      proteins: "Lentils, tofu, eggs"
    },
    foodsToAvoid: {
      fruits: "Apples, pears (avoid raw)",
      vegetables: "Raw salads, cabbage, broccoli"
    },
    mealTimes: {
      breakfast: "7:00 AM – 8:30 AM (warm, nourishing foods)",
      lunch: "12:00 PM – 1:30 PM (heaviest meal of the day)",
      dinner: "6:00 PM – 7:30 PM (light and easily digestible)"
    },
    tips: [
      "Use warming spices like cinnamon, cardamom, and ginger in your meals",
      "Avoid cold drinks and ice"
    ]
  },
  pitta: {
    flavors: ["Sweet", "Bitter", "Astringent"],
    foodsToEat: {
      fruits: "Sweet apples, sweet pears, dates",
      vegetables: "Cucumber, leafy greens, zucchini",
      grains: "Barley, wheat, white rice",
      proteins: "Mung beans, tofu, white meat"
    },
    foodsToAvoid: {
      fruits: "Sour fruits, citrus",
      vegetables: "Hot peppers, garlic, onions"
    },
    mealTimes: {
      breakfast: "6:30 AM – 8:00 AM (cool, refreshing foods)",
      lunch: "12:00 PM – 1:00 PM (main meal)",
      dinner: "6:00 PM – 7:00 PM (light meal)"
    },
    tips: [
      "Use cooling spices like coriander, fennel, and mint",
      "Avoid spicy and fermented foods"
    ]
  },
  kapha: {
    flavors: ["Pungent", "Bitter", "Astringent"],
    foodsToEat: {
      fruits: "Apples, pomegranate, cranberries",
      vegetables: "Leafy greens, sprouts, bitter gourd",
      grains: "Quinoa, buckwheat, millet",
      proteins: "Lentils, chicken, fish"
    },
    foodsToAvoid: {
      fruits: "Bananas, coconut, dates",
      vegetables: "Sweet potatoes, cucumber, zucchini"
    },
    mealTimes: {
      breakfast: "7:00 AM – 8:00 AM (light breakfast)",
      lunch: "12:00 PM – 1:00 PM (main meal)",
      dinner: "5:30 PM – 6:30 PM (very light meal)"
    },
    tips: [
      "Use stimulating spices like black pepper, ginger, and turmeric",
      "Avoid heavy and oily foods"
    ]
  }
};

export const DoshaRecommendations = ({ dominantDosha }: DoshaRecommendationsProps) => {
  const navigate = useNavigate();
  const data = doshaData[dominantDosha];

  return (
    <div className="space-y-8 p-6 bg-white/80 backdrop-blur rounded-lg">
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold tracking-wide text-ayurveda-primary">
          {dominantDosha.toUpperCase()} DOSHA
        </h2>
      </div>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          RECOMMENDATIONS FOR DIET
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold mb-3">Flavors to Include</h4>
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
            <h4 className="text-xl font-semibold mb-3">Foods to Eat</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-ayurveda-primary" />
                <span>Fruits: {data.foodsToEat.fruits}</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-ayurveda-primary" />
                <span>Vegetables: {data.foodsToEat.vegetables}</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-ayurveda-primary" />
                <span>Grains: {data.foodsToEat.grains}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-ayurveda-primary" />
                <span>Proteins: {data.foodsToEat.proteins}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Foods to Avoid</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-2 text-red-500">
                <Apple className="h-5 w-5" />
                <span>Fruits: {data.foodsToAvoid.fruits}</span>
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <Palette className="h-5 w-5" />
                <span>Vegetables: {data.foodsToAvoid.vegetables}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          WHEN TO EAT
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-ayurveda-primary" />
            <span>Breakfast: {data.mealTimes.breakfast}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-ayurveda-primary" />
            <span>Lunch: {data.mealTimes.lunch}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-ayurveda-primary" />
            <span>Dinner: {data.mealTimes.dinner}</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-ayurveda-primary border-b pb-2">
          ADDITIONAL DIETARY TIPS
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
    </div>
  );
};