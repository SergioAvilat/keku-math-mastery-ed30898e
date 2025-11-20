import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { curriculum } from '@/data/curriculum';
import { Trophy, Flame, Star, LogOut, Lock, Check, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RewardChest from '@/components/RewardChest';
import TitleRoulette from '@/components/TitleRoulette';

interface Profile {
  username: string;
  learning_style: string;
  total_xp: number;
  current_streak: number;
}

interface TopicProgress {
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
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
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

      setTopicProgress(progressData || []);
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

  const getTopicStatus = (topicNumber: number) => {
    return topicProgress.find(p => p.level_number === topicNumber);
  };

  const handleTopicClick = (topicNumber: number) => {
    const status = getTopicStatus(topicNumber);
    if (status?.is_unlocked) {
      navigate(`/topic/${topicNumber}`);
    } else {
      toast({
        title: 'Tema bloqueado',
        description: 'Completa el tema anterior para desbloquear este',
      });
    }
  };

  const getLearningStyleLabel = (style: string) => {
    const styles: Record<string, string> = {
      visual: 'Visual',
      auditivo: 'Auditivo',
      kinestesico: 'Kinestésico',
      lectoescritor: 'Lectoescritor',
    };
    return styles[style] || style;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
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
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Flame className="w-5 h-5 text-accent" />
              <span className="font-bold">{profile?.current_streak || 0}</span>
            </div>

            <TitleRoulette 
              currentTitle={profile?.username || 'Estudiante'}
              currentXP={profile?.total_xp || 0}
              onTitleChange={loadUserData}
            />

            <RewardChest 
              currentXP={profile?.total_xp || 0} 
              onXPSpent={loadUserData}
            />
            
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
        {/* Welcome */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">
            ¡Hola, {profile?.username || 'Estudiante'}! 👋
          </h2>
          <p className="text-muted-foreground">
            Tu estilo de aprendizaje es <span className="font-semibold text-foreground">
              {getLearningStyleLabel(profile?.learning_style || '')}
            </span>
          </p>
        </div>

        {/* Curriculum */}
        <div className="space-y-8">
          {curriculum.map((level) => {
            const levelTopics = level.topics;
            const completedTopics = levelTopics.filter(
              t => getTopicStatus(t.number)?.is_completed
            ).length;
            const totalTopics = levelTopics.length;
            const progressPercent = (completedTopics / totalTopics) * 100;

            return (
              <Card key={level.number} className="overflow-hidden">
                <CardHeader className={`bg-gradient-to-r ${level.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-black">{level.title}</CardTitle>
                      <p className="text-xl font-semibold mt-1 opacity-90">{level.subtitle}</p>
                      <p className="text-sm mt-2 opacity-80">{level.description}</p>
                    </div>
                    <Trophy className="w-12 h-12 opacity-80" />
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2 opacity-90">
                      <span>Progreso del nivel</span>
                      <span>{completedTopics}/{totalTopics} temas</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {level.topics.map((topic) => {
                      const status = getTopicStatus(topic.number);
                      const isLocked = !status?.is_unlocked;
                      const isCompleted = status?.is_completed;
                      const stars = status?.stars_earned || 0;

                      return (
                        <button
                          key={topic.number}
                          onClick={() => handleTopicClick(topic.number)}
                          disabled={isLocked}
                          className={`
                            relative p-4 rounded-lg text-left transition-all
                            ${isLocked 
                              ? 'bg-muted/50 cursor-not-allowed opacity-60' 
                              : 'bg-card hover:bg-accent/5 hover:shadow-md cursor-pointer border-2 border-transparent hover:border-primary/20'
                            }
                          `}
                        >
                          {/* Status indicator */}
                          <div className="absolute top-4 right-4">
                            {isLocked && (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            )}
                            {isCompleted && (
                              <div className="flex items-center gap-1 bg-success/10 px-2 py-1 rounded-full">
                                <Check className="w-4 h-4 text-success" />
                                <span className="text-xs font-bold text-success">{stars}★</span>
                              </div>
                            )}
                            {!isLocked && !isCompleted && (
                              <ChevronRight className="w-5 h-5 text-primary" />
                            )}
                          </div>

                          <div className="pr-12">
                            <div className="text-xs font-bold text-primary mb-1">
                              TEMA {topic.number}
                            </div>
                            <h3 className="font-bold text-lg mb-2 leading-tight">
                              {topic.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {topic.description}
                            </p>
                            
                            <div className="space-y-1">
                              {topic.details.slice(0, 3).map((detail, idx) => (
                                <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{detail}</span>
                                </div>
                              ))}
                              {topic.details.length > 3 && (
                                <div className="text-xs text-muted-foreground/60 pl-2">
                                  +{topic.details.length - 3} más...
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
