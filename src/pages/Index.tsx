import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { DoshaType } from "@/types/dosha";
import { 
  Apple, 
  HeartPulse, 
  Brain,
  Calendar,
  ArrowLeft
} from "lucide-react";

const generateAIResponse = (message: string, dosha: DoshaType, category: string) => {
  // Создаем базу знаний об Аюрведе
  const ayurvedaKnowledge = {
    vata: {
      "ранний подъем": "В Аюрведе для Ваты ранний подъем рекомендуется между 5:00 и 6:00 утра. Это время, когда преобладает энергия Вата, что помогает начать день легко и естественно. Важно просыпаться до восхода солнца, чтобы синхронизироваться с природными ритмами.",
      "медитация": "Для Ваты особенно полезны успокаивающие медитации, которые помогают заземлиться и сбалансировать активный ум. Лучшее время для медитации - раннее утро.",
    },
    pitta: {
      "ранний подъем": "Для Питты оптимальное время подъёма - между 5:30 и 6:30 утра. В это время природная энергия способствует продуктивному началу дня. Рекомендуется начинать утро с прохладного душа для баланса.",
      "медитация": "Питте полезны охлаждающие медитативные практики, особенно в вечернее время, когда нужно успокоить накопившийся за день жар.",
    },
    kapha: {
      "ранний подъем": "Для Капхи крайне важен ранний подъём - идеально между 4:30 и 5:30 утра. Это помогает преодолеть природную тяжесть и инертность Капха-доши. После пробуждения рекомендуется сразу же заняться активной деятельностью.",
      "медитация": "Капхе подходят более динамичные медитации, возможно совмещённые с движением или пранаямой, чтобы поддерживать бодрость и внимательность.",
    }
  };

  // Функция для поиска наиболее подходящего ответа
  const findBestResponse = (question: string, doshaType: DoshaType) => {
    const doshaInfo = ayurvedaKnowledge[doshaType];
    const questionLower = question.toLowerCase();
    
    // Проверяем, есть ли прямое совпадение
    for (const [key, value] of Object.entries(doshaInfo)) {
      if (questionLower.includes(key.toLowerCase())) {
        return value;
      }
    }

    // Если прямого совпадения нет, даём общий ответ по контексту
    let response = `Исходя из принципов Аюрведы и учитывая вашу ${doshaType} дошу, `;
    
    if (questionLower.includes("питание") || questionLower.includes("еда")) {
      response += "важно подбирать питание, которое уравновешивает ваши природные качества. ";
    } else if (questionLower.includes("сон") || questionLower.includes("режим")) {
      response += "режим дня играет ключевую роль в поддержании баланса. ";
    } else if (questionLower.includes("практик") || questionLower.includes("упражнен")) {
      response += "физические и духовные практики должны соответствовать вашей природе. ";
    }
    
    response += "Могу подробнее рассказать о конкретных аспектах, которые вас интересуют.";
    
    return response;
  };

  return findBestResponse(message, dosha);
};

const Index = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
    if (dosha && category && category !== 'dosha') {
      const initialRecommendation = getDoshaRecommendations(dosha, category as 'nutrition' | 'health' | 'meditation' | 'routine');
      setMessages([{
        content: initialRecommendation,
        isAi: true,
        timestamp: new Date()
      }]);
    }
  }, [dosha, category]);

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    
    // Разбиваем ответ на части для имитации печати
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
    }, 100); // Скорость "печати"
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, {
      content: message,
      isAi: false,
      timestamp: new Date()
    }]);
    
    const response = generateAIResponse(message, dosha, category || 'routine');
    simulateTyping(response);
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
