// Generador de ejercicios para cada nivel del Módulo A

interface Exercise {
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop' | 'order';
  question: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
}

export function generateExercises(levelNumber: number, count: number): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (let i = 0; i < count; i++) {
    switch (levelNumber) {
      case 1:
        exercises.push(generateLevel1Exercise());
        break;
      case 2:
        exercises.push(generateLevel2Exercise());
        break;
      case 3:
        exercises.push(generateLevel3Exercise());
        break;
      case 4:
        exercises.push(generateLevel4Exercise());
        break;
      case 5:
        exercises.push(generateLevel5Exercise());
        break;
      case 6:
        exercises.push(generateLevel6Exercise());
        break;
      case 7:
        exercises.push(generateLevel7Exercise());
        break;
      default:
        exercises.push(generateLevel1Exercise());
    }
  }
  
  return exercises;
}

// Nivel 1: Conjuntos Numéricos (N, Z, Q, R)
function generateLevel1Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿A qué conjunto pertenece el número -5?',
      options: ['Naturales (N)', 'Enteros (Z)', 'Racionales (Q)', 'Todos los anteriores'],
      correctAnswer: 'Enteros (Z)',
      hint: 'Los números negativos no son naturales',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál de estos números es un número natural?',
      options: ['-3', '0', '7', '2.5'],
      correctAnswer: '7',
      hint: 'Los naturales son los números para contar',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿A qué conjunto pertenece π (pi)?',
      options: ['Naturales', 'Enteros', 'Racionales', 'Reales irracionales'],
      correctAnswer: 'Reales irracionales',
      hint: 'π no se puede expresar como fracción exacta',
    },
    {
      type: 'fill-blank' as const,
      question: 'El conjunto de los números enteros se representa con la letra ___',
      correctAnswer: 'Z',
      hint: 'Proviene de "Zahlen" (números en alemán)',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Nivel 2: Clasificación de Números
function generateLevel2Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Qué tipo de número es 17?',
      options: ['Primo', 'Compuesto', 'Par', 'Ninguno'],
      correctAnswer: 'Primo',
      hint: 'Un número primo solo es divisible por 1 y sí mismo',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál de estos es un número compuesto?',
      options: ['11', '13', '15', '19'],
      correctAnswer: '15',
      hint: '15 = 3 × 5',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuántos divisores tiene el número 12?',
      options: ['4', '6', '8', '12'],
      correctAnswer: '6',
      hint: 'Divisores: 1, 2, 3, 4, 6, 12',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Nivel 3: Recta Numérica
function generateLevel3Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: 'En la recta numérica, ¿qué número está entre -2 y 0?',
      options: ['-3', '-1', '1', '2'],
      correctAnswer: '-1',
      hint: 'Piensa en orden ascendente',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál es la distancia entre -3 y 4 en la recta numérica?',
      options: ['1', '7', '4', '3'],
      correctAnswer: '7',
      hint: 'Cuenta los espacios entre ambos números',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Nivel 4: Comparación de Números
function generateLevel4Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: 'Ordena de menor a mayor: -5, 2, -1, 0',
      options: ['-5, -1, 0, 2', '-1, -5, 0, 2', '0, -1, -5, 2', '2, 0, -1, -5'],
      correctAnswer: '-5, -1, 0, 2',
      hint: 'Los negativos van primero, del más negativo al menos negativo',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál es mayor: -10 o -3?',
      options: ['-10', '-3', 'Son iguales', 'No se puede determinar'],
      correctAnswer: '-3',
      hint: 'Entre dos negativos, el que está más cerca de cero es mayor',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Nivel 5: Decimales
function generateLevel5Exercise(): Exercise {
  const exercises = [
    {
      type: 'multiple-choice' as const,
      question: '¿Qué tipo de decimal es 0.333...?',
      options: ['Finito', 'Periódico puro', 'Periódico mixto', 'Irracional'],
      correctAnswer: 'Periódico puro',
      hint: 'El 3 se repite infinitamente',
    },
    {
      type: 'fill-blank' as const,
      question: 'Convierte 1/4 a decimal: ___',
      correctAnswer: '0.25',
      hint: 'Divide 1 entre 4',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Nivel 6: Raíces
function generateLevel6Exercise(): Exercise {
  const exercises = [
    {
      type: 'fill-blank' as const,
      question: '¿Cuánto es √16? ___',
      correctAnswer: '4',
      hint: '¿Qué número multiplicado por sí mismo da 16?',
    },
    {
      type: 'multiple-choice' as const,
      question: '¿Cuál de estas es una raíz exacta?',
      options: ['√2', '√9', '√5', '√7'],
      correctAnswer: '√9',
      hint: '√9 = 3',
    },
  ];
  
  return exercises[Math.floor(Math.random() * exercises.length)];
}

// Nivel 7: Conversiones (Fracción ↔ Decimal ↔ Porcentaje)
function generateLevel7Exercise(): Exercise {
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
