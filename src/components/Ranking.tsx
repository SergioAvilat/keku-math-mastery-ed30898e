import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';

interface RankingUser {
  id: string;
  username: string;
  total_xp: number;
  current_streak: number;
}

export default function Ranking() {
  const [topUsers, setTopUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, total_xp, current_streak')
        .order('total_xp', { ascending: false })
        .limit(5);

      if (data) {
        setTopUsers(data);
      }
    } catch (error) {
      console.error('Error cargando ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-accent" />;
    if (index === 1) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (index === 2) return <Award className="w-5 h-5 text-[hsl(var(--warning))]" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{index + 1}</span>;
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Ranking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {user.username || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.total_xp} XP
              </p>
            </div>
          </div>
        ))}
        
        {topUsers.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-4">
            No hay usuarios en el ranking aún
          </p>
        )}
      </CardContent>
    </Card>
  );
}
