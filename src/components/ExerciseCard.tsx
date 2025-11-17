import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import FeedbackMascot from '@/components/FeedbackMascot';
import { validateTextAnswer, validateMultipleChoice } from '@/lib/answerValidator';

interface ExerciseCardProps {
  exercise: any;
  onAnswer: (isCorrect: boolean) => void;
}

export default function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (submitted) return;
    
    let correct = false;
    
    if (exercise.type === 'multiple-choice') {
      correct = validateMultipleChoice(selectedAnswer, exercise.correctAnswer);
    } else if (exercise.type === 'fill-blank') {
      correct = validateTextAnswer(textAnswer, exercise.correctAnswer);
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    setSubmitted(true);
    
    // Ocultar feedback y avanzar después de la animación
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(correct);
    }, 2000);
  };

  const canSubmit = 
    (exercise.type === 'multiple-choice' && selectedAnswer) ||
    (exercise.type === 'fill-blank' && textAnswer.trim());

  return (
    <>
      <FeedbackMascot isCorrect={isCorrect} show={showFeedback} />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">{exercise.question}</CardTitle>
        </CardHeader>
      
      <CardContent className="space-y-6">
        {exercise.type === 'multiple-choice' && (
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={setSelectedAnswer}
            disabled={submitted}
          >
            <div className="space-y-3">
              {exercise.options.map((option: string, idx: number) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                    submitted
                      ? option === exercise.correctAnswer
                        ? 'border-success bg-success/10'
                        : option === selectedAnswer
                        ? 'border-destructive bg-destructive/10'
                        : 'border-border'
                      : selectedAnswer === option
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => !submitted && setSelectedAnswer(option)}
                >
                  <RadioGroupItem value={option} id={`option-${idx}`} />
                  <Label
                    htmlFor={`option-${idx}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}

        {exercise.type === 'fill-blank' && (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Escribe tu respuesta aquí"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={submitted}
              className="text-lg"
            />
            {submitted && (
              <p className={`text-sm ${
                textAnswer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase()
                  ? 'text-success'
                  : 'text-destructive'
              }`}>
                Respuesta correcta: {exercise.correctAnswer}
              </p>
            )}
          </div>
        )}

        {exercise.hint && !submitted && (
          <p className="text-sm text-muted-foreground italic">
            💡 Pista: {exercise.hint}
          </p>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || submitted}
          className="w-full bg-gradient-primary hover:opacity-90"
          size="lg"
        >
          {submitted ? 'Siguiente...' : 'Comprobar'}
        </Button>
      </CardContent>
      </Card>
    </>
  );
}
