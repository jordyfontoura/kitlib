type MayAsync<T> = T | Promise<T>;

export function MakePipe<T, K, J>(
  pipe: (data: J) => K,
  fn: (data: K) => T
): (data: J) => T;
export function MakePipe<T, K, J>(
  pipe: (data: J) => Promise<K>,
  fn: (data: K) => Promise<T>
): (data: J) => Promise<T>;
export function MakePipe<T, K, J>(
  pipe: (data: J) => MayAsync<K>,
  fn: (data: K) => MayAsync<T>
): (data: J) => MayAsync<T> {
  return async (data: J): Promise<T> => {
    const result = await pipe(data);
    return fn(result);
  };
}
