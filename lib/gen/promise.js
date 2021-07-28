"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWhen = void 0;
/**
 * @param {Function} condition
 * @param {{timeout: number, step: number}} options
 * @returns {Promise}
 */
function promiseWhen(condition, options) {
    var opts = __assign({ timeout: Infinity, step: 0 }, options);
    function loop(resolve, reject, started) {
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
    return new Promise(function (resolve, reject) {
        loop(resolve, reject, Date.now())();
    });
}
exports.promiseWhen = promiseWhen;
//# sourceMappingURL=promise.js.map