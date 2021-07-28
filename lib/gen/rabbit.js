"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitInsertion = void 0;
/**
 * Insere elementos em uma lista saltando um número determinado de itens
 * @param lista Lista onde ocorrerá a inserção
 * @param fn Função que recebe a quantidade de itens já adicionados e retorna o item que será inserido
 * @param compensar Posição do primeiro item. *Valor deve ser menor salto e maior que ou igual a 0
 * @param salto Quantidade de itens a serem saltados a cada inserção. (OBS: salto deve ser maior que 0)
 * @param quantidade Quantidade máxima de itens a serem inseridos. (Default: infinito)
 */
function rabbitInsertion(lista, fn, compensar, salto, quantidade) {
    if (compensar === void 0) { compensar = 0; }
    if (salto === void 0) { salto = 2; }
    if (quantidade === void 0) { quantidade = Infinity; }
    var count = 0;
    for (var i = 0; i < lista.length && count < quantidade; i++) {
        if ((i + salto + 1 - compensar) % (salto + 1) == 0) {
            lista.splice(i, 0, fn(count++));
        }
    }
}
exports.rabbitInsertion = rabbitInsertion;
Array.prototype.rabbitInsertion = function (fn, compensar, salto, quantidade) {
    if (compensar === void 0) { compensar = 0; }
    if (salto === void 0) { salto = 2; }
    if (quantidade === void 0) { quantidade = Infinity; }
    rabbitInsertion(this, fn, compensar, salto, quantidade);
};
//# sourceMappingURL=rabbit.js.map