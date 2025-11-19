// Generador de ejercicios para cada tema del curriculum

interface Exercise {
  type: 'multiple-choice' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
}

export function generateExercises(topicNumber: number, count: number): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (let i = 0; i < count; i++) {
    switch (topicNumber) {
      case 1:
        exercises.push(generateTopic1Exercise());
        break;
      case 2:
        exercises.push(generateTopic2Exercise());
        break;
      case 3:
        exercises.push(generateTopic3Exercise());
        break;
      case 4:
        exercises.push(generateTopic4Exercise());
        break;
      case 5:
        exercises.push(generateTopic5Exercise());
        break;
      case 6:
        exercises.push(generateTopic6Exercise());
        break;
      case 7:
        exercises.push(generateTopic7Exercise());
        break;
      case 8:
        exercises.push(generateTopic8Exercise());
        break;
      case 9:
        exercises.push(generateTopic9Exercise());
        break;
      default:
        exercises.push(generateTopic1Exercise());
    }
  }
  
  return exercises;
}

// TEMA 1: Conjuntos numéricos (N, Z, Q, R)
function generateTopic1Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿A qué conjunto pertenece el número -5?',
      options: ['Naturales (N)', 'Enteros (Z)', 'Racionales (Q)', 'Todos los anteriores'],
      correctAnswer: 'Enteros (Z)',
      hint: 'Los números negativos no pueden ser naturales',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál de estos números es un número natural?',
      options: ['-3', '0', '7', '2.5'],
      correctAnswer: '7',
      hint: 'Los naturales son números positivos para contar (1, 2, 3...)',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿A qué conjunto pertenece π (pi)?',
      options: ['Naturales', 'Enteros', 'Racionales', 'Irracionales'],
      correctAnswer: 'Irracionales',
      hint: 'π no se puede expresar como fracción exacta',
    },
    {
      type: 'fill-blank' as const,
      question: 'El conjunto de los números enteros se representa con la letra ___',
      correctAnswer: 'Z',
      hint: 'Proviene de "Zahlen" (números en alemán)',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál de estos es un número racional?',
      options: ['√2', 'π', '3/4', 'e'],
      correctAnswer: '3/4',
      hint: 'Los racionales se pueden expresar como fracción',
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
      hint: '0.5 es lo mismo que 5/10, que se simplifica a...',
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
      question: '¿Qué tipo de decimal genera la fracción 1/3?',
      options: ['Decimal exacto', 'Decimal periódico', 'Decimal finito', 'No genera decimal'],
      correctAnswer: 'Decimal periódico',
      hint: '1/3 = 0.333333...',
    },
    {
      type: 'fill-blank' as const,
      question: 'El decimal 0.25 es equivalente a la fracción ___',
      correctAnswer: '1/4',
      hint: '0.25 = 25/100, simplifica dividiendo entre 25',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 3: Propiedades básicas
function generateTopic3Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Qué propiedad dice que a + b = b + a?',
      options: ['Asociativa', 'Conmutativa', 'Distributiva', 'Identidad'],
      correctAnswer: 'Conmutativa',
      hint: 'Es la que permite cambiar el orden',
    },
    {
      type: 'multiple-choice' as const,
      question: 'La propiedad distributiva es: a(b + c) = ?',
      options: ['ab + c', 'a + bc', 'ab + ac', '(a + b)(a + c)'],
      correctAnswer: 'ab + ac',
      hint: 'Distribuye la multiplicación sobre la suma',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál operación se hace primero: 2 + 3 × 4?',
      options: ['Suma', 'Multiplicación', 'Ambas al mismo tiempo', 'De izquierda a derecha'],
      correctAnswer: 'Multiplicación',
      hint: 'Jerarquía: multiplicación antes que suma',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Qué propiedad dice que (a + b) + c = a + (b + c)?',
      options: ['Conmutativa', 'Asociativa', 'Distributiva', 'Clausura'],
      correctAnswer: 'Asociativa',
      hint: 'Permite reagrupar sin cambiar el resultado',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 4: Comparación y orden
function generateTopic4Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: 'En la recta numérica, ¿qué número está entre -2 y 0?',
      options: ['-3', '-1', '1', '2'],
      correctAnswer: '-1',
      hint: 'Piensa en orden ascendente: -3, -2, -1, 0, 1...',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál es la distancia entre -3 y 4 en la recta numérica?',
      options: ['1', '7', '4', '3'],
      correctAnswer: '7',
      hint: 'Cuenta las unidades: |-3| + |4| = 3 + 4',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál número es mayor?',
      options: ['-5', '-2', '-10', '-8'],
      correctAnswer: '-2',
      hint: 'En números negativos, el más cercano a cero es mayor',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cómo se escribe el intervalo de -2 a 5 (incluyendo ambos)?',
      options: ['(-2, 5)', '[-2, 5]', '(-2, 5]', '[-2, 5)'],
      correctAnswer: '[-2, 5]',
      hint: 'Los corchetes [ ] incluyen los extremos',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 5: Operaciones básicas
function generateTopic5Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (-3) + (-5)?',
      options: ['-8', '-2', '2', '8'],
      correctAnswer: '-8',
      hint: 'Negativos + negativos = negativo, suma los valores',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (-4) × (-2)?',
      options: ['-8', '-6', '6', '8'],
      correctAnswer: '8',
      hint: 'Negativo × negativo = positivo',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (-12) ÷ 3?',
      options: ['-9', '-4', '4', '9'],
      correctAnswer: '-4',
      hint: 'Negativo ÷ positivo = negativo',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 5 - (-3)?',
      options: ['2', '8', '-2', '-8'],
      correctAnswer: '8',
      hint: 'Restar un negativo es como sumar: 5 + 3',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 6: Introducción a signos de agrupación
function generateTopic6Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 2(3 + 4)?',
      options: ['9', '10', '14', '24'],
      correctAnswer: '14',
      hint: 'Primero resuelve el paréntesis: 3 + 4 = 7, luego 2 × 7',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 10 - (2 + 3)?',
      options: ['5', '11', '15', '1'],
      correctAnswer: '5',
      hint: 'Primero el paréntesis: 2 + 3 = 5, luego 10 - 5',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál es el resultado de 3 + 2 × 4?',
      options: ['20', '11', '14', '9'],
      correctAnswer: '11',
      hint: 'Multiplicación primero: 2 × 4 = 8, luego 3 + 8',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (8 - 3) × 2?',
      options: ['2', '3', '10', '13'],
      correctAnswer: '10',
      hint: 'Paréntesis primero: 8 - 3 = 5, luego 5 × 2',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 7: Operaciones con fracciones
function generateTopic7Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 1/2 + 1/3?',
      options: ['2/5', '2/6', '5/6', '1/6'],
      correctAnswer: '5/6',
      hint: 'Encuentra el MCM de 2 y 3, que es 6. Convierte: 3/6 + 2/6',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 2/3 × 3/4?',
      options: ['5/7', '6/12', '1/2', '2/4'],
      correctAnswer: '1/2',
      hint: 'Multiplica numeradores y denominadores: (2×3)/(3×4) = 6/12 = 1/2',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 1/2 ÷ 1/4?',
      options: ['1/8', '1/6', '2', '4'],
      correctAnswer: '2',
      hint: 'Dividir es multiplicar por el inverso: 1/2 × 4/1 = 4/2 = 2',
    },
    {
      type: 'multiple-choice' as const,
      question: 'Simplifica la fracción 8/12',
      options: ['4/6', '2/3', '1/2', '8/12'],
      correctAnswer: '2/3',
      hint: 'Divide numerador y denominador entre 4',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 8: Signos de agrupación + fracciones
function generateTopic8Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (1/2 + 1/4) × 2?',
      options: ['3/4', '1/2', '3/2', '2'],
      correctAnswer: '3/2',
      hint: 'Primero suma: 2/4 + 1/4 = 3/4, luego multiplica por 2',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 2 - (1/2 + 1/4)?',
      options: ['5/4', '3/4', '1/4', '7/4'],
      correctAnswer: '5/4',
      hint: 'Primero el paréntesis: 2/4 + 1/4 = 3/4. Luego: 8/4 - 3/4',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es [2 + (1/2)] × 3?',
      options: ['15/2', '7', '9/2', '6'],
      correctAnswer: '15/2',
      hint: 'Primero paréntesis: 4/2 + 1/2 = 5/2. Luego: 5/2 × 3 = 15/2',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (3/4) × (2/3)?',
      options: ['5/7', '6/12', '1/2', '2/4'],
      correctAnswer: '1/2',
      hint: '(3×2)/(4×3) = 6/12 = 1/2',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// TEMA 9: Operaciones combinadas avanzadas
function generateTopic9Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 2 + 3 × (1/2)?',
      options: ['5/2', '7/2', '3', '4'],
      correctAnswer: '7/2',
      hint: 'Multiplicación primero: 3 × 1/2 = 3/2. Luego: 4/2 + 3/2 = 7/2',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es (2 + 1/2) - (1 + 1/4)?',
      options: ['5/4', '3/4', '1', '1/2'],
      correctAnswer: '5/4',
      hint: 'Primero cada paréntesis: 5/2 - 5/4 = 10/4 - 5/4 = 5/4',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es {[4 - (1/2)] × 2} + 1?',
      options: ['7', '8', '9', '6'],
      correctAnswer: '8',
      hint: 'De adentro hacia afuera: 7/2 × 2 = 7, luego 7 + 1 = 8',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuánto es 1/2 + 1/3 + 1/6?',
      options: ['1', '3/11', '2/3', '1/2'],
      correctAnswer: '1',
      hint: 'MCM(2,3,6) = 6. Convierte: 3/6 + 2/6 + 1/6 = 6/6 = 1',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}
  const exercises = [
    {
      type: 'fill-blank' as const,
      question: 'Convierte 50% a fracción simplificada: ___',
      correctAnswer: '1/2',
      hint: '50% = 50/100, simplifica',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Qué porcentaje representa 0.75?',
      options: ['7.5%', '75%', '0.75%', '750%'],
      correctAnswer: '75%',
      hint: 'Multiplica por 100',
    },
    {
      type: 'fill-blank' as const,
      question: 'Convierte 3/4 a decimal: ___',
      correctAnswer: '0.75',
      hint: 'Divide 3 entre 4',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}
