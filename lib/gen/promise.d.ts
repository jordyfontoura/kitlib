/**
 * @param {Function} condition
 * @param {{timeout: number, step: number}} options
 * @returns {Promise}
 */
export declare function waitWhile(condition: () => boolean, options?: {
    timeout?: number;
    step?: number;
}): Promise<void>;
//# sourceMappingURL=promise.d.ts.map