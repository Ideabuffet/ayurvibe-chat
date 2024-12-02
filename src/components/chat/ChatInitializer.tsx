import { useEffect } from "react";
import { getOpenAIResponse } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { DoshaType } from "@/types/dosha";

interface ChatInitializerProps {
  category: string;
  dosha: DoshaType;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ content: string; isAi: boolean; timestamp: Date }>>>;
  setIsInitializing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentResponse: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatInitializer = ({
  category,
  dosha,
  setMessages,
  setIsInitializing,
  setCurrentResponse,
}: ChatInitializerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const initializeChat = async () => {
      if (category) {
        setIsInitializing(true);
        try {
          if (category === 'herbs') {
            const initialMessage = getRandomHerbalIntro();
            setMessages([{
              content: initialMessage,
              isAi: true,
              timestamp: new Date()
            }]);
          } else {
            setMessages([{
              content: "",
              isAi: true,
              timestamp: new Date()
            }]);

            setCurrentResponse("");
            await getOpenAIResponse(
              "Дай краткое введение и спроси, что конкретно интересует пользователя по этой теме",
              dosha,
              category,
              (token) => {
                setCurrentResponse(prev => {
                  const newResponse = prev + token;
                  setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    if (newMessages[0]) {
                      newMessages[0].content = translateAyurvedaTerms(newResponse);
                    }
                    return newMessages;
                  });
                  return newResponse;
                });
              }
            );
          }
        } catch (error: any) {
          toast({
            title: "Ошибка",
            description: error.message || "Не удалось загрузить начальные рекомендации",
            variant: "destructive",
          });
        } finally {
          setIsInitializing(false);
        }
      } else {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, [dosha, category, toast, setMessages, setIsInitializing, setCurrentResponse]);

  return null;
};

const getRandomHerbalIntro = () => {
  const intros = [
    "Травы в Аюрведе — это не просто растения, а мощные природные инструменты для поддержания здоровья. Каждая трава обладает уникальными свойствами и может использоваться как самостоятельно, так и в сочетании с другими. Какие травы или их применение вас интересуют?",
    "В аюрведической медицине травы играют ключевую роль в поддержании баланса и здоровья. Они используются в виде чаев, порошков, масел и других форм. О каких травках или способах их применения вы хотели бы узнать подробнее?",
    "Аюрведическая фитотерапия — это древнее искусство использования трав для исцеления и поддержания здоровья. Каждое растение имеет свой особый профиль действия и может помочь в различных ситуациях. Что именно вас интересует в области аюрведических трав?",
    "В арсенале Аюрведы существуют сотни лекарственных растений, каждое из которых обладает уникальными целебными свойствами. Эти травы могут использоваться для профилактики и лечения различных состояний. О чем бы вы хотели узнать подробнее?",
    "Травяные средства в Аюрведе — это целая наука о том, как использовать природные ресурсы для поддержания здоровья и лечения заболеваний. Каждая трава имеет свой вкус, энергетику и особые свойства. Какие аспекты применения трав вас интересуют?"
  ];
  return intros[Math.floor(Math.random() * intros.length)];
};