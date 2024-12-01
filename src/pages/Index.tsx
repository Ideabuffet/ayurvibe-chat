import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { DoshaType } from "@/types/dosha";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HerbalSection } from "@/components/herbs/HerbalSection";

const getCategoryTitle = (category: string): string => {
  switch (category) {
    case 'general':
      return 'Задайте вопрос об Аюрведе';
    case 'nutrition':
      return 'Рекомендации по питанию';
    case 'health':
      return 'Здоровье и лечение';
    case 'meditation':
      return 'Практики и медитации';
    case 'routine':
      return 'Ежедневные рутины';
    case 'herbs':
      return 'Травяные средства';
    case 'diet':
      return 'Диетические рекомендации';
    case 'lifestyle':
      return 'Образ жизни';
    case 'chronic':
      return 'Хронические заболевания';
    case 'detox':
      return 'Детокс и очищение';
    case 'stress':
      return 'Стресс и эмоции';
    case 'beauty':
      return 'Красота и уход за кожей';
    case 'energy':
      return 'Энергия и духовность';
    case 'sleep':
      return 'Улучшение сна';
    default:
      return '';
  }
};

const Index = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doshaParam = searchParams.get('dosha');
  const dosha = (doshaParam as DoshaType) || 'vata';
  const [hasResults, setHasResults] = useState(false);
  const categoryTitle = getCategoryTitle(category || '');
  const isDoshaRelated = doshaParam !== null;
  const isHerbsCategory = category === 'herbs';
  const isGeneralChat = category === 'general';

  useEffect(() => {
    const checkDoshaResults = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('dosha')
          .eq('id', session.user.id)
          .single();
        
        setHasResults(!!data?.dosha);
      }
    };

    checkDoshaResults();
  }, []);

  if (category === "dosha") {
    return <DoshaQuiz />;
  }

  const handleBackToResults = () => {
    navigate(`/chat/dosha?showResults=true`);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      {isDoshaRelated && !isGeneralChat && (
        <Button 
          variant="outline" 
          onClick={handleBackToResults}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться к результатам
        </Button>
      )}
      
      <h1 className="text-3xl font-serif font-medium text-ayurveda-primary mb-6 text-center">
        {categoryTitle}
      </h1>

      {isHerbsCategory ? (
        <HerbalSection />
      ) : (
        category && <ChatContainer category={category} dosha={dosha} />
      )}
    </div>
  );
};

export default Index;