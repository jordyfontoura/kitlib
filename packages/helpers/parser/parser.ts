import { asyncReduce } from '../async/reduce';
import { decycle } from '../object/decycle';
export interface IPipeOptions {
  root?: any;
  type?: 'default' | 'async';
}
type IGenericPipe = {
  (value: any, options?: IPipeOptions): any;
  break?: boolean | ((value: any, options?: IPipeOptions) => any);
};
class PipedParser<TR, TA = any> {
  private pipes: IGenericPipe[] = [];

  //#region Core
  compile(value: TA): TR;
  compile(value: TA, options?: { type?: 'default' }): TR;
  compile(value: TA, options: { type: 'async' }): Promise<TR>;
  compile(
    value: TA,
    options: { type?: 'async' | 'default' } = { type: 'default' }
  ): TR | Promise<TR> {
    if (options.type === 'async') {
      return asyncReduce<IGenericPipe, any>(
        this.pipes,
        async (result, pipe, _index, _array, stop) => {
          result = pipe(result, options);
          if (pipe.break) {
            if (typeof pipe.break === 'function') {
              if (pipe.break(result, options)) {
                stop();
                return result;
              }
            } else {
              stop();
              return result;
            }
          }
          return result;
        },
        value
      ) as unknown as TR;
    }
    let result = value;
    for (const pipe of this.pipes) {
      result = pipe(result, options);
      if (pipe.break) {
        if (typeof pipe.break === 'function') {
          if (pipe.break(result, options)) break;
        } else {
          break;
        }
      }
    }
    return result as unknown as TR;
    // return this.pipes.reduce(
    //   (acc, pipe) => pipe(acc, options),
    //   value
    // ) as unknown as TR;
  }
  //#endregion

  //#region Primitives
  number(): PipedParser<number, TA> {
    function numberPipe(value: unknown) {
      if (typeof value === 'number') {
        return value;
      }
      if (typeof value === 'string') {
        if (value.includes('.') || value.includes(',')) {
          return parseFloat(value.replace(',', '.'));
        } else {
          return parseInt(value, 10);
        }
      }
      if (typeof value === 'boolean') {
        return +value;
      }
      return parseFloat(value as any);
    }
    this.pipes.push(numberPipe);
    return this as any;
  }
  string(): PipedParser<string, TA> {
    this.pipes.push((value: any) => {
      if (typeof value === 'string') {
        return value;
      }
      if (typeof value === 'object') {
        return JSON.stringify(decycle(value));
      }
      return value.toString();
    });
    return this as any;
  }
  boolean(
    options: { allowEmptyObject: boolean } = { allowEmptyObject: false }
  ): PipedParser<boolean, TA> {
    this.pipes.push((value: any) => {
      if (typeof value === 'string') {
        if (value === 'true') {
          return true;
        }
        if (value === 'false') {
          return false;
        }
      }
      if (Array.isArray(value)) {
        return !!value.length;
      }
      if (typeof value === 'object') {
        if (!options.allowEmptyObject) {
          return !!Object.keys(value).length;
        }
      }
      return !!value;
    });
    return this as any;
  }
  arrayOf<TI = any>(itemType: PipedParser<TI, TA>): PipedParser<TI[], TA> {
    this.pipes.push((value: any) => {
      if (Array.isArray(value)) {
        return value.map((item) => itemType.compile(item));
      }
      return [];
    });
    return this as any;
  }
  object() {
    this.pipes.push((value: any) => {
      if (typeof value !== 'object') {
        return {};
      }
      return value;
    });
    return this as any;
  }
  any(): PipedParser<any, TA> {
    return this as any;
  }
  function(): PipedParser<(value: TA) => any, TA> {
    this.pipes.push((value: any) => {
      if (typeof value === 'function') {
        return value;
      }
      return () => value;
    });
    return this as any;
  }
  ref<TFR = any>(fn: (value: TA) => TFR): PipedParser<TFR, TA> {
    this.pipes.push((value: any, options) => {
      return fn(options.root as any);
    });
    return this as any;
  }
  //#endregion

