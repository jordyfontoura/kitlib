export function observe<T>(set: (value: T, lastValue: T) => void): any;
export function observe<T>(
  set: (value: T, lastValue: T) => void,
  get: (value: T) => void
): any;
export function observe<T>(
  set: (value: T, lastValue: T) => void,
  get?: (value: T) => void
) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let value: T, first=true;
    const getter = function () {
      get?.(value);
      return value;
    };
    const setter = function (newValue: T) {
      if (first) {
        value = newValue;
        first = false;
        return;
      }
      set?.(newValue, value);
      value = newValue;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}

