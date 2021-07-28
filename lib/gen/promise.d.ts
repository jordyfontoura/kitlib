/**
 * @param {Function} condition
 * @param {{timeout: number, step: number}} options
 * @returns {Promise}
 */
export declare function promiseWhen(condition: () => boolean, options?: {
    timeout?: number;
    step?: number;
}): Promise<unknown>;
//# sourceMappingURL=promise.d.ts.map