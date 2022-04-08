export async function asyncReduce<T, K = any>(
  array: T[],
  fn: (
    previousValue: Partial<K>,
    currentValue: T,
    currentIndex: number,
    array: any[],
    stop: () => void
  ) => Promise<Partial<K>>,
  initialValue: Partial<K>
): Promise<K> {
  let previousValue = initialValue;
  let stop = false;
  for (let i = 0; i < array.length; i++) {
    previousValue = await fn(previousValue, array[i], i, array, () => {
      stop = true;
    });
    if (stop) {
      break;
    }
  }
  return previousValue as K;
}
