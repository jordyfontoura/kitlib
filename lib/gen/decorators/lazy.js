export function lazy(target, propertyKey, descriptor) {
    if (target instanceof Function && !propertyKey && !descriptor) {
        const generator = target;
        return function (target, propertyKey, descriptor) {
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
//# sourceMappingURL=lazy.js.map