"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMiddleware = exports.execMiddleware = void 0;
var middlewares = {};
function execMiddleware(id, params) {
    if (id in middlewares || middlewares[id]) {
        return middlewares[id].map(function (fn) { return fn({ id: id, params: params }); });
    }
}
exports.execMiddleware = execMiddleware;
function registerMiddleware(id, value) {
    if (!(id in middlewares) || !Object.keys(middlewares).includes(id)) {
        middlewares[id] = [];
    }
    if (!middlewares[id].includes(value)) {
        middlewares[id].push(value);
    }
}
exports.registerMiddleware = registerMiddleware;
//# sourceMappingURL=observer.js.map