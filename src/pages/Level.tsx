import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { levels } from '@/data/levels';
import { ArrowLeft, Star, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ExerciseCard from '@/components/ExerciseCard';
import { generateExercises } from '@/lib/exerciseGenerator';

export default function Level() {
  const { levelNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [exercises, setExercises] = useState<any[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const level = levels.find(l => l.number === Number(levelNumber));

  useEffect(() => {
    if (!level || !user) {
      navigate('/dashboard');
      return;
    }

    loadExercises();
  }, [level, user]);

  const loadExercises = async () => {
    setLoading(true);
    
    // Generar ejercicios basados en el nivel
    const generatedExercises = generateExercises(Number(levelNumber), 10);
    setExercises(generatedExercises);
    
    setLoading(false);
  };

  const handleAnswer = async (isCorrect: boolean) => {
    const xpEarned = isCorrect ? 10 : 0;
    
    // Guardar intento
    await supabase.from('exercise_attempts').insert({
      user_id: user?.id,
      level_number: Number(levelNumber),
      exercise_type: exercises[currentExerciseIndex].type,
      is_correct: isCorrect,
      xp_earned: xpEarned,
    });

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: '¡Correcto! 🎉',
        description: `+${xpEarned} XP`,
      });
    } else {
      toast({
        title: 'Incorrecto',
        description: 'Inténtalo de nuevo',
        variant: 'destructive',
      });
    }

    if (currentExerciseIndex < exercises.length - 1) {
      setTimeout(() => setCurrentExerciseIndex(currentExerciseIndex + 1), 1500);
    } else {
      completeLevel();
    }
  };

  const completeLevel = async () => {
    const stars = Math.ceil((score / exercises.length) * 3);
    const totalXP = score * 10;

    // Actualizar progreso del nivel
    await supabase.from('level_progress').upsert({
      user_id: user?.id,
      level_number: Number(levelNumber),
      is_unlocked: true,
      is_completed: true,
      stars_earned: stars,
      xp_earned: totalXP,
      completed_at: new Date().toISOString(),
    });

    // Actualizar perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', user?.id)
      .single();

    await supabase
      .from('profiles')
      .update({ total_xp: (profile?.total_xp || 0) + totalXP })
      .eq('id', user?.id);

    // Desbloquear siguiente nivel
    if (Number(levelNumber) < levels.length) {
      await supabase.from('level_progress').upsert({
        user_id: user?.id,
        level_number: Number(levelNumber) + 1,
        is_unlocked: true,
        is_completed: false,
      });
    }

    setCompleted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando ejercicios...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    const stars = Math.ceil((score / exercises.length) * 3);
    const percentage = (score / exercises.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-8 text-center space-y-6">
            <Trophy className="w-20 h-20 text-accent mx-auto" />
            
            <div>
              <h2 className="text-3xl font-bold mb-2">¡Nivel Completado!</h2>
              <p className="text-muted-foreground">
                {score} de {exercises.length} correctas ({percentage.toFixed(0)}%)
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-12 h-12 ${
                    star <= stars ? 'text-accent fill-accent' : 'text-muted'
                  }`}
                />
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">XP Ganados</p>
              <p className="text-3xl font-bold text-primary">+{score * 10} XP</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                Volver al Dashboard
              </Button>
              <Button
                className="flex-1 bg-gradient-primary"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!level || exercises.length === 0) return null;

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex-1">
              <h1 className="font-bold">{level.title}</h1>
              <p className="text-sm text-muted-foreground">
                Pregunta {currentExerciseIndex + 1} de {exercises.length}
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-bold">{score}</span>
            </div>
          </div>

          <Progress 
            value={((currentExerciseIndex + 1) / exercises.length) * 100}
            className="h-2"
          />
        </div>
      </header>

      {/* Exercise Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <ExerciseCard
          exercise={currentExercise}
          onAnswer={handleAnswer}
        />
      </main>
    </div>
  );
}
