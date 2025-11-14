export interface Level {
  number: number;
  title: string;
  description: string;
  topics: string[];
  color: string;
}

export const levels: Level[] = [
  {
    number: 1,
    title: 'Conjuntos Numéricos',
    description: 'Aprende sobre N, Z, Q y R',
    topics: ['Números naturales', 'Números enteros', 'Números racionales', 'Números reales'],
    color: 'from-blue-400 to-blue-600',
  },
  {
    number: 2,
    title: 'Clasificación de Números',
    description: 'Identifica y clasifica diferentes tipos de números',
    topics: ['Números primos', 'Números compuestos', 'Pares e impares', 'Múltiplos y divisores'],
    color: 'from-green-400 to-green-600',
  },
  {
    number: 3,
    title: 'La Recta Numérica',
    description: 'Representa números en la recta',
    topics: ['Ubicación de números', 'Distancia entre puntos', 'Orden en la recta', 'Intervalos'],
    color: 'from-purple-400 to-purple-600',
  },
  {
    number: 4,
    title: 'Comparación de Números',
    description: 'Compara y ordena números reales',
    topics: ['Mayor que, menor que', 'Ordenamiento', 'Valor absoluto', 'Desigualdades'],
    color: 'from-orange-400 to-orange-600',
  },
  {
    number: 5,
    title: 'Decimales',
    description: 'Domina los números decimales',
    topics: ['Decimales finitos', 'Decimales periódicos', 'Conversiones', 'Operaciones'],
    color: 'from-pink-400 to-pink-600',
  },
  {
    number: 6,
    title: 'Raíces',
    description: 'Explora raíces exactas e inexactas',
    topics: ['Raíces cuadradas', 'Raíces cúbicas', 'Raíces exactas', 'Aproximaciones'],
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    number: 7,
    title: 'Conversiones',
    description: 'Convierte entre fracciones, decimales y porcentajes',
    topics: ['Fracción a decimal', 'Decimal a porcentaje', 'Porcentaje a fracción', 'Equivalencias'],
    color: 'from-teal-400 to-teal-600',
  },
];
