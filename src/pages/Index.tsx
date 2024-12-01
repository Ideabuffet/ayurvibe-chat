import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Disclaimer } from "@/components/Disclaimer";

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

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      content,
      isAi: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response in Russian
    setTimeout(() => {
      const aiMessage: Message = {
        content: "Я понимаю ваш интерес к Аюрведической мудрости. Позвольте поделиться некоторыми знаниями, основанными на традиционных принципах. Хотели бы вы узнать больше о вашей доше (конституции тела) или у вас есть конкретные вопросы о здоровье?",
        isAi: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-ayurveda-background">
      <header className="bg-ayurveda-primary text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">Аюрведическая Мудрость ИИ</h1>
      </header>

      <div className="flex-1 container max-w-4xl mx-auto p-4 overflow-y-auto">
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