import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getRandomReward, type Reward } from '@/data/rewards';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface RewardChestProps {
  currentXP: number;
  onXPSpent: () => void;
}

const XP_COST = 20;

export default function RewardChest({ currentXP, onXPSpent }: RewardChestProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [claiming, setClaiming] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const canClaim = currentXP >= XP_COST;

  const handleClaim = async () => {
    if (!user || !canClaim || claiming) return;

    setClaiming(true);
    setIsAnimating(true);

    try {
      // Obtener el perfil actual
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('id', user.id)
        .single();

      if (!profile || profile.total_xp < XP_COST) {
        toast({
          title: 'XP insuficiente',
          description: `Necesitas ${XP_COST} XP para reclamar un premio`,
          variant: 'destructive',
        });
        return;
      }

      // Restar XP
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ total_xp: profile.total_xp - XP_COST })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Obtener premio aleatorio
      const reward = getRandomReward();

      // Guardar premio reclamado
      const { error: insertError } = await supabase
        .from('claimed_rewards')
        .insert({
          user_id: user.id,
          reward_type: reward.type,
          reward_content: reward.type === 'quote' 
            ? `${reward.content} - ${reward.author}`
            : reward.content,
          xp_cost: XP_COST,
        });

      if (insertError) throw insertError;

      // Mostrar premio
      setCurrentReward(reward);
      setTimeout(() => {
        setIsAnimating(false);
        setShowReward(true);
        onXPSpent();
      }, 1000);

    } catch (error) {
      console.error('Error reclamando premio:', error);
      toast({
        title: 'Error',
        description: 'No se pudo reclamar el premio',
        variant: 'destructive',
      });
      setIsAnimating(false);
    } finally {
      setClaiming(false);
    }
  };

  const closeReward = () => {
    setShowReward(false);
    setCurrentReward(null);
  };

  return (
    <>
      <Button
        onClick={handleClaim}
        disabled={!canClaim || claiming}
        variant="outline"
        size="sm"
        className="gap-2 relative"
      >
        <Gift className={`w-4 h-4 ${isAnimating ? 'animate-bounce' : ''}`} />
        Cofre ({XP_COST} XP)
      </Button>

      <Dialog open={showReward} onOpenChange={closeReward}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent">
              <Sparkles className="w-5 h-5" />
              {currentReward?.type === 'quote' ? '¡Frase Inspiradora!' : '¡Tip Matemático!'}
            </DialogTitle>
            <DialogDescription>
              Has gastado {XP_COST} XP
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <p className="text-foreground leading-relaxed">
                {currentReward?.content}
              </p>
              {currentReward?.author && (
                <p className="text-sm text-muted-foreground mt-3 text-right font-medium">
                  - {currentReward.author}
                </p>
              )}
            </div>
          </div>

          <Button onClick={closeReward} className="w-full">
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
