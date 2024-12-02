import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatInput } from "@/components/ChatInput";
import { getOpenAIResponse } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { DoshaType } from "@/types/dosha";
import { translateAyurvedaTerms } from "@/utils/translations";
import { MessageList } from "./MessageList";
import { RetryTimer } from "./RetryTimer";

interface ChatContainerProps {
  category: string;
  dosha: DoshaType;
}

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

export const ChatContainer = ({ category, dosha }: ChatContainerProps) => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; timestamp: Date }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [retryTimeout, setRetryTimeout] = useState<number | null>(null);
  const [currentResponse, setCurrentResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
  }, [dosha, category, toast]);

  const handleSendMessage = async (message: string) => {
    if (isTyping) {
      toast({
        title: "Подождите",
        description: "Бот все еще печатает ответ",
        variant: "destructive",
      });
      return;
    }

    if (retryTimeout !== null) {
      toast({
        title: "Подождите",
        description: `Пожалуйста, подождите ${retryTimeout} секунд перед следующим запросом`,
        variant: "destructive",
      });
      return;
    }

    setMessages(prev => [...prev, {
      content: message,
      isAi: false,
      timestamp: new Date()
    }]);

    setMessages(prev => [...prev, {
      content: "",
      isAi: true,
      timestamp: new Date()
    }]);
    
    setIsTyping(true);
    setCurrentResponse("");

    try {
      await getOpenAIResponse(
        message,
        dosha,
        category,
        (token) => {
          setCurrentResponse(prev => {
            const newResponse = prev + token;
            setMessages(prevMessages => {
              const newMessages = [...prevMessages];
              if (newMessages[newMessages.length - 1]) {
                newMessages[newMessages.length - 1].content = translateAyurvedaTerms(newResponse);
              }
              return newMessages;
            });
            return newResponse;
          });
        }
      );
    } catch (error: any) {
      setMessages(prev => prev.slice(0, -1));
      
      if (error.message.includes('Превышен лимит запросов')) {
        const seconds = parseInt(error.message.match(/\d+/)[0]) || 20;
        setRetryTimeout(seconds);
      }
      
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось получить ответ",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          <MessageList
            messages={messages}
            isTyping={isTyping}
            isInitializing={isInitializing}
          />
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || isInitializing || retryTimeout !== null} 
        />
        {retryTimeout !== null && (
          <RetryTimer
            timeout={retryTimeout}
            onTimeout={() => setRetryTimeout(null)}
          />
        )}
      </div>
    </Card>
  );
};