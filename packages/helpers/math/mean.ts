export function mean(valores: number[]): number;
export function mean(...valores: number[]): number;
export function mean(first: number | number[], ...valores: number[]) {
  if (typeof first === 'number') {
    return valores.reduce((a, b) => a + b, first) / (valores.length + 1);
  } else {
    return first.reduce((a, b) => a + b, 0) / first.length;
  }
}
