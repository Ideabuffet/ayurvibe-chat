import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Card } from "@/components/ui/card";
import { getOpenAIResponse } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { DoshaType } from "@/types/dosha";

interface ChatContainerProps {
  category: string;
  dosha: DoshaType;
  onRefresh?: () => Promise<void>;
}

const getRandomHerbalIntro = () => {
  const intros = [
    "Травы в Аюрведе — это не просто растения, а мощные природные инструменты для поддержания здоровья. Каждая трава обладает уникальными свойствами и может использоваться как самостоятельно, так и в сочетании с другими. Какие травы или их применение вас интересуют?",
    "В аюрведической медицине травы играют ключевую роль в поддержании баланса и здоровья. Они используются в виде чаев, порошков, масел и других форм. О каких травах или способах их применения вы хотели бы узнать подробнее?",
    "Аюрведическая фитотерапия — это древнее искусство использования трав для исцеления и поддержания здоровья. Каждое растение имеет свой особый профиль действия и может помочь в различных ситуациях. Что именно вас интересует в области аюрведических трав?",
    "В арсенале Аюрведы существуют сотни лекарственных растений, каждое из которых обладает уникальными целебными свойствами. Эти травы могут использоваться для профилактики и лечения различных состояний. О чем бы вы хотели узнать подробнее?",
    "Травяные средства в Аюрведе — это целая наука о том, как использовать природные ресурсы для поддержания здоровья и лечения заболеваний. Каждая трава имеет свой вкус, энергетику и особые свойства. Какие аспекты применения трав вас интересуют?"
  ];
  return intros[Math.floor(Math.random() * intros.length)];
};

export const ChatContainer = ({ category, dosha, onRefresh }: ChatContainerProps) => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; timestamp: Date }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
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
          let initialMessage;
          if (category === 'herbs') {
            initialMessage = getRandomHerbalIntro();
          } else {
            initialMessage = await getOpenAIResponse(
              "Дай краткое введение и спроси, что конкретно интересует пользователя по этой теме",
              dosha,
              category
            );
          }
          setMessages([{
            content: initialMessage,
            isAi: true,
            timestamp: new Date()
          }]);
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

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    
    const words = response.split(' ');
    let currentResponse = '';
    let wordIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (wordIndex < words.length) {
        currentResponse += words[wordIndex] + ' ';
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1]?.isAi) {
            newMessages[newMessages.length - 1].content = currentResponse;
          } else {
            newMessages.push({
              content: currentResponse,
              isAi: true,
              timestamp: new Date()
            });
          }
          return newMessages;
        });
        wordIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100);
  };

  const handleSendMessage = async (message: string) => {
    if (isTyping) {
      toast({
        title: "Подождите",
        description: "Бот все еще печатает ответ",
        variant: "destructive",
      });
      return;
    }

    setMessages(prev => [...prev, {
      content: message,
      isAi: false,
      timestamp: new Date()
    }]);
    
    try {
      const response = await getOpenAIResponse(message, dosha, category);
      simulateTyping(response);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось получить ответ",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {isInitializing ? (
            <div className="text-center text-gray-500">
              Загрузка...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500">
              Начните диалог, задав свой вопрос
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isAi={message.isAi}
                timestamp={message.timestamp}
                isFirstMessage={index === 0}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || isInitializing} 
          onRefresh={onRefresh}
        />
      </div>
    </Card>
  );
};
