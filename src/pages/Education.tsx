import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Book, Users, Calendar } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Основы Аюрведы",
    duration: "3 месяца",
    level: "Начальный",
    price: "29,900 ₽",
    description: "Базовый курс по основам аюрведической медицины, включающий изучение дош, пракрити, викрити и основных принципов диагностики.",
    features: [
      "12 онлайн-занятий",
      "Практические задания",
      "Сертификат по окончании",
      "Доступ к материалам курса навсегда"
    ]
  },
  {
    id: 2,
    title: "Аюрведическое питание",
    duration: "2 месяца",
    level: "Средний",
    price: "24,900 ₽",
    description: "Углубленный курс по аюрведическому питанию, включающий изучение свойств продуктов, составление индивидуального меню и приготовление блюд.",
    features: [
      "8 онлайн-занятий",
      "Книга рецептов",
      "Индивидуальные консультации",
      "Практические мастер-классы"
    ]
  },
  {
    id: 3,
    title: "Профессиональный курс",
    duration: "6 месяцев",
    level: "Продвинутый",
    price: "49,900 ₽",
    description: "Комплексная программа для будущих специалистов по аюрведе, включающая все аспекты традиционной медицины и практики.",
    features: [
      "24 онлайн-занятия",
      "Практика с опытными специалистами",
      "Профессиональный сертификат",
      "Помощь в трудоустройстве"
    ]
  }
];

const Education = () => {
  const { toast } = useToast();

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: "Заявка на обучение",
      description: `Мы свяжемся с вами для записи на курс "${courseTitle}"`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-medium text-ayurveda-primary mb-4">
          Обучение Аюрведе
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Получите глубокие знания о древней науке здоровья и жизни от опытных преподавателей
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-ayurveda-primary">{course.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{course.duration}</span>
                <span className="mx-2">•</span>
                <Users className="h-4 w-4" />
                <span>{course.level}</span>
              </div>
              <p className="text-gray-600">{course.description}</p>
              <ul className="space-y-2">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Book className="h-4 w-4 text-ayurveda-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-2xl font-bold text-ayurveda-primary text-center">
                {course.price}
              </p>
              <Button 
                onClick={() => handleEnroll(course.title)}
                className="w-full bg-ayurveda-primary hover:bg-ayurveda-primary/90"
              >
                Записаться на курс
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Education;