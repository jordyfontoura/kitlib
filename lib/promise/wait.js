"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wait(ms) {
    if (ms <= 0) {
        return;
    }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.default = wait;
//# sourceMappingURL=wait.js.map