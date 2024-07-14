
type IResultData<T, E, K> = [T, E, K]

interface IResultOps<T, E> {
  orDefault: (defaultValue: T) => T;
  orElse: <U = T>(fn: (error: E) => U) => T | U;
  orThrow: (message?: string) => T;
  mapValue: <U>(fn: (value: T) => U) => IResult<U, E>;
}
export type IResult<T, E> = (IResultData<T, undefined, false> | IResultData<undefined, E, true>) & IResultOps<T, E>;

export type IResultSuccess<T, E=unknown> = IResultData<T, undefined, false> & IResultOps<T, E>;
export type IResultError<E,T=unknown> = IResultData<undefined, E, true> & IResultOps<T, E>;

function createResult<T, E>(value: undefined, error: E): IResultError<E>;
function createResult<T, E>(value: T, error: undefined): IResultSuccess<T>;
function createResult<T, E>(value: T, error: E): IResult<T, E> {
  let result: IResult<T, E>;

  const ops = {
    orDefault,
    orElse,
    orThrow,
    mapValue,
  }
  if (error) {
    result = Object.assign([undefined, error, true], ops) as IResult<T, E>;
  } else {
    result = Object.assign([value, undefined, false], ops) as IResult<T, E>;
  }

  return result;

  function orDefault<U = T>(defaultValue: U): T | U {
    if (error) {
      return defaultValue;
    }

    return value;
  }

  function orElse<U = T>(fn: (error: E) => U): T | U {
    if (error) {
      return fn(error);
    }

    return value;
  }

  function orThrow(message?: string): T {
    if (error) {
      throw new Error(message || String(error));
    }

    return value;
  }

  function mapValue<U>(fn: (value: T) => U): IResultSuccess<U, E> | IResultError<E, U> {
    if (error !== undefined) {
      return result as unknown as IResultError<E, U>;
    }

    return success(fn(value)) as IResultSuccess<U, E>;
  }
}

export function success<T, E=unknown>(value: T): IResultSuccess<T, E> {
  return createResult<T, E>(value, undefined) as IResultSuccess<T, E>;
}

export function error<E, T=unknown>(error: E): IResultError<E, T> {
  return createResult<T, E>(undefined, error) as IResultError<E, T>;
}


declare global {
  export interface Promise<T> {
    asResult<U=T,E=Error>(): Promise<IResult<U, E>>;
  }
}

Promise.prototype.asResult = function asResult<E=Error, U=unknown>(): Promise<IResult<U, E>> {
  return this.then(success, error) as Promise<IResult<U, E>>;
};

