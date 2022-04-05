import { mean } from './mean';
export function standardDeviation(valores: number[]): number;
export function standardDeviation(...valores: number[]): number;
export function standardDeviation(
  first: number | number[],
  ...valores: number[]
): number {
  if (typeof first === 'number') {
    const med = mean(first, ...valores);
    return Math.sqrt(
      valores.reduce((a, b) => a + (b - med) * (b - med), first) /
        (valores.length + 1)
    );
  } else {
    const med = mean(first);
    return Math.sqrt(
      first.reduce((a, b) => a + (b - med) * (b - med), 0) / first.length
    );
  }
}
