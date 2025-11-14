import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Brain, Trophy, Zap, Star, Target } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl font-black text-primary tracking-tight">
                KEKU
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Aprende Matemáticas de 5° de Secundaria con gamificación y personalización según tu estilo de aprendizaje
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 shadow-lg"
                onClick={() => navigate('/auth')}
              >
                Comenzar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => navigate('/auth')}
              >
                Ya tengo cuenta
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
              {[
                { icon: BookOpen, label: '7 Niveles', color: 'text-primary' },
                { icon: Trophy, label: 'Insignias', color: 'text-accent' },
                { icon: Zap, label: 'Gamificado', color: 'text-secondary' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegir KEKU?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Personalización VARK',
                description: 'Adaptamos los ejercicios a tu estilo de aprendizaje: visual, auditivo, lector o kinestésico',
                color: 'bg-primary/10 text-primary',
              },
              {
                icon: Target,
                title: 'Currículo Oficial',
                description: 'Basado en las Fichas 1-7 del Texto Escolar Matemática 5°, Minedu 2023',
                color: 'bg-secondary/10 text-secondary',
              },
              {
                icon: Trophy,
                title: 'Sistema de Recompensas',
                description: 'Gana XP, mantén rachas diarias y desbloquea insignias al completar niveles',
                color: 'bg-accent/10 text-accent',
              },
              {
                icon: Zap,
                title: 'Feedback Inmediato',
                description: 'Recibe retroalimentación instantánea en cada ejercicio para aprender de tus errores',
                color: 'bg-success/10 text-success',
              },
              {
                icon: Star,
                title: 'Progreso Visual',
                description: 'Mapa de niveles interactivo que muestra tu avance en tiempo real',
                color: 'bg-warning/10 text-warning',
              },
              {
                icon: BookOpen,
                title: 'Variedad de Ejercicios',
                description: 'Múltiple opción, completar espacios, arrastrar y soltar, y más formatos',
                color: 'bg-primary-light/10 text-primary',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Módulo A: Conjuntos Numéricos
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            7 niveles diseñados para dominar los números reales
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: 1, title: 'Conjuntos Numéricos', color: 'from-blue-400 to-blue-600' },
              { number: 2, title: 'Clasificación', color: 'from-green-400 to-green-600' },
              { number: 3, title: 'Recta Numérica', color: 'from-purple-400 to-purple-600' },
              { number: 4, title: 'Comparación', color: 'from-orange-400 to-orange-600' },
              { number: 5, title: 'Decimales', color: 'from-pink-400 to-pink-600' },
              { number: 6, title: 'Raíces', color: 'from-indigo-400 to-indigo-600' },
              { number: 7, title: 'Conversiones', color: 'from-teal-400 to-teal-600' },
            ].map((level) => (
              <div
                key={level.number}
                className="relative p-6 rounded-xl border border-border bg-card overflow-hidden hover:scale-105 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-10`} />
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold mb-3`}>
                    {level.number}
                  </div>
                  <h3 className="font-bold">{level.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para dominar las matemáticas?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Únete a KEKU y aprende de forma divertida y personalizada
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={() => navigate('/auth')}
          >
            Crear Cuenta Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>KEKU - Matemática 5° Secundaria</p>
          <p className="mt-2">Currículo Nacional del Perú • Módulo A: Fichas 1-7</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
