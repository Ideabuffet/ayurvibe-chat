import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getOpenAIResponse } from "@/utils/openai";
import { translateAyurvedaTerms } from "@/utils/translations";
import { DoshaType } from "@/types/dosha";

interface ChatMessageHandlerProps {
  category: string;
  dosha: DoshaType;
  messages: Array<{ content: string; isAi: boolean; timestamp: Date }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ content: string; isAi: boolean; timestamp: Date }>>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  retryTimeout: number | null;
  setRetryTimeout: React.Dispatch<React.SetStateAction<number | null>>;
  currentResponse: string;
  setCurrentResponse: React.Dispatch<React.SetStateAction<string>>;
}

export const useChatMessageHandler = ({
  category,
  dosha,
  messages,
  setMessages,
  isTyping,
  setIsTyping,
  retryTimeout,
  setRetryTimeout,
  currentResponse,
  setCurrentResponse,
}: ChatMessageHandlerProps) => {
  const { toast } = useToast();

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
        
        // Start countdown
        const interval = setInterval(() => {
          setRetryTimeout(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(interval);
              return null;
            }
            return prev - 1;
          });
        }, 1000);
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

  return { handleSendMessage };
};