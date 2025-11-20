import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { userTitles, getRandomTitle } from '@/data/userTitles';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const XP_COST = 20;

interface TitleRouletteProps {
  currentTitle: string;
  currentXP: number;
  onTitleChange: () => void;
}

export default function TitleRoulette({ currentTitle, currentXP, onTitleChange }: TitleRouletteProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(currentTitle);
  const [finalTitle, setFinalTitle] = useState('');
  
  const canSpin = currentXP >= XP_COST;

  const spinRoulette = async () => {
    if (!user || spinning || !canSpin) return;

    // Verificar y restar XP primero
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('id', user.id)
        .single();

      if (!profile || profile.total_xp < XP_COST) {
        toast({
          title: 'XP insuficiente',
          description: `Necesitas ${XP_COST} XP para girar la ruleta`,
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
    } catch (error) {
      console.error('Error al restar XP:', error);
      toast({
        title: 'Error',
        description: 'No se pudo procesar el XP',
        variant: 'destructive',
      });
      return;
    }

    setSpinning(true);
    setFinalTitle('');

    // Animación de ruleta
    let counter = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setDisplayTitle(userTitles[Math.floor(Math.random() * userTitles.length)]);
      counter++;

      if (counter >= maxSpins) {
        clearInterval(interval);
        const newTitle = getRandomTitle();
        setDisplayTitle(newTitle);
        setFinalTitle(newTitle);
        saveTitle(newTitle);
      }
    }, 100);
  };

  const saveTitle = async (title: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username: title })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: '¡Nuevo título desbloqueado!',
        description: `Ahora eres: ${title}`,
      });

      setTimeout(() => {
        setSpinning(false);
        onTitleChange();
      }, 1500);
    } catch (error) {
      console.error('Error guardando título:', error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar tu título',
        variant: 'destructive',
      });
      setSpinning(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={!canSpin}
        className="gap-2"
      >
        <Trophy className="w-4 h-4" />
        Ruleta ({XP_COST} XP)
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Trophy className="w-5 h-5" />
              Ruleta de Títulos
            </DialogTitle>
            <DialogDescription>
              Gira la ruleta por {XP_COST} XP para obtener un nuevo título épico
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="relative min-h-[120px] flex items-center justify-center">
              <div
                className={`text-center p-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 transition-all duration-200 ${
                  spinning ? 'animate-pulse scale-105' : ''
                }`}
              >
                <p className="text-2xl font-black text-primary leading-tight">
                  {displayTitle}
                </p>
              </div>
            </div>

            {finalTitle && !spinning && (
              <div className="text-center space-y-2 animate-fade-in">
                <Sparkles className="w-8 h-8 text-accent mx-auto" />
                <p className="text-sm text-muted-foreground">
                  ¡Has obtenido un nuevo título!
                </p>
              </div>
            )}

            <Button
              onClick={spinRoulette}
              disabled={spinning || !canSpin}
              className="w-full"
              size="lg"
            >
              {spinning ? 'Girando...' : canSpin ? '¡Girar Ruleta!' : `Necesitas ${XP_COST - currentXP} XP más`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Tu título actual se actualizará con el resultado
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