  //#region Statements
  pipe<U = unknown>(
    fn: (value: TR, options: IPipeOptions) => U
  ): PipedParser<U, TA> {
    this.pipes.push(fn);
    return this as any;
  }
  case(
    condition: (value: TR) => boolean,
    returnValue: TR
  ): PipedParser<TR, TA> {
    this.pipes.push((value: any) => (condition(value) ? returnValue : value));
    return this as any;
  }
  switch(
    cases: {
      condition: (value: TR) => boolean;
      action: (piped: PipedParser<TR, TA>) => PipedParser<any, TA>;
    }[]
  ): PipedParser<any, TA> {
    this.pipes.push((value: any) => {
      for (const { condition, action } of cases) {
        if (condition(value)) {
          return action(new PipedParser()).compile(value);
        }
      }
      return value;
    });
    return this as any;
  }
  //#endregion

  //#region Properties
  optional(options?: {
    optional: any[] | ((value: TA) => boolean);
    allowNull?: boolean;
  }): PipedParser<TR | undefined, TA> {
    const opts = Object.assign({ allowNull: false }, options);
    const optionalPipe: IGenericPipe = (value: any) => {
      if (opts.optional) {
        if (Array.isArray(opts.optional)) {
          if (opts.optional.includes(value)) {
            optionalPipe.break = true;
            return value;
          }
        } else if (opts.optional(value)) {
          optionalPipe.break = true;
          return value;
        }
        optionalPipe.break = false;
        return value;
      }
      if (typeof value === 'undefined') {
        optionalPipe.break = true;
        return undefined;
      }
      if (!opts.allowNull && value === null) {
        optionalPipe.break = true;
        return value;
      }
      optionalPipe.break = false;
      return value;
    };
    optionalPipe.break = false;
    this.pipes.push(optionalPipe);
    return this as any;
  }
  default<TFR = TR>(
    defaultValue: TFR,
    options?: {
      isEmpty?: ((value: TR) => boolean) | any[];
      allowNull?: boolean;
    }
  ): PipedParser<TFR, TA> {
    const opts = Object.assign({ allowNull: false }, options);
    this.pipes.push((value: any) => {
      if (opts.isEmpty) {
        if (typeof opts.isEmpty === 'function') {
          if (opts.isEmpty(value)) {
            return defaultValue;
          }
          return value;
        } else if (Array.isArray(opts.isEmpty)) {
          if (opts.isEmpty.includes(value)) {
            return defaultValue;
          }
          return value;
        }
      }
      if (typeof value === 'undefined') {
        return defaultValue;
      }
      if (!opts.allowNull && value === null) {
        return defaultValue;
      }

      return value;
    });
    return this as any;
  }
  //#endregion

  //#region Helpers
  extract<TV extends keyof TR>(key: TV): PipedParser<TR[TV], TA> {
    this.pipes.push((value: any) => {
      return value[key];
    });
    return this as any;
  }
  //#endregion
}

type AnyPipedParser = PipedParser<any, any>;

export interface IParserSchema {
  compile(object: any, options?: IPipeOptions): any;
}

class SchemaParser implements IParserSchema {
  constructor(
    private schema: Record<string, AnyPipedParser | IParserSchema> = {}
  ) {}

  compile(object: any, options = {}): any {
    return Object.keys(this.schema).reduce((result, key) => {
      let value: any;
      if (object === undefined || object === null) {
        value = undefined;
      } else if (Object.keys(object).includes(key)) {
        value = object[key];
      } else {
        value = undefined;
      }

      const schemaPipes = this.schema[key];
      const parsed = schemaPipes.compile(value, {
        root: result,
        type: 'default',
        ...options,
      });

      result[key] = parsed;
      return result;
    }, {});
  }
}

class AsyncSchemaParser implements IParserSchema {
  constructor(
    private schema: Record<string, AnyPipedParser | IParserSchema> = {}
  ) {}

