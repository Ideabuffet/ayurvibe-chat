import { useParams } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Disclaimer } from "@/components/Disclaimer";

const Index = () => {
  const { category } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  if (category === "dosha") {
    return <DoshaQuiz />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      <Disclaimer />
      <Card className="p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-muted p-3 rounded-lg">
              {message}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите ваш вопрос..."
              className="min-h-[100px]"
            />
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Index;