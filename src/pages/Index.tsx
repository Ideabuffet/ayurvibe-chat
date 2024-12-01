import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Disclaimer } from "@/components/Disclaimer";
import { ChatMessage } from "@/components/ChatMessage";
import { 
  Apple, 
  HeartPulse, 
  Brain,
  Calendar,
  ArrowLeft
} from "lucide-react";

const Index = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dosha = searchParams.get('dosha');
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; timestamp: Date }>>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleNavigateToRecommendation = (newCategory: string) => {
    navigate(`/chat/${newCategory}?dosha=${dosha}`);
  };

  const handleBackToResults = () => {
    navigate(`/chat/dosha`);
  };

  useEffect(() => {
    if (dosha && category && category !== 'dosha') {
      const initialRecommendation = getDoshaRecommendations(dosha, category);
      setMessages([{
        content: initialRecommendation,
        isAi: true,
        timestamp: new Date()
      }]);
    }
  }, [dosha, category]);

  if (category === "dosha") {
    return <DoshaQuiz />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        content: newMessage,
        isAi: false,
        timestamp: new Date()
      }]);
      setNewMessage("");
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          content: "Спасибо за ваш вопрос. Как я могу помочь вам более конкретно с учетом вашей доши?",
          isAi: true,
          timestamp: new Date()
        }]);
      }, 1000);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={handleBackToResults}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться к результатам
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button 
          className="w-full bg-white hover:bg-ayurveda-accent/5" 
          variant="outline"
          onClick={() => handleNavigateToRecommendation('nutrition')}
        >
          <Apple className="mr-2 h-5 w-5 text-ayurveda-primary" />
          Рекомендации по питанию
        </Button>
        <Button 
          className="w-full bg-white hover:bg-ayurveda-accent/5" 
          variant="outline"
          onClick={() => handleNavigateToRecommendation('health')}
        >
          <HeartPulse className="mr-2 h-5 w-5 text-ayurveda-primary" />
          Здоровье и лечение
        </Button>
        <Button 
          className="w-full bg-white hover:bg-ayurveda-accent/5" 
          variant="outline"
          onClick={() => handleNavigateToRecommendation('meditation')}
        >
          <Brain className="mr-2 h-5 w-5 text-ayurveda-primary" />
          Практики и медитации
        </Button>
        <Button 
          className="w-full bg-white hover:bg-ayurveda-accent/5" 
          variant="outline"
          onClick={() => handleNavigateToRecommendation('routine')}
        >
          <Calendar className="mr-2 h-5 w-5 text-ayurveda-primary" />
          Ежедневные рутины
        </Button>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isAi={message.isAi}
                timestamp={message.timestamp}
              />
            ))}
          </div>
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