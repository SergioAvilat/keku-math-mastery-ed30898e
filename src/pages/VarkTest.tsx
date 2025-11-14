import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, Headphones, BookText, Hand } from 'lucide-react';

const varkQuestions = [
  {
    question: '¿Cómo prefieres aprender conceptos matemáticos nuevos?',
    options: [
      { style: 'visual', text: 'Con gráficos, diagramas y colores', icon: Eye },
      { style: 'auditory', text: 'Escuchando explicaciones y discutiendo', icon: Headphones },
      { style: 'reading', text: 'Leyendo textos y tomando notas', icon: BookText },
      { style: 'kinesthetic', text: 'Practicando y manipulando objetos', icon: Hand },
    ],
  },
  {
    question: 'Cuando resuelves un problema, ¿qué te ayuda más?',
    options: [
      { style: 'visual', text: 'Ver ejemplos resueltos con pasos visuales', icon: Eye },
      { style: 'auditory', text: 'Que alguien me explique el proceso', icon: Headphones },
      { style: 'reading', text: 'Leer instrucciones detalladas', icon: BookText },
      { style: 'kinesthetic', text: 'Intentarlo yo mismo varias veces', icon: Hand },
    ],
  },
  {
    question: '¿Cómo memorizas mejor las fórmulas?',
    options: [
      { style: 'visual', text: 'Con esquemas y tarjetas de colores', icon: Eye },
      { style: 'auditory', text: 'Repitiéndolas en voz alta', icon: Headphones },
      { style: 'reading', text: 'Escribiéndolas múltiples veces', icon: BookText },
      { style: 'kinesthetic', text: 'Usándolas en ejercicios prácticos', icon: Hand },
    ],
  },
  {
    question: 'Al estudiar para un examen, prefieres:',
    options: [
      { style: 'visual', text: 'Hacer mapas mentales y resúmenes gráficos', icon: Eye },
      { style: 'auditory', text: 'Explicarle a alguien o grabarme', icon: Headphones },
      { style: 'reading', text: 'Releer mis apuntes y libros', icon: BookText },
      { style: 'kinesthetic', text: 'Hacer muchos ejercicios prácticos', icon: Hand },
    ],
  },
];

export default function VarkTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleNext = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestion < varkQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = async (finalAnswers: string[]) => {
    setLoading(true);
    
    const counts = finalAnswers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantStyle = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    
    const { error } = await supabase
      .from('profiles')
      .update({ learning_style: dominantStyle })
      .eq('id', user?.id);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar tu estilo de aprendizaje',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '¡Test completado!',
        description: `Tu estilo de aprendizaje es: ${getStyleName(dominantStyle)}`,
      });
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const getStyleName = (style: string) => {
    const names: Record<string, string> = {
      visual: 'Visual',
      auditory: 'Auditivo',
      reading: 'Lector/Escritor',
      kinesthetic: 'Kinestésico',
    };
    return names[style] || style;
  };

  const question = varkQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle>Test de Estilo de Aprendizaje VARK</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {varkQuestions.length}
            </span>
          </div>
          <CardDescription>
            Esto nos ayudará a personalizar tu experiencia de aprendizaje
          </CardDescription>
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / varkQuestions.length) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <h3 className="text-lg font-semibold">{question.question}</h3>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const Icon = option.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:border-primary/50 ${
                      selectedAnswer === option.style
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                    onClick={() => setSelectedAnswer(option.style)}
                  >
                    <RadioGroupItem value={option.style} id={`option-${idx}`} />
                    <Icon className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor={`option-${idx}`}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option.text}
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                  setAnswers(answers.slice(0, -1));
                  setSelectedAnswer(answers[currentQuestion - 1] || '');
                }
              }}
              disabled={currentQuestion === 0}
            >
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer || loading}
              className="bg-gradient-primary hover:opacity-90"
            >
              {loading
                ? 'Guardando...'
                : currentQuestion === varkQuestions.length - 1
                ? 'Finalizar'
                : 'Siguiente'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
