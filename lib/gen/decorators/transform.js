"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
function transform(fn) {
    return function decorator(target, propertyKey) {
        var value;
        var getter = function () {
            return value;
        };
        var setter = function (newValue) {
            value = fn(newValue);
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}
exports.transform = transform;
//# sourceMappingURL=transform.js.map