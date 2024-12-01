import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const doctors = [
  {
    id: 1,
    name: "Др. Амит Шарма",
    specialization: "Аюрведический врач",
    experience: "15 лет опыта",
    description: "Специализируется на лечении хронических заболеваний и балансировке дош",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format"
  },
  {
    id: 2,
    name: "Др. Прия Патель",
    specialization: "Специалист по панчакарме",
    experience: "12 лет опыта",
    description: "Эксперт в области детоксикации и омоложения организма",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format"
  },
  {
    id: 3,
    name: "Др. Раджеш Кумар",
    specialization: "Пульс-диагностика",
    experience: "20 лет опыта",
    description: "Мастер традиционной пульс-диагностики и фитотерапии",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format"
  },
  {
    id: 4,
    name: "Др. Сунита Рао",
    specialization: "Аюрведическая диетология",
    experience: "10 лет опыта",
    description: "Специалист по питанию и образу жизни",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format"
  },
  {
    id: 5,
    name: "Др. Викрам Синх",
    specialization: "Марма-терапия",
    experience: "18 лет опыта",
    description: "Эксперт по энергетическим точкам и массажным техникам",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format"
  },
  {
    id: 6,
    name: "Др. Мира Капур",
    specialization: "Женское здоровье",
    experience: "14 лет опыта",
    description: "Специализируется на женском здоровье и пренатальной care",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&auto=format"
  },
  {
    id: 7,
    name: "Др. Анил Гупта",
    specialization: "Психическое здоровье",
    experience: "16 лет опыта",
    description: "Эксперт по аюрведической психологии и медитации",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format"
  },
  {
    id: 8,
    name: "Др. Лакшми Нараян",
    specialization: "Детское здоровье",
    experience: "13 лет опыта",
    description: "Специалист по педиатрической аюрведе",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format"
  },
  {
    id: 9,
    name: "Др. Рави Шастри",
    specialization: "Спортивная аюрведа",
    experience: "11 лет опыта",
    description: "Эксперт по реабилитации и спортивной медицине",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format"
  },
  {
    id: 10,
    name: "Др. Дипика Редди",
    specialization: "Кожные заболевания",
    experience: "15 лет опыта",
    description: "Специалист по лечению кожных заболеваний и косметологии",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format"
  }
];

const Consultation = () => {
  const { toast } = useToast();

  const handleBooking = (doctorName: string) => {
    toast({
      title: "Запись на консультацию",
      description: `Скоро с вами свяжутся для записи к ${doctorName}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-medium text-ayurveda-primary text-center mb-8">
        Наши специалисты
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-medium text-ayurveda-primary">{doctor.name}</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium text-ayurveda-accent">{doctor.specialization}</p>
                <p className="text-sm text-gray-600">{doctor.experience}</p>
                <p className="text-sm">{doctor.description}</p>
              </div>
              <Button 
                onClick={() => handleBooking(doctor.name)}
                className="w-full bg-ayurveda-primary hover:bg-ayurveda-primary/90"
              >
                Записаться на консультацию
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Consultation;