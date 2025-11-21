import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import kekuBien from '@/assets/keku-bien.png';
import kekuIntenta from '@/assets/keku-intenta.png';

interface FeedbackMascotProps {
  isCorrect: boolean | null;
  show: boolean;
}

export default function FeedbackMascot({ isCorrect, show }: FeedbackMascotProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (show) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || isCorrect === null) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Personaje Keku */}
        <img 
          src={isCorrect ? kekuBien : kekuIntenta}
          alt="Keku mascota"
          className="w-24 h-24 object-contain"
        />
        
        {/* Popup de feedback */}
        <div
          className={`relative flex flex-col items-center gap-4 p-8 rounded-3xl shadow-2xl backdrop-blur-md ${
            isCorrect
              ? 'bg-gradient-to-br from-success/20 to-success/5 border-2 border-success/30'
              : 'bg-gradient-to-br from-destructive/20 to-destructive/5 border-2 border-destructive/30'
          }`}
        >
        {/* Personaje animado */}
        <div className="relative">
          {isCorrect ? (
            <>
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-24 h-24 text-success/50" />
              </div>
              <CheckCircle2
                className={`w-24 h-24 text-success animate-bounce`}
                strokeWidth={2.5}
              />
            </>
          ) : (
            <XCircle
              className={`w-24 h-24 text-destructive animate-shake`}
              strokeWidth={2.5}
            />
          )}
        </div>

        {/* Mensaje del personaje */}
        <div className="text-center space-y-2">
          <div
            className={`text-3xl font-bold ${
              isCorrect ? 'text-success' : 'text-destructive'
            }`}
          >
            {isCorrect ? '¡Excelente!' : '¡Ups!'}
          </div>
          <div className="text-base text-muted-foreground max-w-xs">
            {isCorrect
              ? getMascotCorrectMessage()
              : getMascotIncorrectMessage()}
          </div>
        </div>

        {/* Emojis decorativos */}
        <div className="flex gap-2 text-2xl">
          {isCorrect ? (
            <>
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🎉</span>
              <span className="animate-bounce" style={{ animationDelay: '100ms' }}>⭐</span>
              <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🎊</span>
            </>
          ) : (
            <>
              <span className="animate-pulse" style={{ animationDelay: '0ms' }}>💪</span>
              <span className="animate-pulse" style={{ animationDelay: '150ms' }}>📚</span>
              <span className="animate-pulse" style={{ animationDelay: '300ms' }}>🎯</span>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

// Mensajes aleatorios para respuestas correctas
function getMascotCorrectMessage(): string {
  const messages = [
    '¡Vas por buen camino!',
    '¡Eres un genio matemático!',
    '¡Increíble razonamiento!',
    '¡Sigue así, campeón!',
    '¡Perfecto! Lo dominas',
    '¡Brillante respuesta!',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Mensajes aleatorios para respuestas incorrectas
function getMascotIncorrectMessage(): string {
  const messages = [
    '¡No te rindas! Inténtalo otra vez',
    'Aprende del error y sigue',
    '¡Casi! Revisa de nuevo',
    'Los errores nos hacen crecer',
    'Piénsalo un poco más',
    '¡Tú puedes! Analiza con calma',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
