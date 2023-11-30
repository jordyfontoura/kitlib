export function counter(fn: Function, count: number) {
  let current = 0;
  return function (...args: any[]) {
    count++;
    if (current >= count) {
      count = 0;
      return fn(...args);
    }
  };
}
