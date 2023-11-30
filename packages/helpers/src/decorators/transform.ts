export function transform<T, K = any>(fn: (value: K) => T) {
  return function decorator(target: Object, propertyKey: string) {
    let value: T;
    const getter = function () {
      return value;
    };
    const setter = function (newValue: K) {
      value = fn(newValue);
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
