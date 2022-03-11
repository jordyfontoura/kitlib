export function transform(fn) {
    return function decorator(target, propertyKey) {
        let value;
        const getter = function () {
            return value;
        };
        const setter = function (newValue) {
            value = fn(newValue);
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}
//# sourceMappingURL=transform.js.map