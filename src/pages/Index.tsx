import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Disclaimer } from "@/components/Disclaimer";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import OpenAI from "openai";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  content: string;
  isAi: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  content: "Здравствуйте! 🙏 Я ваш Аюрведический консультант. Как я могу вам помочь сегодня?",
  isAi: true,
  timestamp: new Date(),
};

const SYSTEM_PROMPT = `Ты - опытный Аюрведический врач. Отвечай на вопросы пользователей о здоровье, основываясь на принципах Аюрведы. 
Всегда отвечай на русском языке. Будь профессиональным, но дружелюбным. При необходимости напоминай, что твои советы носят информационный характер 
и не заменяют консультацию с врачом.`;

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      content,
      isAi: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);

    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваш ключ OpenAI API в настройках выше",
        variant: "destructive",
      });
      return;
    }

    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.isAi ? "assistant" : "user",
            content: msg.content
          })),
          { role: "user", content }
        ],
        model: "gpt-4",
      });

      const aiMessage: Message = {
        content: completion.choices[0]?.message?.content || "Извините, произошла ошибка. Попробуйте еще раз.",
        isAi: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось получить ответ от OpenAI. Проверьте ваш ключ API и попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-ayurveda-background">
      <header className="bg-ayurveda-primary text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">Аюрведическая Мудрость ИИ</h1>
      </header>

      <div className="flex-1 container max-w-4xl mx-auto p-4 overflow-y-auto">
        <ApiKeyInput />
        <Disclaimer />
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </div>

      <div className="container max-w-4xl mx-auto">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Index;