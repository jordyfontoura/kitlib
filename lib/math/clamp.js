"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
/**
 * Limita o valor de entrada no intervalo especificado
 * @param valor valor a ser limitado
 * @param min valor mínimo
 * @param max valor máximo
 * @returns retorna um valor entre min e max se o valor estiver entre min e max, caso contrario retorna min ou max
 */
function clamp(valor, min, max) {
    return Math.min(Math.max(valor, min), max);
}
exports.clamp = clamp;
//# sourceMappingURL=clamp.js.map