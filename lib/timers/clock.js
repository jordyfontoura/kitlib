"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clock = /** @class */ (function () {
    function Clock() {
        this.startedAt = performance.now();
    }
    Clock.prototype.track = function () {
        this.startedAt = performance.now();
    };
    Object.defineProperty(Clock.prototype, "elapsed", {
        get: function () {
            return performance.now() - this.startedAt;
        },
        enumerable: false,
        configurable: true
    });
    return Clock;
}());
exports.default = Clock;
//# sourceMappingURL=clock.js.map