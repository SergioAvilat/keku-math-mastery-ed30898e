export const userTitles = [
  "La Leyenda de los Números",
  "El Maestro de las Ecuaciones",
  "El Guardián de los Teoremas",
  "El Conquistador de Fracciones",
  "El Sabio de las Multiplicaciones",
  "El Héroe de la Geometría",
  "El Campeón de Álgebra",
  "El Explorador Matemático",
  "El Mago de los Números Primos",
  "El Domador de Polinomios",
  "El Arquitecto de las Fórmulas",
  "El Rey del Cálculo",
  "El Virtuoso de las Raíces",
  "El Caballero de las Potencias",
  "El Sabio de Pitágoras",
  "El Genio de las Derivadas",
  "El Estratega Numérico",
  "El Alquimista Matemático",
  "El Prodigio de las Sumas",
  "El Titán de los Ángulos"
];

export function getRandomTitle(): string {
  return userTitles[Math.floor(Math.random() * userTitles.length)];
}