  async compile(object: any, options = {}): Promise<any> {
    return await asyncReduce(
      Object.keys(this.schema),
      async (result, key) => {
        let value: any;
        if (object === undefined || object === null) {
          value = undefined;
        } else if (Object.keys(object).includes(key)) {
          value = object[key];
        } else {
          value = undefined;
        }

        const schemaPipes = this.schema[key];
        const parsed = await schemaPipes.compile(value, {
          root: result,
          type: 'async',
          ...options,
        });

        result[key] = parsed;
        return result;
      },
      {}
    );
  }
}

class KeysParser implements IParserSchema {
  constructor(private keys: string[] = [], private value: AnyPipedParser) {}

  compile(object: any, options = {}): any {
    if (this.keys.length === 0) {
      return Object.keys(object).reduce((result, key) => {
        result[key] = this.value.compile(object[key], options);
        return result;
      }, {});
    }
    return Object.keys(object).reduce((result, key) => {
      if (this.keys.includes(key)) {
        result[key] = this.value.compile(object[key], options);
      } else {
        result[key] = object[key];
      }
      return result;
    }, {});
  }
}

export const KitParser = {
  compile(schema: IParserSchema, object: any, options = {}): any {
    return schema.compile(object, options);
  },
  number<TA = unknown>(): PipedParser<number, TA> {
    return new PipedParser<TA, TA>().number();
  },
  pipe<TA = unknown, TR = unknown>(fn: (value: TA) => TR): PipedParser<TR, TA> {
    return new PipedParser<TA, TA>().pipe(fn);
  },
  case<TR>(
    condition: (value: unknown) => boolean,
    setValue: TR
  ): PipedParser<TR, unknown> {
    return new PipedParser<TR, unknown>().case(condition, setValue);
  },
  switch<TR>(
    cases: {
      condition: (value: unknown) => boolean;
      action: (piped: PipedParser<TR, unknown>) => PipedParser<TR, unknown>;
    }[]
  ): PipedParser<any, unknown> {
    return new PipedParser<TR, unknown>().switch(cases);
  },
  forEachKey<TR, TA = unknown>(
    value: PipedParser<TR, TA>,
    keys: string[] = []
  ): KeysParser {
    return new KeysParser(keys, value);
  },
  schema(
    schema: Record<string, AnyPipedParser | IParserSchema>,
    schemaType: 'async' | 'default' = 'default'
  ): IParserSchema {
    if (schemaType === 'async') {
      return new AsyncSchemaParser(schema);
    }
    return new SchemaParser(schema);
  },
  arrayOf<TR, TA = any>(value: PipedParser<TR, TA>): PipedParser<TR[], TA> {
    return new PipedParser<TA, TA>().arrayOf(value);
  },
  object<TA = unknown>() {
    return new PipedParser<object, TA>().object();
  },
  any<TA = unknown>() {
    return new PipedParser<any, TA>().any();
  },
  ref<TR = any, TA = any>(fn: (value: TA) => TR): PipedParser<TR, TA> {
    return new PipedParser<TR, TA>().ref(fn);
  },
  function<TA = any>(): PipedParser<(value: TA) => any, TA> {
    return new PipedParser<(value: TA) => any, TA>().function();
  },
  string<TA = unknown>(): PipedParser<string, TA> {
    return new PipedParser<TA, TA>().string();
  },
  boolean<TA = unknown>({ allowEmptyObject = false } = {}): PipedParser<
    boolean,
    TA
  > {
    return new PipedParser<TA, TA>().boolean({ allowEmptyObject });
  },
  extract<TA = unknown>(key: string): PipedParser<any, TA> {
    return new PipedParser<any, TA>().extract(key);
  },
  optional<TA = unknown>(options?: {
    optional: any[] | ((value: TA) => boolean);
    allowNull?: boolean;
  }): PipedParser<TA | undefined, TA> {
    return new PipedParser<TA, TA>().optional(options);
  },
  default<TA = unknown>(
    defaultValue: TA,
    options?: {
      isEmpty?: (value: TA) => boolean;
      allowNull?: boolean;
    }
  ): PipedParser<TA, TA> {
    return new PipedParser<TA, TA>().default(defaultValue, options);
  },
};

export default KitParser;
