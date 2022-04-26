import { asyncMap } from '@kitlib/helpers';

export function multiply(arr: number[], by: number): Promise<number[]> {
  return asyncMap(arr, (x) => x * by);
}
