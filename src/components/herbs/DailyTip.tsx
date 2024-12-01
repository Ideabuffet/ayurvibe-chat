import { useState } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { getOpenAIResponse } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";

export const DailyTip = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateNewTip = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await getOpenAIResponse(
        "Дай полезный совет дня по использованию трав в Аюрведе. Например, как использовать куркуму для снятия воспаления. Ответ должен быть конкретным, практичным и оригинальным. Не повторяй предыдущие советы.",
        "vata",
        "herbs"
      );
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить новый совет",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <ChatContainer 
      category="herbs" 
      dosha="vata"
    />
  );
};