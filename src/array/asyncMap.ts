import { autoThis } from '../overload';

declare global {
  interface Array<T> {
    asyncReduce<TAccumulator = any>(
      fn: (
        accumulator: TAccumulator,
        current: T,
        index: number,
        array: T[]
      ) => TAccumulator,
      initialValue: TAccumulator
    ): Promise<TAccumulator>;
    asyncMap<U>(
      this: T[],
      fn: (current: T, index: number, array: T[]) => Promise<U>
    ): Promise<U[]>;
  }
}

export async function asyncMap(
  array: any[],
  fn: (current: any, index: number, array: any[]) => any
): Promise<any[]> {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(await fn(array[i], i, array));
  }
  return result;
}

export function overload() {
  Array.prototype.asyncMap = autoThis(asyncMap);
}
