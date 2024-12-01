import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Елена Петрова",
    rating: 5,
    text: "Прошла программу детокса и чувствую себя обновленной. Результаты превзошли все ожидания!",
  },
  {
    id: 2,
    name: "Михаил Иванов",
    rating: 5,
    text: "Отличная программа! Похудел на 5 кг и значительно улучшилось самочувствие.",
  },
  {
    id: 3,
    name: "Анна Сидорова",
    rating: 5,
    text: "Профессиональный подход и внимательное отношение. Рекомендую всем!",
  }
];

const Detox = () => {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами для обсуждения деталей программы",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-ayurveda-primary mb-4">
            Программа детоксикации
          </h1>
          <p className="text-lg text-gray-600">
            Очищение организма по древним аюрведическим практикам
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Trainer"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-ayurveda-primary mb-2">
                Светлана Михайлова
              </h2>
              <p className="text-gray-600">
                Сертифицированный специалист по аюрведической медицине с 10-летним опытом
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-ayurveda-primary">
                О программе:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 21-дневная программа очищения организма</li>
                <li>• Индивидуальный план питания</li>
                <li>• Ежедневные практики и медитации</li>
                <li>• Поддержка 24/7</li>
                <li>• Консультации со специалистом</li>
              </ul>
            </div>
            <div>
              <p className="text-2xl font-bold text-ayurveda-primary mb-4">
                $299
              </p>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-ayurveda-primary hover:bg-ayurveda-primary/90"
              >
                Записаться на программу
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-medium text-ayurveda-primary text-center">
            Отзывы участников
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <p className="font-medium text-ayurveda-primary">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detox;