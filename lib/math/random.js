import setRandomSeed from 'seed-random';
export default class Random {
    /**
     * Retorna um inteiro entre o inicio e o (fim-1)
     * @param inicio Início
     * @param fim Fim exclusivo
     * @returns
     */
    static int(inicio, fim) {
        return inicio + Math.floor(Math.random() * (fim - inicio));
    }
    static number(inicio, fim) {
        if (!inicio) {
            return Math.random();
        }
        if (fim === undefined) {
            return inicio * Math.random();
        }
        return inicio + Math.random() * (fim - inicio);
    }
    static item(lista) {
        return lista[this.int(0, lista.length)];
    }
    static id(group = 'default') {
        let id;
        if (!(group in this.ids)) {
            this.ids[group] = [];
        }
        do {
            id = this.int(1000000, 1000000 * 10);
        } while (this.ids[group].includes(id));
        this.ids[group].push(id);
        return id;
    }
    static index(probabilidades) {
        let soma = 0;
        let resultado = 0;
        let total = probabilidades.reduce((a, b) => a + b, 0);
        const escolha = Math.random() * total;
        for (let i = 0; i < probabilidades.length; i++) {
            if (escolha <= soma) {
                return resultado;
            }
            resultado = i;
            soma += probabilidades[i];
        }
        return probabilidades.length - 1;
    }
    static chance(chance) {
        return Math.random() < chance;
    }
    static sequence(partes, critério) {
        let res = [];
        while (critério(res)) {
            res.push(this.item(partes));
        }
        return res;
    }
    static get seed() {
        return this.currentSeed;
    }
    static set seed(value) {
        this.currentSeed = value;
        this.setRandomSeed(this.currentSeed, { global: true });
    }
    static randomSeed(value) {
        const len = this.int(5, 15);
        this.currentSeed = this.sequence('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''), (atual) => atual.length < len).join('');
        this.setRandomSeed(this.currentSeed, { global: true });
    }
}
Random.setRandomSeed = setRandomSeed;
Random.ids = { default: [] };
Random.currentSeed = '';
Random.randomSeed();
//# sourceMappingURL=random.js.map