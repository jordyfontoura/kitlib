/**
 * Insere elementos em uma lista saltando um número determinado de itens
 * @param lista Lista onde ocorrerá a inserção
 * @param fn Função que recebe a quantidade de itens já adicionados e retorna o item que será inserido
 * @param compensar Posição do primeiro item. *Valor deve ser menor salto e maior que ou igual a 0
 * @param salto Quantidade de itens a serem saltados a cada inserção. (OBS: salto deve ser maior que 0)
 * @param quantidade Quantidade máxima de itens a serem inseridos. (Default: infinito)
 */
export declare function rabbitInsertion<T = any>(lista: T[], fn: (count: number) => T, compensar?: number, salto?: number, quantidade?: number): void;
declare global {
    interface Array<T> {
        rabbitInsertion<K>(fn: (count: number) => K, compensar?: number, salto?: number, quantidade?: number): void;
    }
}
//# sourceMappingURL=rabbit.d.ts.map