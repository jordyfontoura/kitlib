import { performance } from 'perf_hooks';

export function cooldown(fn: Function, time: number) {
  let lastExecution: number = performance.now();
  return function (...args: any[]) {
    const now = performance.now();
    if (now - lastExecution > time) {
      lastExecution = now;
      return fn(...args);
    }
  };
}
