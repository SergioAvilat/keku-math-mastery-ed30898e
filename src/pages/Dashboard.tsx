import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { levels } from '@/data/levels';
import { Trophy, Flame, Star, LogOut, Lock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  username: string;
  learning_style: string;
  total_xp: number;
  current_streak: number;
}

interface LevelProgress {
  level_number: number;
  is_unlocked: boolean;
  is_completed: boolean;
  stars_earned: number;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [levelProgress, setLevelProgress] = useState<LevelProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      const { data: progressData } = await supabase
        .from('level_progress')
        .select('*')
        .eq('user_id', user?.id);

      if (profileData) {
        setProfile(profileData);
        
        if (profileData.learning_style === 'not_set') {
          navigate('/vark-test');
          return;
        }
      }

      setLevelProgress(progressData || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar tus datos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getLevelStatus = (levelNumber: number) => {
    return levelProgress.find(p => p.level_number === levelNumber);
  };

  const handleLevelClick = (levelNumber: number) => {
    const status = getLevelStatus(levelNumber);
    if (status?.is_unlocked) {
      navigate(`/level/${levelNumber}`);
    } else {
      toast({
        title: 'Nivel bloqueado',
        description: 'Completa el nivel anterior para desbloquear este',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-black text-primary">KEKU</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Flame className="w-5 h-5 text-accent" />
              <span className="font-bold">{profile?.current_streak || 0}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-bold">{profile?.total_xp || 0} XP</span>
            </div>
            
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            ¡Hola, {profile?.username || 'Estudiante'}! 👋
          </h2>
          <p className="text-muted-foreground">
            Tu estilo de aprendizaje: <span className="font-semibold text-primary capitalize">{profile?.learning_style?.replace('_', ' ')}</span>
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Tu progreso en Módulo A</h3>
              <span className="text-sm text-muted-foreground">
                {levelProgress.filter(p => p.is_completed).length} / {levels.length} niveles
              </span>
            </div>
            <Progress 
              value={(levelProgress.filter(p => p.is_completed).length / levels.length) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>

        {/* Levels Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" />
            Mapa de Niveles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((level) => {
              const status = getLevelStatus(level.number);
              const isLocked = !status?.is_unlocked;
              const isCompleted = status?.is_completed;

              return (
                <Card
                  key={level.number}
                  className={`relative overflow-hidden transition-all cursor-pointer hover:shadow-lg ${
                    isLocked ? 'opacity-60' : 'hover:scale-105'
                  }`}
                  onClick={() => handleLevelClick(level.number)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-10`} />
                  
                  <CardContent className="relative p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                          {level.number}
                        </div>
                        
                        <div>
                          <h4 className="font-bold">{level.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {level.description}
                          </p>
                        </div>
                      </div>

                      {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                      {isCompleted && <Check className="w-5 h-5 text-success" />}
                    </div>

                    {!isLocked && (
                      <div className="flex items-center gap-1 mt-4">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= (status?.stars_earned || 0)
                                ? 'text-accent fill-accent'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
