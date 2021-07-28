import setRandomSeed from 'seed-random';

export default class Random {
  private static setRandomSeed = setRandomSeed;

  /**
   * Retorna um inteiro entre o inicio e o (fim-1)
   * @param inicio Início
   * @param fim Fim exclusivo
   * @returns
   */
  static int(inicio: number, fim: number) {
    return inicio + Math.floor(Math.random() * (fim - inicio));
  }
  /**
   * Retorna um real entre o inicio e o fim
   * @param inicio Início
   * @param fim Fim
   * @returns
   */
  static number(): number;
  static number(max: number): number;
  static number(inicio?: number, fim?: number) {
    if (!inicio) {
      return Math.random();
    }
    if (fim === undefined) {
      return inicio * Math.random();
    }
    return inicio + Math.random() * (fim - inicio);
  }
  static item(lista: any[]) {
    return lista[this.int(0, lista.length)];
  }
  private static ids = { default: [] } as Record<string, number[]>;
  static id(group: string = 'default'): number {
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
  static index(probabilidades: number[]) {
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
  static chance(chance: number): boolean {
    return Math.random() < chance;
  }
  static sequence<T>(partes: T[], critério: (atual: T[]) => boolean) {
    let res: T[] = [];
    while (critério(res)) {
      res.push(this.item(partes));
    }
    return res;
  }
  static currentSeed = '';
  static get seed() {
    return this.currentSeed;
  }
  static set seed(value: string) {
    this.currentSeed = value;
    this.setRandomSeed(this.currentSeed, { global: true });
  }
  static randomSeed(value?: string) {
    const len = this.int(5, 15);
    this.currentSeed = this.sequence(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
        ''
      ),
      (atual) => atual.length < len
    ).join('');
    this.setRandomSeed(this.currentSeed, { global: true });
  }
}
Random.randomSeed();
