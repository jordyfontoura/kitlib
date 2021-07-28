
/**
 * @param {Function} condition
 * @param {{timeout: number, step: number}} options
 * @returns {Promise}
 */
 export function promiseWhen(
  condition: () => boolean,
  options?: { timeout?: number; step?: number }
) {
  let opts = {
    timeout: Infinity,
    step: 0,
    ...options,
  };
  function loop(resolve: (value?: unknown) => void, reject: (reason?: any) => void, started: number) {
    return function () {
      if (Date.now() - started > opts.timeout) {
				return reject('Timeout');
      }
      if (condition()) {
        return resolve();
      }
      setTimeout(loop(resolve, reject, started), opts.step);
    };
  }
  return new Promise((resolve, reject) => {
    loop(resolve, reject, Date.now())();
  });
}
