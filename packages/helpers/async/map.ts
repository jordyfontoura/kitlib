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
