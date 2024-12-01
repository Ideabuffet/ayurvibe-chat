import { useParams, useSearchParams } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Disclaimer } from "@/components/Disclaimer";
import { ChatMessage } from "@/components/ChatMessage";

const getDoshaRecommendations = (dosha: string, category: string) => {
  const recommendations = {
    vata: {
      nutrition: "Для Ваты рекомендуется:\n- Теплая, свежеприготовленная пища\n- Сладкие, кислые и соленые вкусы\n- Питательные и маслянистые продукты\n- Регулярное питание в одно и то же время",
      health: "Рекомендации для здоровья Ваты:\n- Регулярный массаж с теплыми маслами\n- Защита от холода и ветра\n- Умеренные физические нагрузки\n- Ранний отход ко сну",
      meditation: "Практики для Ваты:\n- Спокойная медитация в тихом месте\n- Мягкая йога\n- Дыхательные практики для успокоения\n- Регулярные практики заземления",
      routine: "Ежедневные рутины для Ваты:\n- Подъем до восхода солнца\n- Масляный массаж (абхьянга)\n- Регулярный режим сна и питания\n- Избегание переутомления"
    },
    pitta: {
      nutrition: "Для Питты рекомендуется:\n- Прохладная или теплая пища\n- Сладкие, горькие и вяжущие вкусы\n- Избегание острой и кислой пищи\n- Обильное питье воды",
      health: "Рекомендации для здоровья Питты:\n- Охлаждающие процедуры\n- Умеренные физические нагрузки в прохладное время\n- Избегание перегрева\n- Регулярный отдых",
      meditation: "Практики для Питты:\n- Охлаждающее дыхание\n- Медитация при лунном свете\n- Практики прощения\n- Йога с акцентом на расслабление",
      routine: "Ежедневные рутины для Питты:\n- Прохладный душ утром\n- Прогулки на природе\n- Регулярные перерывы в работе\n- Избегание полуденного солнца"
    },
    kapha: {
      nutrition: "Для Капхи рекомендуется:\n- Легкая, теплая пища\n- Острые, горькие и вяжущие вкусы\n- Минимум сладкого и жирного\n- Небольшие порции",
      health: "Рекомендации для здоровья Капхи:\n- Активные физические упражнения\n- Регулярные очищающие практики\n- Стимулирующий массаж\n- Поддержание активности в течение дня",
      meditation: "Практики для Капхи:\n- Динамическая медитация\n- Энергичная йога\n- Активные дыхательные практики\n- Практики для повышения энергии",
      routine: "Ежедневные рутины для Капхи:\n- Ранний подъем\n- Активные упражнения утром\n- Сухой массаж (гарщан)\n- Поддержание активности в течение дня"
    }
  };

  return recommendations[dosha as keyof typeof recommendations]?.[category as keyof (typeof recommendations)['vata']] || 
    "Извините, рекомендации не найдены. Пожалуйста, уточните ваш запрос.";
};

const Index = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const dosha = searchParams.get('dosha');
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; timestamp: Date }>>([]);
  const [newMessage, setNewMessage] = useState("");

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
      
      // Add AI response after user message
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
      <Disclaimer />
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