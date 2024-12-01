import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { DoshaType } from "@/types/dosha";
import { 
  Apple, 
  HeartPulse, 
  Brain,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { getOpenAIResponse } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const doshaParam = searchParams.get('dosha');
  const dosha = (doshaParam as DoshaType) || 'vata';
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; timestamp: Date }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNavigateToRecommendation = (newCategory: string) => {
    navigate(`/chat/${newCategory}?dosha=${dosha}`);
  };

  const handleBackToResults = () => {
    navigate(`/chat/dosha`);
  };

  useEffect(() => {
    const initializeChat = async () => {
      if (dosha && category && category !== 'dosha') {
        try {
          const initialMessage = await getOpenAIResponse(
            "Дай краткое введение и спроси, что конкретно интересует пользователя по этой теме",
            dosha,
            category
          );
          setMessages([{
            content: initialMessage,
            isAi: true,
            timestamp: new Date()
          }]);
        } catch (error) {
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить начальные рекомендации. Проверьте ваш API ключ.",
            variant: "destructive",
          });
        }
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
    if (!localStorage.getItem("openai_api_key")) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, сначала введите ваш API ключ OpenAI",
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
      const response = await getOpenAIResponse(message, dosha, category || 'routine');
      simulateTyping(response);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось получить ответ. Проверьте ваш API ключ.",
        variant: "destructive",
      });
    }
  };

  if (category === "dosha") {
    return <DoshaQuiz />;
  }

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

      <ApiKeyInput />

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
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isAi={message.isAi}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </Card>
    </div>
  );
};

export default Index;