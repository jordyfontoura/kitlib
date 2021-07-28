"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observe = void 0;
function observe(set, get) {
    return function (target, propertyKey, descriptor) {
        var value, first = true;
        var getter = function () {
            get === null || get === void 0 ? void 0 : get(value);
            return value;
        };
        var setter = function (newValue) {
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
exports.observe = observe;
//# sourceMappingURL=observe.js.map