import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import kekuHola from '@/assets/keku-hola.png';
import kekuFelicidades from '@/assets/keku-felicidades.png';

interface WelcomeDialogProps {
  isFirstVisit: boolean;
}

export default function WelcomeDialog({ isFirstVisit }: WelcomeDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isFirstVisit) {
      setOpen(true);
    }
  }, [isFirstVisit]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setOpen(false);
      localStorage.setItem('keku_welcomed', 'true');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <img 
                src={kekuHola}
                alt="Keku saludando"
                className="w-40 h-40 object-contain"
              />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                ¡Bienvenido a Keku!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La app de reforzamiento matemático para que puedas aprender de manera 
                divertida e interactiva. Practica, acumula XP, desbloquea títulos 
                y conviértete en un maestro de las matemáticas.
              </p>
            </div>
            
            <Button 
              onClick={handleNext}
              className="w-full bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              Siguiente
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <img 
                src={kekuFelicidades}
                alt="Keku emocionado"
                className="w-40 h-40 object-contain"
              />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                ¡Diviértete Estudiando!
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Practica todos los días para mantener tu racha, gana estrellas 
                completando temas y canjea tus XP por recompensas especiales. 
                ¡Empieza tu aventura matemática ahora!
              </p>
            </div>
            
            <Button 
              onClick={handleNext}
              className="w-full bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              ¡Comenzar!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
