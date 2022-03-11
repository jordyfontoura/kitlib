export function autoThis(fn: Function): any {
  return function (this: any, ...args: any[]) {
    return fn(this, ...args);
  } as any;
}
