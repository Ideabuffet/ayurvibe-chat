import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Disclaimer } from "@/components/Disclaimer";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { speak } from "@/utils/voiceUtils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import OpenAI from "openai";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  content: string;
  isAi: boolean;
  timestamp: Date;
}

const getCategoryPrompt = (category: string) => {
  const prompts: { [key: string]: string } = {
    dosha: "Я специализируюсь на определении доши. Задавайте вопросы о вашей конституции тела.",
    herbs: "Я специалист по аюрведическим травам и натуральным средствам.",
    diet: "Я помогу вам с диетическими рекомендациями согласно Аюрведе.",
    lifestyle: "Я помогу вам с рекомендациями по образу жизни и йоге.",
    chronic: "Я специализируюсь на аюрведическом подходе к хроническим заболеваниям.",
    detox: "Я помогу вам с методами детоксикации и очищения организма.",
    stress: "Я специализируюсь на управлении стрессом и эмоциональном благополучии.",
    beauty: "Я помогу вам с натуральным уходом за кожей и волосами.",
    energy: "Я специализируюсь на энергетическом и духовном балансе.",
    sleep: "Я помогу вам улучшить качество сна с помощью аюрведических принципов.",
  };
  return prompts[category] || "Я ваш Аюрведический консультант. Как я могу вам помочь сегодня?";
};

const Index = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      content: getCategoryPrompt(category || ""),
      isAi: true,
      timestamp: new Date(),
    },
  ]);
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
      
      const aiMessage: Message = {
        content: "",
        isAi: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      const stream = await openai.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `Ты - опытный Аюрведический врач, специализирующийся на теме ${category}. 
                     Отвечай на вопросы пользователей, основываясь на принципах Аюрведы. 
                     Всегда отвечай на русском языке. Будь профессиональным, но дружелюбным.` 
          },
          ...messages.map(msg => ({
            role: msg.isAi ? "assistant" as const : "user" as const,
            content: msg.content
          })),
          { role: "user" as const, content }
        ],
        model: "gpt-4",
        stream: true,
      });

      let fullContent = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullContent += content;
        
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullContent;
          return newMessages;
        });
      }

      speak(fullContent);
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
      <header className="bg-ayurveda-primary text-white p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white mr-2"
          onClick={() => navigate("/services")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold flex-1 text-center mr-8">
          Аюрведическая Мудрость ИИ
        </h1>
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