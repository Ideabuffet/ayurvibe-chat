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
  content: "Namaste 🙏 I am your Ayurvedic guide. How may I assist you today?",
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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        content: "I understand your interest in Ayurvedic wisdom. Let me share some insights based on traditional principles. Would you like to know more about your dosha (body constitution) or do you have a specific health concern?",
        isAi: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-ayurveda-background">
      <header className="bg-ayurveda-primary text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">Ayurvedic Wisdom AI</h1>
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