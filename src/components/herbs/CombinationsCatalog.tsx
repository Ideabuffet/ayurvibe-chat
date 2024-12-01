import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sprout, GitBranch, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface Combination {
  id: string;
  name: string;
  description: string;
  herbs: string;
  purpose: string;
  instructions: string;
  benefits: string;
  contraindications: string | null;
}

const getCombinationIcon = (index: number) => {
  // Rotate through available icons
  const icons = [Sprout, GitBranch, Leaf];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className="w-16 h-16 text-ayurveda-primary" strokeWidth={1.5} />;
};

export const CombinationsCatalog = () => {
  const navigate = useNavigate();
  const { data: combinations, isLoading } = useQuery({
    queryKey: ["combinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("combinations")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Combination[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Загрузка каталога комбинаций...</p>
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
              Травяные комбинации
            </h2>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-6">
          {combinations?.map((combination, index) => (
            <div key={combination.id} className="grid md:grid-cols-[auto,1fr] gap-4 p-4 border rounded-lg">
              <div className="flex items-center justify-center w-24 h-24 bg-ayurveda-accent/5 rounded-lg">
                {getCombinationIcon(index)}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-ayurveda-text">{combination.name}</h3>
                  <p className="text-sm text-gray-500 italic">
                    Цель: {combination.purpose}
                  </p>
                </div>
                <p className="text-gray-700">{combination.description}</p>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Травы в составе:</h4>
                  <p className="text-gray-700">{combination.herbs}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Инструкция по применению:</h4>
                  <p className="text-gray-700">{combination.instructions}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Польза:</h4>
                  <p className="text-gray-700">{combination.benefits}</p>
                </div>
                {combination.contraindications && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Противопоказания:</h4>
                    <p className="text-gray-700">{combination.contraindications}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <ScrollToTop />
    </div>
  );
};