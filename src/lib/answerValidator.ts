// Validador de respuestas con tolerancia a variaciones

/**
 * Normaliza una cadena de texto para comparación:
 * - Convierte a minúsculas
 * - Elimina espacios extras
 * - Elimina tildes
 * - Elimina signos de puntuación
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // Eliminar puntuación
}

/**
 * Valida si dos textos son equivalentes
 */
export function validateTextAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalizedUser = normalizeText(userAnswer);
  const normalizedCorrect = normalizeText(correctAnswer);
  
  // Comparación exacta después de normalizar
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Verificar si la respuesta del usuario está contenida en la correcta
  // (útil para respuestas como "Z" vs "letra Z")
  if (normalizedCorrect.includes(normalizedUser) || normalizedUser.includes(normalizedCorrect)) {
    return true;
  }
  
  return false;
}

/**
 * Valida respuestas numéricas con tolerancia a decimales
 */
export function validateNumericAnswer(
  userAnswer: string,
  correctAnswer: string,
  tolerance: number = 0.01
): boolean {
  const userNum = parseFloat(userAnswer.replace(',', '.'));
  const correctNum = parseFloat(correctAnswer.replace(',', '.'));
  
  if (isNaN(userNum) || isNaN(correctNum)) {
    return validateTextAnswer(userAnswer, correctAnswer);
  }
  
  return Math.abs(userNum - correctNum) <= tolerance;
}

/**
 * Valida respuestas de opción múltiple
 */
export function validateMultipleChoice(
  selectedOption: string,
  correctAnswer: string
): boolean {
  return normalizeText(selectedOption) === normalizeText(correctAnswer);
}
