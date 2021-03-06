/**
 * Limita o valor de entrada no intervalo especificado
 * @param valor valor a ser limitado
 * @param min valor mínimo
 * @param max valor máximo
 * @returns retorna um valor entre min e max se o valor estiver entre min e max, caso contrario retorna min ou max
 */

export function clamp(valor: number, min: number, max: number) {
  return Math.min(Math.max(valor, min), max);
}
