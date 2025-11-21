// Generador de ejercicios para cada tema del curriculum

export interface Exercise {
  type: 'multiple-choice' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
  imageQuestion?: string;
  imageAnswer?: string;
}

export function generateExercises(topicNumber: number, count: number): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (let i = 0; i < count; i++) {
    switch (topicNumber) {
      case 1: exercises.push(generateTopic1Exercise()); break;
      case 2: exercises.push(generateTopic2Exercise()); break;
      case 3: exercises.push(generateTopic3Exercise()); break;
      case 4: exercises.push(generateTopic4Exercise()); break;
      case 5: exercises.push(generateTopic5Exercise()); break;
      case 6: exercises.push(generateTopic6Exercise()); break;
      case 7: exercises.push(generateTopic7Exercise()); break;
      case 8: exercises.push(generateTopic8Exercise()); break;
      case 9: exercises.push(generateTopic9Exercise()); break;
      default: exercises.push(generateTopic1Exercise());
    }
  }
  
  return exercises;
}

// TEMA 1: Conjuntos numéricos
function generateTopic1Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿A qué conjunto pertenece el número -5?',
      options: ['Naturales (N)', 'Enteros (Z)', 'Racionales (Q)', 'Todos'],
      correctAnswer: 'Enteros (Z)',
      hint: 'Los negativos no son naturales',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál es un número natural?',
      options: ['-3', '0', '7', '2.5'],
      correctAnswer: '7',
      hint: 'Para contar: 1, 2, 3...',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿A qué conjunto pertenece π (pi)?',
      options: ['Naturales', 'Enteros', 'Racionales', 'Irracionales'],
      correctAnswer: 'Irracionales',
      hint: 'π no se puede expresar como fracción',
    },
    {
      type: 'fill-blank' as const,
      question: 'Los enteros se representan con la letra ___',
      correctAnswer: 'Z',
      hint: 'Zahlen en alemán',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 2: Clasificación y conversión
function generateTopic2Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Cómo se escribe 0.5 como fracción?',
      options: ['1/5', '1/2', '5/10', '2/5'],
      correctAnswer: '1/2',
      hint: '5/10 simplificado',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 3/4 como decimal?',
      options: ['0.25', '0.5', '0.75', '1.5'],
      correctAnswer: '0.75',
      hint: 'Divide 3 entre 4',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Qué decimal genera 1/3?',
      options: ['Exacto', 'Periódico', 'Finito', 'No genera'],
      correctAnswer: 'Periódico',
      hint: '0.333333...',
    },
    {
      type: 'fill-blank' as const,
      question: '0.25 es equivalente a ___',
      correctAnswer: '1/4',
      hint: '25/100 simplificado',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 3: Propiedades básicas
function generateTopic3Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Qué propiedad dice a + b = b + a?',
      options: ['Asociativa', 'Conmutativa', 'Distributiva', 'Identidad'],
      correctAnswer: 'Conmutativa',
      hint: 'Permite cambiar el orden',
    },
    {
      type: 'multiple-choice' as const,
      question: 'a(b + c) = ?',
      options: ['ab + c', 'a + bc', 'ab + ac', '(a+b)(a+c)'],
      correctAnswer: 'ab + ac',
      hint: 'Distributiva',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Qué se hace primero: 2 + 3 × 4?',
      options: ['Suma', 'Multiplicación', 'Ambas', 'Izq. a der.'],
      correctAnswer: 'Multiplicación',
      hint: 'Jerarquía de operaciones',
    },
    {
      type: 'multiple-choice' as const,
      question: '(a + b) + c = a + (b + c) es:',
      options: ['Conmutativa', 'Asociativa', 'Distributiva', 'Identidad'],
      correctAnswer: 'Asociativa',
      hint: 'Permite reagrupar',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 4: Comparación y orden
function generateTopic4Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Qué está entre -2 y 0?',
      options: ['-3', '-1', '1', '2'],
      correctAnswer: '-1',
      hint: 'Orden ascendente',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Distancia de -3 a 4:',
      options: ['1', '7', '4', '3'],
      correctAnswer: '7',
      hint: '|-3| + |4|',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál es mayor?',
      options: ['-5', '-2', '-10', '-8'],
      correctAnswer: '-2',
      hint: 'Más cerca de cero',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Intervalo [-2, 5]:',
      options: ['Sin -2 ni 5', 'Con -2 y 5', 'Solo con -2', 'Solo con 5'],
      correctAnswer: 'Con -2 y 5',
      hint: '[ ] incluye extremos',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 5: Operaciones básicas
function generateTopic5Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '(-3) + (-5) = ?',
      options: ['-8', '-2', '2', '8'],
      correctAnswer: '-8',
      hint: 'Neg + neg = neg',
    },
    {
      type: 'multiple-choice' as const,
      question: '(-4) × (-2) = ?',
      options: ['-8', '-6', '6', '8'],
      correctAnswer: '8',
      hint: 'Neg × neg = pos',
    },
    {
      type: 'multiple-choice' as const,
      question: '(-12) ÷ 3 = ?',
      options: ['-9', '-4', '4', '9'],
      correctAnswer: '-4',
      hint: 'Neg ÷ pos = neg',
    },
    {
      type: 'multiple-choice' as const,
      question: '5 - (-3) = ?',
      options: ['2', '8', '-2', '-8'],
      correctAnswer: '8',
      hint: 'Menos un negativo = sumar',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 6: Introducción a signos de agrupación
function generateTopic6Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '2(3 + 4) = ?',
      options: ['9', '10', '14', '24'],
      correctAnswer: '14',
      hint: 'Paréntesis primero',
    },
    {
      type: 'multiple-choice' as const,
      question: '10 - (2 + 3) = ?',
      options: ['5', '11', '15', '1'],
      correctAnswer: '5',
      hint: 'Resuelve paréntesis',
    },
    {
      type: 'multiple-choice' as const,
      question: '3 + 2 × 4 = ?',
      options: ['20', '11', '14', '9'],
      correctAnswer: '11',
      hint: '× primero',
    },
    {
      type: 'multiple-choice' as const,
      question: '(8 - 3) × 2 = ?',
      options: ['2', '3', '10', '13'],
      correctAnswer: '10',
      hint: '( ) primero',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 7: Operaciones con fracciones
function generateTopic7Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: 'Resuelve la suma de fracciones mostrada',
      imageQuestion: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop',
      options: ['2/5', '2/6', '5/6', '1/6'],
      correctAnswer: '5/6',
      explanation: 'Se calcula el MCM(2,3) = 6, luego se suman los numeradores',
      imageAnswer: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop',
    },
    {
      type: 'multiple-choice' as const,
      question: '2/3 × 3/4 = ?',
      options: ['5/7', '6/12', '1/2', '2/4'],
      correctAnswer: '1/2',
      hint: 'Multiplica y simplifica',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Resuelve la división de fracciones',
      imageQuestion: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=200&fit=crop',
      options: ['1/8', '1/6', '2', '4'],
      correctAnswer: '2',
      explanation: 'Para dividir fracciones, multiplica por el inverso de la segunda',
      imageAnswer: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=400&h=200&fit=crop',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Simplifica 8/12:',
      options: ['4/6', '2/3', '1/2', '8/12'],
      correctAnswer: '2/3',
      hint: 'Divide entre 4',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 8: Signos de agrupación + fracciones
function generateTopic8Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: 'Resuelve la expresión con paréntesis y fracciones',
      imageQuestion: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=200&fit=crop',
      options: ['3/4', '1/2', '3/2', '2'],
      correctAnswer: '3/2',
      explanation: 'Primero resuelve el paréntesis, luego multiplica',
      imageAnswer: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=200&fit=crop',
    },
    {
      type: 'multiple-choice' as const,
      question: '2 - (1/2 + 1/4) = ?',
      options: ['5/4', '3/4', '1/4', '7/4'],
      correctAnswer: '5/4',
      hint: '( ) primero',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Resuelve los corchetes anidados',
      imageQuestion: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=200&fit=crop',
      options: ['15/2', '7', '9/2', '6'],
      correctAnswer: '15/2',
      explanation: 'Resuelve de adentro hacia afuera: paréntesis primero, luego corchetes',
      imageAnswer: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=200&fit=crop',
    },
    {
      type: 'multiple-choice' as const,
      question: '(3/4) × (2/3) = ?',
      options: ['5/7', '6/12', '1/2', '2/4'],
      correctAnswer: '1/2',
      hint: 'Simplifica 6/12',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 9: Operaciones combinadas avanzadas
function generateTopic9Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: 'Resuelve aplicando jerarquía de operaciones',
      imageQuestion: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&h=200&fit=crop',
      options: ['5/2', '7/2', '3', '4'],
      correctAnswer: '7/2',
      explanation: 'Primero la multiplicación, luego la suma',
      imageAnswer: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=200&fit=crop',
    },
    {
      type: 'multiple-choice' as const,
      question: '(2 + 1/2) - (1 + 1/4) = ?',
      options: ['5/4', '3/4', '1', '1/2'],
      correctAnswer: '5/4',
      hint: 'Cada ( ) primero',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Resuelve los símbolos de agrupación anidados',
      imageQuestion: 'https://images.unsplash.com/photo-1635070041409-e63e783d1b92?w=400&h=200&fit=crop',
      options: ['7', '8', '9', '6'],
      correctAnswer: '8',
      explanation: 'Resuelve desde el símbolo más interno hacia afuera: ( ) → [ ] → { }',
      imageAnswer: 'https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=400&h=200&fit=crop',
    },
    {
      type: 'multiple-choice' as const,
      question: '1/2 + 1/3 + 1/6 = ?',
      options: ['1', '3/11', '2/3', '1/2'],
      correctAnswer: '1',
      hint: 'MCM(2,3,6) = 6',
    },
  ];
  return exercises[Math.floor(Math.random() * exercises.length)];
}
