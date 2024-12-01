import { PanchakarmaForm } from "@/components/panchakarma/PanchakarmaForm";
import { ImageSlider } from "@/components/panchakarma/ImageSlider";
import { ProgramDescription } from "@/components/panchakarma/ProgramDescription";

const Panchakarma = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-ayurveda-primary mb-4">
            Панчакарма в Индии
          </h1>
          <p className="text-lg text-gray-600">
            Аутентичная программа глубокого очищения и омоложения в сердце Аюрведы
          </p>
        </div>

        <div className="mb-12">
          <ImageSlider />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <ProgramDescription />
          
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-lg">
            <PanchakarmaForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panchakarma;