import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DoshaQuiz } from "@/components/DoshaQuiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { DoshaType } from "@/types/dosha";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { NavigationButtons } from "@/components/chat/NavigationButtons";

const Index = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doshaParam = searchParams.get('dosha');
  const dosha = (doshaParam as DoshaType) || 'vata';

  const handleNavigateToRecommendation = (newCategory: string) => {
    navigate(`/chat/${newCategory}?dosha=${dosha}`);
  };

  const handleBackToResults = () => {
    navigate(`/chat/dosha`);
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
      
      <NavigationButtons onNavigate={handleNavigateToRecommendation} />
      
      {category && <ChatContainer category={category} dosha={dosha} />}
    </div>
  );
};

export default Index;