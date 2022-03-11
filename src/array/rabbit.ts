import { autoThis } from '../overload';

/**
 * Insere elementos em uma lista saltando um número determinado de itens
 * @param lista Lista onde ocorrerá a inserção
 * @param fn Função que recebe a quantidade de itens já adicionados e retorna o item que será inserido
 * @param compensar Posição do primeiro item. *Valor deve ser menor salto e maior que ou igual a 0
 * @param salto Quantidade de itens a serem saltados a cada inserção. (OBS: salto deve ser maior que 0)
 * @param quantidade Quantidade máxima de itens a serem inseridos. (Default: infinito)
 */
export function rabbitInsertion<T = any>(
  lista: T[],
  fn: (count: number) => T,
  compensar: number = 0,
  salto: number = 2,
  quantidade: number = Infinity
) {
  let count = 0;
  for (let i = 0; i < lista.length && count < quantidade; i++) {
    if ((i + salto + 1 - compensar) % (salto + 1) == 0) {
      lista.splice(i, 0, fn(count++));
    }
  }
}

declare global {
  interface Array<T> {
    rabbitInsert<K>(
      fn: (count: number) => K,
      compensar?: number,
      salto?: number,
      quantidade?: number
    ): void;
  }
}
export function overload() {
  Array.prototype.rabbitInsert = function <T = any>(): void {
    return autoThis(rabbitInsertion);
  };
}
