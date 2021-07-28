export function lazy(
  generator: () => any
): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
export function lazy<T=any>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
): any;
export function lazy(
  target: any | (() => any),
  propertyKey?: string,
  descriptor?: PropertyDescriptor
) {
  if (target instanceof Function && !propertyKey && !descriptor) {
    const generator = target;
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      delete descriptor.get;
      Object.defineProperty(target, propertyKey, {
        configurable: true,
        get() {
          const value = generator();
          Object.defineProperty(this, propertyKey, {
            value,
            configurable: true,
          });
          return value;
        },
      });
      return target;
    };
  }
  if (!descriptor || !propertyKey) {
    throw new Error();
  }
  const generator = descriptor.get ? descriptor.get : () => undefined;
  delete descriptor.get;
  Object.defineProperty(target, propertyKey, {
    configurable: true,
    get() {
      const value = generator.call(this);
      Object.defineProperty(this, propertyKey, {
        value,
        configurable: true,
      });
      return value;
    },
  });
  return target;
}
