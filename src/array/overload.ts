type UniquifyMethodType = 'first' | 'last' | 'merge' | 'intercept';
type UniquifyKeyType = string | number;
export function uniquify<T extends Record<string, any>>(
  this: T[],
  keys: UniquifyKeyType[],
  method?: UniquifyMethodType
): T[];
export function uniquify<T extends Record<string, any>>(
  this: T[],
  ...keys: UniquifyKeyType[]
): T[];
export function uniquify<T extends Record<string, any>>(
  this: T[],
  keysInput?: UniquifyKeyType | UniquifyKeyType[],
  methodInput?: UniquifyKeyType | UniquifyMethodType,
  ...others: UniquifyKeyType[]
): T[] {
  if (typeof keysInput === 'string' || keysInput === undefined) {
    const keys = [keysInput, ...[methodInput, ...others]].filter(
      (v) => v !== undefined
    ) as UniquifyKeyType[];
    if (keys.length === 0) {
      const result: T[] = [];
      const set = new Set();
      const jsons = this.map((o) => JSON.stringify(o));
      for (let i = 0; i < this.length; i += 1) {
        const object = this[i];
        const json = jsons[i];
        const found = set.has(json);
        if (!found) {
          result.push(object);
          set.add(json);
        }
      }
      return result;
    }
    const result: T[] = [];
    for (let i = 0; i < this.length; i += 1) {
      const object = this[i];
      const found = result.find((target) => {
        return keys.every((key) => {
          return object[key] === target[key];
        });
      });
      if (!found) {
        result.push(object);
      }
    }
    return result;
  }
  const keys = keysInput as UniquifyKeyType[];
  const method = (methodInput || 'first') as UniquifyMethodType;

  if (method === 'first') {
    const result: T[] = [];
    for (let i = 0; i < this.length; i += 1) {
      const object = this[i];
      const found = result.find((target) => {
        return keys.every((key) => {
          return object[key] === target[key];
        });
      });
      if (!found) {
        result.push(object);
      }
    }
    return result;
  } else if (method === 'merge') {
    const result: T[] = [];
    for (let i = 0; i < this.length; i += 1) {
      const object = this[i];
      const found = result.find((target) => {
        return keys.every((key) => {
          return object[key] === target[key];
        });
      });
      if (!found) {
        result.push(object);
      } else {
        Object.keys(object).forEach((key) => {
          (found as any)[key] = object[key];
        });
      }
    }
    return result;
  } else if (method === 'intercept') {
    const result: T[] = [];
    for (let i = 0; i < this.length; i += 1) {
      const object = this[i];
      const foundIndex = result.findIndex((target) => {
        return keys.every((key) => {
          return object[key] === target[key];
        });
      });
      if (foundIndex === -1) {
        result.push(object);
      } else {
        const interception = {} as any;
        const found = result[foundIndex];
        Object.keys(found).forEach((key) => {
          if (found[key] === object[key]) {
            interception[key] = object[key];
          }
        });
        result[foundIndex] = interception;
      }
    }
    return result;
  } else {
    const result: T[] = [];
    for (let i = 0; i < this.length; i += 1) {
      const object = this[i];
      const foundIndex = result.findIndex((target) => {
        return keys.every((key) => {
          return object[key] === target[key];
        });
      });
      if (foundIndex === -1) {
        result.push(object);
      } else {
        result[foundIndex] = object;
      }
    }
    return result;
  }
}

async function asyncReduce<TArray, TAccumulator = any>(
  this: TArray[],
  fn: (
    accumulator: TAccumulator,
    current: TArray,
    index: number,
    array: TArray[]
  ) => TAccumulator,
  initialValue: TAccumulator
): Promise<TAccumulator> {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = await fn(accumulator, this[i], i, this);
  }
  return accumulator;
}

async function asyncMap(
  this: any[],
  fn: (current: any, index: number, array: any[]) => any
): Promise<any[]> {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(await fn(this[i], i, this));
  }
  return result;
}

async function asyncForEach<T>(
  this: T[],
  fn: (current: T, index: number, array: T[]) => any
): Promise<void> {
  for (let i = 0; i < this.length; i++) {
    await fn(this[i], i, this);
  }
}

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
    asyncForEach<U>(
      this: T[],
      fn: (current: T, index: number, array: T[]) => Promise<U>
    ): Promise<void>;

    /**
     * Singulariza objetos de um array de objetos.
     * @param this
     * @param keys Chaves ou índices que serão utilizados para comparação
     * @param method Método usado para unificar os objetos. Possíveis valores: first, last, merge, intercept
     */
    uniquify<T extends Record<string, any>>(
      this: T[],
      keys: UniquifyKeyType[],
      method?: UniquifyMethodType
    ): T[];

    /**
     * Singulariza objetos de um array de objetos.
     * @param this
     * @param keys Chaves ou índices que serão utilizados para comparação
     */
    uniquify<T extends Record<string, any>>(
      this: T[],
      ...keys: (string | number)[]
    ): T[];
  }
}

export default function () {
  Array.prototype.asyncReduce = asyncReduce;
  Array.prototype.asyncMap = asyncMap;
  Array.prototype.asyncForEach = asyncForEach;
  Array.prototype.uniquify = uniquify;
}
