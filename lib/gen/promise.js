/**
 * @param {Function} condition
 * @param {{timeout: number, step: number}} options
 * @returns {Promise}
 */
export function waitWhile(condition, options) {
    let opts = Object.assign({ timeout: Infinity, step: 100 }, options);
    function loop(resolve, reject, started) {
        return function () {
            if (Date.now() - started > opts.timeout) {
                return reject('Timeout');
            }
            if (!condition()) {
                return resolve();
            }
            setTimeout(loop(resolve, reject, started), opts.step);
        };
    }
    return new Promise((resolve, reject) => {
        loop(resolve, reject, Date.now())();
    });
}
//# sourceMappingURL=promise.js.map