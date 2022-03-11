const middlewares = {};
export function execMiddleware(id, params) {
    if (id in middlewares || middlewares[id]) {
        return middlewares[id].map(fn => fn({ id, params }));
    }
}
export function registerMiddleware(id, value) {
    if (!(id in middlewares) || !Object.keys(middlewares).includes(id)) {
        middlewares[id] = [];
    }
    if (!middlewares[id].includes(value)) {
        middlewares[id].push(value);
    }
}
//# sourceMappingURL=observer.js.map