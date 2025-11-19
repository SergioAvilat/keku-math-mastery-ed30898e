export interface Topic {
  number: number;
  title: string;
  description: string;
  details: string[];
  levelNumber: number;
}

export interface Level {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  topics: Topic[];
}

export const curriculum: Level[] = [
  {
    number: 1,
    title: 'NIVEL 1',
    subtitle: 'Fundamentos esenciales',
    description: 'Preparación rápida para no bloquearse en fracciones',
    color: 'from-purple-500 to-purple-700',
    topics: [
      {
        number: 1,
        levelNumber: 1,
        title: 'Conjuntos numéricos',
        description: 'N, Z, Q y R',
        details: [
          'Números naturales (N)',
          'Números enteros (Z)',
          'Números racionales (Q)',
          'Números reales (R)',
          'Identificar si un número es racional, irracional, entero, etc.',
        ],
      },
      {
        number: 2,
        levelNumber: 1,
        title: 'Clasificación y conversión',
        description: 'Conversiones entre decimales y fracciones',
        details: [
          'Decimales → fracciones',
          'Fracciones → decimales',
          'Diferencia entre enteros y racionales',
          'Identificación de tipos de números',
        ],
      },
      {
        number: 3,
        levelNumber: 1,
        title: 'Propiedades básicas',
        description: 'Propiedades fundamentales de operaciones',
        details: [
          'Propiedad conmutativa',
          'Propiedad asociativa',
          'Propiedad distributiva',
          'Jerarquía simple de operaciones',
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'NIVEL 2',
    subtitle: 'Operaciones con números reales',
    description: 'Preparación para el manejo de fracciones',
    color: 'from-blue-500 to-blue-700',
    topics: [
      {
        number: 4,
        levelNumber: 2,
        title: 'Comparación y orden',
        description: 'Ordenar y comparar números',
        details: [
          'Mayor que / menor que',
          'Recta numérica',
          'Intervalos básicos',
          'Orden en los números reales',
        ],
      },
      {
        number: 5,
        levelNumber: 2,
        title: 'Operaciones básicas',
        description: 'Suma, resta, multiplicación y división',
        details: [
          'Suma y resta de enteros',
          'Multiplicación y división',
          'Cambio de signos',
          'Reglas de signos',
        ],
      },
      {
        number: 6,
        levelNumber: 2,
        title: 'Introducción a signos de agrupación',
        description: 'Uso de paréntesis y jerarquía',
        details: [
          'Uso de paréntesis ( )',
          'Jerarquía de operaciones',
          'Ejercicios combinados simples',
          'Sin fracciones complejas aún',
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'NIVEL 3',
    subtitle: 'Operaciones combinadas y fracciones',
    description: 'El verdadero desafío: fracciones y operaciones combinadas',
    color: 'from-red-500 to-red-700',
    topics: [
      {
        number: 7,
        levelNumber: 3,
        title: 'Operaciones con fracciones',
        description: 'Domina las fracciones',
        details: [
          'Suma y resta con denominadores diferentes',
          'Multiplicación y división de fracciones',
          'Simplificación de fracciones',
          'Fracciones equivalentes',
        ],
      },
      {
        number: 8,
        levelNumber: 3,
        title: 'Signos de agrupación + fracciones',
        description: 'Combinación de paréntesis y fracciones',
        details: [
          'Paréntesis ( )',
          'Corchetes [ ]',
          'Llaves { }',
          'Fracciones dentro de signos de agrupación',
          'Jerarquía completa de operaciones',
        ],
      },
      {
        number: 9,
        levelNumber: 3,
        title: 'Operaciones combinadas avanzadas',
        description: 'El nivel más difícil: todo combinado',
        details: [
          'Mezcla de enteros + fracciones + signos',
          'Ejercicios tipo examen UL',
          'Problemas de aplicación',
          'Resolución de problemas complejos',
        ],
      },
    ],
  },
];

export const getAllTopics = (): Topic[] => {
  return curriculum.flatMap(level => level.topics);
};

export const getTopicByNumber = (topicNumber: number): Topic | undefined => {
  return getAllTopics().find(t => t.number === topicNumber);
};

export const getLevelByNumber = (levelNumber: number): Level | undefined => {
  return curriculum.find(l => l.number === levelNumber);
};
