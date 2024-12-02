import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { doshaQuestions, type Answer } from "@/data/doshaQuestions";
import { Disclaimer } from "./Disclaimer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DoshaScores, DoshaType } from "@/types/dosha";
import { DoshaResultHeader } from "./dosha/DoshaResultHeader";
import { DoshaRecommendations } from "./dosha/DoshaRecommendations";
import { supabase } from "@/integrations/supabase/client";

export const DoshaQuiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showResults = searchParams.get('showResults') === 'true';
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showingResults, setShowingResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [savedDosha, setSavedDosha] = useState<DoshaType | null>(null);
  const [savedScores, setSavedScores] = useState<DoshaScores | null>(null);

  useEffect(() => {
    const loadSavedResults = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('dosha, vata_score, pitta_score, kapha_score')
          .eq('id', session.user.id)
          .single();
        
        if (data?.dosha && showResults) {
          // Convert English dosha names to Russian
          const doshaMap: Record<string, DoshaType> = {
            'питта': 'pitta',
            'вата': 'vata',
            'капха': 'kapha',
          };
          const normalizedDosha = data.dosha.toLowerCase();
          const doshaType = doshaMap[normalizedDosha] || data.dosha as DoshaType;
          setSavedDosha(doshaType);
          setSavedScores({
            vata: data.vata_score || 0,
            pitta: data.pitta_score || 0,
            kapha: data.kapha_score || 0
          });
          setShowingResults(true);
        }
      }
    };

    loadSavedResults();
  }, [showResults]);

  const section = doshaQuestions[currentSection];
  const question = section?.questions[currentQuestion];

  const totalQuestions = doshaQuestions.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionNumber = doshaQuestions
    .slice(0, currentSection)
    .reduce((acc, section) => acc + section.questions.length, 0) + currentQuestion + 1;
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const handleNext = async () => {
    if (!selectedAnswer) return;

    const answer = question.answers[parseInt(selectedAnswer)];
    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));

    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < doshaQuestions.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      const scores = calculateResults();
      const dominantDosha = getDominantDosha(scores);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        // Convert dosha name to Russian before saving
        const doshaTranslations: Record<DoshaType, string> = {
          'pitta': 'питта',
          'vata': 'вата',
          'kapha': 'капха'
        };
        
        await supabase
          .from('profiles')
          .update({ 
            dosha: doshaTranslations[dominantDosha],
            vata_score: scores.vata,
            pitta_score: scores.pitta,
            kapha_score: scores.kapha
          })
          .eq('id', session.user.id);
      }
      
      setSavedDosha(dominantDosha);
      setSavedScores(scores);
      setShowingResults(true);
      navigate(`/chat/dosha?showResults=true`);
    }
    setSelectedAnswer(null);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(doshaQuestions[currentSection - 1].questions.length - 1);
    }
    const previousQuestionId = currentQuestion > 0 
      ? section.questions[currentQuestion - 1].id
      : doshaQuestions[currentSection - 1]?.questions[doshaQuestions[currentSection - 1].questions.length - 1].id;
    
    const previousAnswer = answers[previousQuestionId];
    if (previousAnswer) {
      const answerIndex = question.answers.findIndex(a => 
        a.vata === previousAnswer.vata && 
        a.pitta === previousAnswer.pitta && 
        a.kapha === previousAnswer.kapha
      );
      setSelectedAnswer(answerIndex.toString());
    }
  };

  const calculateResults = (): DoshaScores => {
    const scores = Object.values(answers).reduce(
      (acc, answer) => ({
        vata: acc.vata + answer.vata,
        pitta: acc.pitta + answer.pitta,
        kapha: acc.kapha + answer.kapha,
      }),
      { vata: 0, pitta: 0, kapha: 0 }
    );
    return scores;
  };

  const getDominantDosha = (scores: DoshaScores): DoshaType => {
    const max = Math.max(scores.vata, scores.pitta, scores.kapha);
    if (scores.vata === max) return "vata";
    if (scores.pitta === max) return "pitta";
    return "kapha";
  };

  if (showingResults && savedDosha) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-8 bg-white/80 backdrop-blur border-ayurveda-accent/20">
          <div className="space-y-8">
            <DoshaResultHeader 
              dominantDosha={savedDosha} 
              scores={savedScores || { vata: 0, pitta: 0, kapha: 0 }}
            />
            <DoshaRecommendations dominantDosha={savedDosha} />
          </div>
        </Card>
      </div>
    );
  }

  const isFirstQuestion = currentSection === 0 && currentQuestion === 0;

  return (
    <div className="max-w-2xl mx-auto min-h-[80vh] p-4 flex flex-col">
      <Disclaimer className="mb-6" />
      <Card className="flex-grow bg-white/80 backdrop-blur border-ayurveda-accent/20">
        <div className="p-8 flex flex-col h-full">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-medium text-ayurveda-primary mb-2">
              {section.title}
            </h2>
            <Progress value={progress} className="h-1" />
            <p className="text-sm text-ayurveda-text/60 mt-2">
              Вопрос {currentQuestionNumber} из {totalQuestions}
            </p>
          </div>

          <div className="flex-grow space-y-8">
            <p className="text-xl text-ayurveda-text">{question.text}</p>
            
            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
              className="space-y-4"
            >
              {question.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswer === index.toString()
                      ? "border-ayurveda-primary bg-ayurveda-accent/5"
                      : "border-ayurveda-accent/20 hover:border-ayurveda-primary/50"
                  }`}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`answer-${index}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`answer-${index}`}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="text-lg">{answer.text}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-4 mt-8">
            <Button 
              onClick={handleBack}
              disabled={isFirstQuestion}
              variant="outline"
              className="flex-1 bg-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex-1 bg-ayurveda-primary hover:bg-ayurveda-primary/90"
            >
              Далее
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};