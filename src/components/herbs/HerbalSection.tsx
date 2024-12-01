import { Book, ScrollText, GitBranch, Lightbulb } from "lucide-react";
import { ServiceButton } from "@/components/ServiceButton";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { Card } from "@/components/ui/card";
import { HerbalCatalog } from "./HerbalCatalog";

export const HerbalSection = () => {
  const navigate = useNavigate();
  const { subcategory } = useParams();

  const herbalServices = [
    {
      id: "base",
      icon: Book,
      label: "База трав\nИнтерактивный каталог трав с их описанием, изображениями, пользой и противопоказаниями",
      color: "#4A5D4F",
      path: "/chat/herbs/base"
    },
    {
      id: "recipes",
      icon: ScrollText,
      label: "Готовые рецепты\nПростые рецепты аюрведических чаев, масел и настоев",
      color: "#D4A373",
      path: "/chat/herbs/recipes"
    },
    {
      id: "combinations",
      icon: GitBranch,
      label: "Травяные комбинации\nОбъяснение, как смешивать травы для разных целей (например, для снятия стресса или улучшения пищеварения)",
      color: "#8B9D83",
      path: "/chat/herbs/combinations"
    },
    {
      id: "tip",
      icon: Lightbulb,
      label: "Совет дня\nСлучайный совет о пользе конкретной травы, например, 'Как использовать куркуму для снятия воспаления'",
      color: "#C6A760",
      path: "/chat/herbs/tip"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {herbalServices.map((service) => (
          <ServiceButton
            key={service.id}
            icon={service.icon}
            label={service.label}
            onClick={() => navigate(service.path)}
            color={service.color}
          />
        ))}
      </div>

      {subcategory === 'base' ? (
        <HerbalCatalog />
      ) : (
        <Card className="p-4">
          <ChatContainer category="herbs" dosha="vata" />
        </Card>
      )}
    </div>
  );
};