import { DeepRecord } from '../types';

function fromEntries(list: [string, any][]) {
  const result = {} as DeepRecord<any>;
  list.forEach((keyValue) => {
    const [key, value] = keyValue;
    result[key] = value;
  });
  return result;
}

export default function decycle<K = any>(obj: DeepRecord<K>, stack = []): any {
  if (!obj || typeof obj !== 'object') return obj;

  if ((stack as any).includes(obj)) return '<cycle>';

  const s = (stack as any).concat([obj]);

  return Array.isArray(obj)
    ? obj.map((x) => decycle(x, s))
    : fromEntries(
        Object.entries(obj).map(([k, v]) => [k, decycle(v as any, s)])
      );
}
