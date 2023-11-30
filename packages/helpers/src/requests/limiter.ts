import { performance } from 'perf_hooks';

export function limiter<T extends Array<any>, K>(
  action: (...args: T) => Promise<K>,
  frequency: number,
  overload: boolean = false
) {
  const queue = [] as (() => Promise<void>)[];
  let startedAt = 0;
  let endAt = 0;
  let running = false;

  function runner() {
    running = true;
    if (queue.length === 0) {
      running = false;
      return;
    }
    let delta = Math.max(performance.now() - endAt, 0);
    if (overload) delta += Math.max(endAt - startedAt, 0);
    const fn = queue.shift()!;
    const runnerAction = async function runnerAction() {
      await fn();
      if (queue.length > 0) {
        setTimeout(runner, 0);
        return;
      }
      running = false;
    };
    if (delta >= frequency) {
      runnerAction();
    } else {
      setTimeout(runnerAction, frequency - delta);
    }
  }

  return async function (...args: T): Promise<K> {
    return new Promise((resolve, reject) => {
      const actionItem = async function () {
        try {
          startedAt = performance.now();
          const data = await action(...args);
          endAt = performance.now();
          resolve(data);
        } catch (reason) {
          endAt = performance.now();
          reject(reason);
        }
      };
      queue.push(actionItem);
      if (!running) {
        runner();
      }
    });
  };
}
