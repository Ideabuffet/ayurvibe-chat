import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, LeafyGreen, Flower, Flower2, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface Herb {
  id: string;
  name: string;
  sanskrit_name: string | null;
  description: string;
  benefits: string;
  contraindications: string | null;
  image_url: string | null;
}

const getHerbIcon = (herbName: string) => {
  // Rotate through available icons based on herb name length to distribute them evenly
  const icons = [Leaf, LeafyGreen, Flower, Flower2, Sprout];
  const index = herbName.length % icons.length;
  const IconComponent = icons[index];
  return <IconComponent className="w-16 h-16 text-ayurveda-primary" strokeWidth={1.5} />;
};

export const HerbalCatalog = () => {
  const navigate = useNavigate();
  const { data: herbs, isLoading } = useQuery({
    queryKey: ["herbs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("herbs")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Herb[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Загрузка каталога трав...</p>
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
              База трав
            </h2>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-6">
          {herbs?.map((herb) => (
            <div key={herb.id} className="grid md:grid-cols-[auto,1fr] gap-4 p-4 border rounded-lg">
              <div className="flex items-center justify-center w-24 h-24 bg-ayurveda-accent/5 rounded-lg">
                {getHerbIcon(herb.name)}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-ayurveda-text">{herb.name}</h3>
                  {herb.sanskrit_name && (
                    <p className="text-sm text-gray-500 italic">{herb.sanskrit_name}</p>
                  )}
                </div>
                <p className="text-gray-700">{herb.description}</p>
                <div>
                  <h4 className="font-semibold text-ayurveda-text mb-2">Польза:</h4>
                  <p className="text-gray-700">{herb.benefits}</p>
                </div>
                {herb.contraindications && (
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Противопоказания:</h4>
                    <p className="text-gray-700">{herb.contraindications}</p>
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
