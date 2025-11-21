import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getTopicByNumber } from '@/data/curriculum';
import { ArrowLeft, Star, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ExerciseCard from '@/components/ExerciseCard';
import { generateExercises } from '@/lib/exerciseGenerator';
import kekuFelicidades from '@/assets/keku-felicidades.png';

export default function Topic() {
  const { topicNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [exercises, setExercises] = useState<any[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const topic = getTopicByNumber(Number(topicNumber));

  useEffect(() => {
    if (!topic || !user) {
      navigate('/dashboard');
      return;
    }

    loadExercises();
  }, [topic, user]);

  const loadExercises = async () => {
    setLoading(true);
    
    const generatedExercises = generateExercises(Number(topicNumber), 10);
    setExercises(generatedExercises);
    
    setLoading(false);
  };

  const handleAnswer = async (isCorrect: boolean) => {
    const xpEarned = isCorrect ? 10 : 0;
    
    await supabase.from('exercise_attempts').insert({
      user_id: user?.id,
      level_number: Number(topicNumber),
      exercise_type: exercises[currentExerciseIndex].type,
      is_correct: isCorrect,
      xp_earned: xpEarned,
    });

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentExerciseIndex < exercises.length - 1) {
      setTimeout(() => setCurrentExerciseIndex(currentExerciseIndex + 1), 2500);
    } else {
      setTimeout(() => completeTopic(), 2500);
    }
  };

  const completeTopic = async () => {
    const stars = Math.ceil((score / exercises.length) * 3);
    const totalXP = score * 10;

    await supabase.from('level_progress').upsert(
      {
        user_id: user?.id,
        level_number: Number(topicNumber),
        is_unlocked: true,
        is_completed: true,
        stars_earned: stars,
        xp_earned: totalXP,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,level_number' }
    );

    const { data: profile } = await supabase
      .from('profiles')
      .select('total_xp')
      .eq('id', user?.id)
      .single();

    await supabase
      .from('profiles')
      .update({ total_xp: (profile?.total_xp || 0) + totalXP })
      .eq('id', user?.id);

    // Desbloquear siguiente tema
    if (Number(topicNumber) < 9) {
      await supabase.from('level_progress').upsert(
        {
          user_id: user?.id,
          level_number: Number(topicNumber) + 1,
          is_unlocked: true,
          is_completed: false,
        },
        { onConflict: 'user_id,level_number' }
      );
    }

    setCompleted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando ejercicios...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    const stars = Math.ceil((score / exercises.length) * 3);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={kekuFelicidades}
                alt="Keku felicitando"
                className="w-32 h-32 object-contain"
              />
            </div>
            
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Tema Completado!</h2>
            <p className="text-muted-foreground mb-6">{topic?.title}</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${
                    star <= stars
                      ? 'fill-primary text-primary'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            
            <div className="space-y-2 mb-6">
              <p className="text-lg">
                Puntuación: <span className="font-bold">{score}/{exercises.length}</span>
              </p>
              <p className="text-lg">
                XP ganado: <span className="font-bold text-primary">{score * 10} XP</span>
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">{topic?.title}</h1>
            <p className="text-sm text-muted-foreground">{topic?.description}</p>
          </div>
          
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Pregunta {currentExerciseIndex + 1} de {exercises.length}
            </span>
            <span className="text-sm font-bold">
              Puntaje: {score}/{exercises.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Exercise */}
        <ExerciseCard
          exercise={exercises[currentExerciseIndex]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
