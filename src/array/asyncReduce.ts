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
  }
}
export async function asyncReduce<TArray, TAccumulator = any>(
  array: TArray[],
  fn: (
    accumulator: TAccumulator,
    current: TArray,
    index: number,
    array: TArray[]
  ) => TAccumulator,
  initialValue: TAccumulator
): Promise<TAccumulator> {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = await fn(accumulator, array[i], i, array);
  }
  return accumulator;
}
export function overload() {
  Array.prototype.asyncReduce = autoThis(asyncReduce);
}
