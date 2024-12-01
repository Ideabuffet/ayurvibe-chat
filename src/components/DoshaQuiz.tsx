import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { doshaQuestions, type Answer } from "@/data/doshaQuestions";
import { Disclaimer } from "./Disclaimer";
import { 
  Apple, 
  HeartPulse, 
  Brain,
  Calendar
} from "lucide-react";

type DoshaScores = {
  vata: number;
  pitta: number;
  kapha: number;
};

export const DoshaQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const section = doshaQuestions[currentSection];
  const question = section?.questions[currentQuestion];

  const handleNext = () => {
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
      setShowResults(true);
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
    // Set the previously selected answer for this question
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

  const getDominantDosha = (scores: DoshaScores) => {
    const max = Math.max(scores.vata, scores.pitta, scores.kapha);
    if (scores.vata === max) return "Вата";
    if (scores.pitta === max) return "Питта";
    return "Капха";
  };

  if (showResults) {
    const scores = calculateResults();
    const dominantDosha = getDominantDosha(scores);

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Ваш результат</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-medium">
              Ваша доминирующая доша: {dominantDosha}
            </p>
            <div className="space-y-2">
              <p>Распределение баллов:</p>
              <ul className="list-disc pl-5">
                <li>Вата: {scores.vata}</li>
                <li>Питта: {scores.pitta}</li>
                <li>Капха: {scores.kapha}</li>
              </ul>
            </div>
            
            <div className="pt-6">
              <p className="font-medium mb-4">Что дальше?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="w-full" variant="outline">
                  <Apple className="mr-2" />
                  Рекомендации по питанию
                </Button>
                <Button className="w-full" variant="outline">
                  <HeartPulse className="mr-2" />
                  Здоровье и лечение
                </Button>
                <Button className="w-full" variant="outline">
                  <Brain className="mr-2" />
                  Практики и медитации
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2" />
                  Ежедневные рутины
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isFirstQuestion = currentSection === 0 && currentQuestion === 0;

  return (
    <div className="space-y-4">
      <Disclaimer />
      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">{question.text}</p>
            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
            >
              {question.answers.map((answer, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                  <Label htmlFor={`answer-${index}`}>{answer.text}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="pt-4 flex gap-4">
              <Button 
                onClick={handleBack}
                disabled={isFirstQuestion}
                variant="outline"
                className="w-full"
              >
                Назад
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="w-full"
              >
                Далее
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};