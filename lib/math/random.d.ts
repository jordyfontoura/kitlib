export default class Random {
    private static setRandomSeed;
    /**
     * Retorna um inteiro entre o inicio e o (fim-1)
     * @param inicio Início
     * @param fim Fim exclusivo
     * @returns
     */
    static int(inicio: number, fim: number): number;
    /**
     * Retorna um real entre o inicio e o fim
     * @param inicio Início
     * @param fim Fim
     * @returns
     */
    static number(): number;
    static number(max: number): number;
    static item(lista: any[]): any;
    private static ids;
    static id(group?: string): number;
    static index(probabilidades: number[]): number;
    static chance(chance: number): boolean;
    static sequence<T>(partes: T[], critério: (atual: T[]) => boolean): T[];
    static currentSeed: string;
    static get seed(): string;
    static set seed(value: string);
    static randomSeed(value?: string): void;
}
//# sourceMappingURL=random.d.ts.map