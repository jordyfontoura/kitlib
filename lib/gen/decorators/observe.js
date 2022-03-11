export function observe(set, get) {
    return function (target, propertyKey, descriptor) {
        let value, first = true;
        const getter = function () {
            get === null || get === void 0 ? void 0 : get(value);
            return value;
        };
        const setter = function (newValue) {
            if (first) {
                value = newValue;
                first = false;
                return;
            }
            set === null || set === void 0 ? void 0 : set(newValue, value);
            value = newValue;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}
//# sourceMappingURL=observe.js.map