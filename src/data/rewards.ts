export interface Reward {
  type: 'quote' | 'tip';
  content: string;
  author?: string;
}

export const mathQuotes: Reward[] = [
  {
    type: 'quote',
    content: 'Las matemáticas son el alfabeto con el cual Dios ha escrito el universo.',
    author: 'Galileo Galilei'
  },
  {
    type: 'quote',
    content: 'En matemáticas, no se comprende, solo te acostumbras.',
    author: 'John von Neumann'
  },
  {
    type: 'quote',
    content: 'Las matemáticas puras son, a su manera, la poesía de las ideas lógicas.',
    author: 'Albert Einstein'
  },
  {
    type: 'quote',
    content: 'La matemática es la reina de las ciencias y la aritmética es la reina de las matemáticas.',
    author: 'Carl Friedrich Gauss'
  },
  {
    type: 'quote',
    content: 'Lo que sabemos es una gota de agua; lo que ignoramos es el océano.',
    author: 'Isaac Newton'
  },
  {
    type: 'quote',
    content: 'Las matemáticas no mienten, lo que hay son muchos matemáticos mentirosos.',
    author: 'Henry David Thoreau'
  },
  {
    type: 'quote',
    content: 'La música es el placer que experimenta la mente humana al contar sin darse cuenta de que está contando.',
    author: 'Gottfried Leibniz'
  },
  {
    type: 'quote',
    content: 'Un matemático que no es también algo de poeta, nunca será un matemático completo.',
    author: 'Karl Weierstrass'
  }
];

export const mathTips: Reward[] = [
  {
    type: 'tip',
    content: 'Para multiplicar por 11: Suma los dígitos y colócalos en el medio. Ej: 23 × 11 = 2(2+3)3 = 253'
  },
  {
    type: 'tip',
    content: 'Para sumar fracciones rápido: Si los denominadores son pequeños, busca el MCM mentalmente.'
  },
  {
    type: 'tip',
    content: 'Truco de divisibilidad por 3: Un número es divisible por 3 si la suma de sus dígitos es divisible por 3.'
  },
  {
    type: 'tip',
    content: 'Para calcular porcentajes fácilmente: 15% de 80 = 10% + 5% = 8 + 4 = 12'
  },
  {
    type: 'tip',
    content: 'Cuando multipliques fracciones, simplifica cruzado antes de multiplicar para números más pequeños.'
  },
  {
    type: 'tip',
    content: 'Para elevar al cuadrado números terminados en 5: Multiplica el primer dígito por el siguiente y agrega 25. Ej: 25² = 2×3=6 → 625'
  },
  {
    type: 'tip',
    content: 'La jerarquía de operaciones: Paréntesis, Exponentes, Multiplicación/División, Suma/Resta (PEMDAS)'
  },
  {
    type: 'tip',
    content: 'Para restar fracciones, recuerda: denominadores iguales → resta solo numeradores.'
  },
  {
    type: 'tip',
    content: 'Multiplica mentalmente por 9: Multiplica por 10 y resta el número. Ej: 9×7 = 70-7 = 63'
  },
  {
    type: 'tip',
    content: 'Convierte decimales periódicos a fracciones: 0.333... = 1/3, 0.666... = 2/3'
  }
];

export function getRandomReward(): Reward {
  const allRewards = [...mathQuotes, ...mathTips];
  return allRewards[Math.floor(Math.random() * allRewards.length)];
}
