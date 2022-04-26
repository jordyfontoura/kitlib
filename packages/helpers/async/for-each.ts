/**
 * Function to asyncrhonously iterate over an array.
 * @param array List of items to iterate over
 * @param fn Function to call for each item
 */
export async function asyncForEach<T>(
  array: T[],
  fn: (current: T, index: number, array: T[]) => any
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    if (await fn(array[i], i, array)) {
      break;
    }
  }
}
