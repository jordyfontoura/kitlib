export type UniquifyMethodType = 'first' | 'last' | 'merge' | 'intercept';
export type UniquifyKeyType = string | number;
export function uniquify<T extends Record<string, any>>(
  array: T[],
  keys: UniquifyKeyType[],
  method?: UniquifyMethodType
): T[];
export function uniquify<T extends Record<string, any>>(
  array: T[],
  keys: UniquifyKeyType,
  method?: UniquifyMethodType
): T[];
export function uniquify<T extends Record<string, any>>(
  array: T[],
  ...keys: UniquifyKeyType[]
): T[];
export function uniquify<T extends Record<string, any>>(
  array: T[],
  keysInput?: UniquifyKeyType | UniquifyKeyType[],
  methodInput?: UniquifyKeyType | UniquifyMethodType,
  ...others: UniquifyKeyType[]
): T[];
export function uniquify<T extends Record<string, any>>(
  array: T[],
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
      const jsons = array.map((o) => JSON.stringify(o));
      for (let i = 0; i < array.length; i += 1) {
        const object = array[i];
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
    for (let i = 0; i < array.length; i += 1) {
      const object = array[i];
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
    for (let i = 0; i < array.length; i += 1) {
      const object = array[i];
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
    for (let i = 0; i < array.length; i += 1) {
      const object = array[i];
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
    for (let i = 0; i < array.length; i += 1) {
      const object = array[i];
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
    for (let i = 0; i < array.length; i += 1) {
      const object = array[i];
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
