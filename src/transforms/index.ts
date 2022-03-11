import { KeyIfExists } from '../types';

export type ITransformersValue<
  TObject extends Record<string, any>,
  TContext = any
> =
  | keyof TObject
  | (keyof TObject)[]
  | ((payload: {
      key: string;
      value: any;
      obj: TObject;
      ctx: Record<string, any> & TContext;
      final: Record<string, any>;
    }) => any);

export type ITransformers<
  TObject extends Record<string, any>,
  TContext = any
> = Record<string, ITransformersValue<TObject, TContext>>;

export async function convert<
  U extends ITransformers<TObject, TContext>,
  TObject extends Record<string, any>,
  TContext = any
>(
  obj: TObject,
  transform: U,
  opts: {
    defaultTransform?: (
      value: string,
      obj: Record<string, any>,
      final: Record<string, any>
    ) => any;
    keys?: true | string[];
    ctx?: KeyIfExists<TContext>;
  } | null = null
): Promise<
  {
    [K in keyof U]: K extends keyof U
      ? U[K] extends (...args: any[]) => infer IR
        ? IR
        : any
      : never;
  } & Record<string, any>
> {
  let options = opts as any;
  if (options === null) {
    options = {
      keys: true,
      defaultTransform: (value: any) => value,
      ctx: {} as any,
    };
  } else {
    options = Object.assign(
      { keys: true, defaultTransform: (value: any) => value, ctx: {} },
      options
    );
  }
  if (typeof options.keys === 'boolean') {
    if (options.keys) {
      options.keys = Object.keys(transform);
      Object.keys(obj).forEach((key) => {
        if (!Object.keys(transform).includes(key)) {
          options.keys.push(key);
        }
      });
    } else {
      options.keys = Object.keys(obj);
    }
  }
  const aux = options.ctx;
  return await options.keys.asyncReduce(async (acc: any, key: string) => {
    const target = transform[key];
    if (typeof target === 'function') {
      acc[key] = await target({
        key,
        value: (obj as any)[key],
        obj,
        ctx: aux,
        final: acc,
      });
    } else if (typeof target === 'string') {
      acc[key] = (obj as any)[target];
    } else if (typeof target === 'object') {
      if (Array.isArray(target) && target.length > 0) {
        const findIndex = target.findIndex((item: any) => {
          return (
            (obj as any)[item] !== undefined &&
            (obj as any)[item] !== null &&
            (obj as any)[item] !== ''
          );
        });
        if (findIndex !== -1) {
          acc[key] = obj[target[findIndex]] || '';
        }
      }
    }
    return acc;
  }, {} as any);
}
