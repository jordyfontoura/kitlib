"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazy = void 0;
function lazy(target, propertyKey, descriptor) {
    if (target instanceof Function && !propertyKey && !descriptor) {
        var generator_1 = target;
        return function (target, propertyKey, descriptor) {
            delete descriptor.get;
            Object.defineProperty(target, propertyKey, {
                configurable: true,
                get: function () {
                    var value = generator_1();
                    Object.defineProperty(this, propertyKey, {
                        value: value,
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
    var generator = descriptor.get ? descriptor.get : function () { return undefined; };
    delete descriptor.get;
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        get: function () {
            var value = generator.call(this);
            Object.defineProperty(this, propertyKey, {
                value: value,
                configurable: true,
            });
            return value;
        },
    });
    return target;
}
exports.lazy = lazy;
//# sourceMappingURL=lazy.js.map