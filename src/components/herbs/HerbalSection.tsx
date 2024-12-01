import { Book, ScrollText, GitBranch } from "lucide-react";
import { ServiceButton } from "@/components/ServiceButton";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { Card } from "@/components/ui/card";
import { HerbalCatalog } from "./HerbalCatalog";
import { RecipesCatalog } from "./RecipesCatalog";
import { CombinationsCatalog } from "./CombinationsCatalog";

export const HerbalSection = () => {
  const navigate = useNavigate();
  const { subcategory } = useParams();

  const herbalServices = [
    {
      id: "base",
      icon: Book,
      label: "База трав",
      color: "#4A5D4F",
      path: "/chat/herbs/base"
    },
    {
      id: "recipes",
      icon: ScrollText,
      label: "Готовые рецепты",
      color: "#D4A373",
      path: "/chat/herbs/recipes"
    },
    {
      id: "combinations",
      icon: GitBranch,
      label: "Травяные комбинации",
      color: "#8B9D83",
      path: "/chat/herbs/combinations"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4 animate-fade-in">
        {herbalServices.map((service) => (
          <ServiceButton
            key={service.id}
            icon={service.icon}
            label={service.label}
            onClick={() => navigate(service.path)}
            color={service.color}
            isActive={subcategory === service.id}
          />
        ))}
      </div>

      {subcategory === 'base' ? (
        <HerbalCatalog />
      ) : subcategory === 'recipes' ? (
        <RecipesCatalog />
      ) : subcategory === 'combinations' ? (
        <CombinationsCatalog />
      ) : (
        <Card className="p-4">
          <ChatContainer category="herbs" dosha="vata" />
        </Card>
      )}
    </div>
  );
};