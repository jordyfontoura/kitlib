import { autoThis } from '../overload';

declare global {
  interface Array<T> {
    asyncForEach(
      this: T[],
      fn: (current: T, index: number, array: T[]) => Promise<void>
    ): Promise<void>;
  }
}

export async function asyncForEach<T>(
  array: T[],
  fn: (current: T, index: number, array: T[]) => any
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    await fn(array[i], i, array);
  }
}

export function overload() {
  Array.prototype.asyncForEach = autoThis(asyncForEach);
}
