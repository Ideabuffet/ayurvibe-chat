import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Timer, Scroll, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  benefits: string;
  preparation_time: string;
  type: 'tea' | 'oil' | 'decoction';
}

const getRecipeIcon = (type: Recipe['type']) => {
  switch (type) {
    case 'tea':
      return <Leaf className="w-16 h-16 text-ayurveda-primary" strokeWidth={1.5} />;
    case 'oil':
      return <Timer className="w-16 h-16 text-ayurveda-primary" strokeWidth={1.5} />;
    case 'decoction':
      return <Scroll className="w-16 h-16 text-ayurveda-primary" strokeWidth={1.5} />;
  }
};

export const RecipesCatalog = () => {
  const navigate = useNavigate();
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Recipe[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Загрузка рецептов...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-ayurveda-background py-4 border-b">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/chat/herbs')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться
            </Button>
            <h2 className="text-2xl font-serif font-medium text-ayurveda-primary">
              Аюрведические рецепты
            </h2>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-6">
          {recipes?.map((recipe) => (
            <div key={recipe.id} className="grid md:grid-cols-[auto,1fr] gap-4 p-4 border rounded-lg">
              <div className="flex items-center justify-center w-24 h-24 bg-ayurveda-accent/5 rounded-lg">
                {getRecipeIcon(recipe.type)}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-ayurveda-text">{recipe.name}</h3>
                  <p className="text-sm text-gray-500 italic">
                    Время приготовления: {recipe.preparation_time}
                  </p>
                </div>
                <p className="text-gray-700">{recipe.description}</p>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Ингредиенты:</h4>
                  <p className="text-gray-700">{recipe.ingredients}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Инструкция:</h4>
                  <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Польза:</h4>
                  <p className="text-gray-700">{recipe.benefits}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <ScrollToTop />
    </div>
  );
};
