"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var seed_random_1 = __importDefault(require("seed-random"));
var Random = /** @class */ (function () {
    function Random() {
    }
    /**
     * Retorna um inteiro entre o inicio e o (fim-1)
     * @param inicio Início
     * @param fim Fim exclusivo
     * @returns
     */
    Random.int = function (inicio, fim) {
        return inicio + Math.floor(Math.random() * (fim - inicio));
    };
    Random.number = function (inicio, fim) {
        if (!inicio) {
            return Math.random();
        }
        if (fim === undefined) {
            return inicio * Math.random();
        }
        return inicio + Math.random() * (fim - inicio);
    };
    Random.item = function (lista) {
        return lista[this.int(0, lista.length)];
    };
    Random.id = function (group) {
        if (group === void 0) { group = 'default'; }
        var id;
        if (!(group in this.ids)) {
            this.ids[group] = [];
        }
        do {
            id = this.int(1000000, 1000000 * 10);
        } while (this.ids[group].includes(id));
        this.ids[group].push(id);
        return id;
    };
    Random.index = function (probabilidades) {
        var soma = 0;
        var resultado = 0;
        var total = probabilidades.reduce(function (a, b) { return a + b; }, 0);
        var escolha = Math.random() * total;
        for (var i = 0; i < probabilidades.length; i++) {
            if (escolha <= soma) {
                return resultado;
            }
            resultado = i;
            soma += probabilidades[i];
        }
        return probabilidades.length - 1;
    };
    Random.chance = function (chance) {
        return Math.random() < chance;
    };
    Random.sequence = function (partes, critério) {
        var res = [];
        while (critério(res)) {
            res.push(this.item(partes));
        }
        return res;
    };
    Object.defineProperty(Random, "seed", {
        get: function () {
            return this.currentSeed;
        },
        set: function (value) {
            this.currentSeed = value;
            this.setRandomSeed(this.currentSeed, { global: true });
        },
        enumerable: false,
        configurable: true
    });
    Random.randomSeed = function (value) {
        var len = this.int(5, 15);
        this.currentSeed = this.sequence('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''), function (atual) { return atual.length < len; }).join('');
        this.setRandomSeed(this.currentSeed, { global: true });
    };
    Random.setRandomSeed = seed_random_1.default;
    Random.ids = { default: [] };
    Random.currentSeed = '';
    return Random;
}());
exports.default = Random;
Random.randomSeed();
//# sourceMappingURL=random.js.map