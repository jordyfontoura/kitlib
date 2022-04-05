export function sum(valores: number[]): number;
export function sum(...valores: number[]): number;
/**
 * Soma valores de uma lista
 */
export function sum(first: number | number[], ...valores: number[]) {
  if (typeof first === 'number') {
    return first + valores.reduce((a, b) => a + b, 0);
  } else {
    return first.reduce((a, b) => a + b, 0);
  }
}
