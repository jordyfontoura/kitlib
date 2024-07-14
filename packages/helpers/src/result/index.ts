
type IResultData<T, E, K> = [T, E, K]

interface IResultOps<T, E> {
  orDefault: (defaultValue: T) => T;
  orElse: <U = T>(fn: (error: E) => U) => T | U;
  orThrow: (message?: string) => T;
}
type IResult<T, E> = (IResultData<T, undefined, false> | IResultData<undefined, E, true>) & IResultOps<T, E>;

type IResultSuccess<T, E=unknown> = IResultData<T, undefined, false> & IResultOps<T, E>;
type IResultError<E,T=unknown> = IResultData<undefined, E, true> & IResultOps<T, E>;

function createResult<T, E>(value: undefined, error: E): IResultError<E>;
function createResult<T, E>(value: T, error: undefined): IResultSuccess<T>;
function createResult<T, E>(value: T, error: E): IResult<T, E> {
  const ops = {
    orDefault,
    orElse,
    orThrow,
  }
  if (error) {
    return Object.assign([undefined, error, true], ops) as IResult<T, E>;
  }

  return Object.assign([value, undefined, false], ops) as IResult<T, E>;

  function orDefault(defaultValue: T): T {
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
}

function success<T>(value: T): IResultSuccess<T> {
  return createResult(value, undefined);
}

function error<T>(error: T): IResultError<T> {
  return createResult(undefined, error);
}

interface Promise<T> {
  asResult<E=Error, U=T>(): Promise<IResult<U, E>>;
}

Promise.prototype.asResult = async function asResult<E=Error, U=unknown>(): Promise<IResult<U, E>> {
  try {
    const value = await this;
    return success<U>(value) as IResult<U, E>;
  } catch (error) {
    return error(error);
  }
};