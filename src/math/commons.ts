export function standardDeviation(valores: number[]): number;
export function standardDeviation(...valores: number[]): number;
export function standardDeviation(
  first: number | number[],
  ...valores: number[]
): number {
  if (typeof first === 'number') {
    const med = mean(first, ...valores);
    return Math.sqrt(
      valores.reduce((a, b) => a + (b - med) * (b - med), first) /
        (valores.length + 1)
    );
  } else {
    const med = mean(first);
    return Math.sqrt(
      first.reduce((a, b) => a + (b - med) * (b - med), 0) / first.length
    );
  }
}

export function average(valores: number[]): number;
export function average(...valores: number[]): number;
export function average(first: number | number[], ...valores: number[]) {
  if (typeof first === 'number') {
    return valores.sort((a, b) => a - b);
  } else {
    const sortedList = first.sort((a, b) => a - b);
    if (sortedList.length % 2 === 1) {
      return sortedList[(sortedList.length - 1) / 2];
    } else {
      return (
        (sortedList[sortedList.length / 2] -
          sortedList[sortedList.length / 2 - 1]) /
        2
      );
    }
  }
}

export function mean(valores: number[]): number;
export function mean(...valores: number[]): number;
export function mean(first: number | number[], ...valores: number[]) {
  if (typeof first === 'number') {
    return valores.reduce((a, b) => a + b, first) / (valores.length + 1);
  } else {
    return first.reduce((a, b) => a + b, 0) / first.length;
  }
}
export function sum(valores: number[]): number;
export function sum(...valores: number[]): number;

/**
 * Soma valores de uma lista
 */
export function sum(first: number | number[], ...valores: number[]) {
  if (typeof first === 'number') {
    return first + valores.reduce((a, b) => a + b, 0);
  } else {
    return first.reduce((a, b) => a + b, 0);
  }
}
enum ECurvasPercentuais {
  '1/(1+x^2)',
}
/**
 * Mapeia valores de [-inf, inf] para (0, 1] sendo distribuir(0)=1 e lim(x->(+inf | -inf))distribuir=0
 * @param valor
 * @param curva
 * @returns
 */
export function distribute(
  valor: number,
  curva: ECurvasPercentuais = ECurvasPercentuais['1/(1+x^2)']
): number {
  switch (curva) {
    case ECurvasPercentuais['1/(1+x^2)']:
      return 1 / (1 + valor * valor);

    default:
      throw new Error('Curva não encontrada!');
  }
}
export function interpolate(
  delta: number,
  inicio: number[],
  fim: number[],
  ...outros: number[][]
): number[];
export function interpolate(delta: number, inicio: number, fim: number): number;
/**
 * Interpola valores baseados em um delta.
 * @example interpolar(0.75, 0, [100, -100], 0) -> [-50, 50]
 * @param {number} delta Valor no intervalo [0, 1] que representa o percentual da interpolação.
 * @param {number|number[]} inicio Valor(es) que representa(m) o inicio da interpolação.
 * @param {number|number[]} fim Valor(es) que representa(m) o final ou o próximo ponto da interpolação.
 * @param  {...number} args Valor(es) que representa(m) os pontos da interpolação.
 */
export function interpolate(
  delta: number,
  inicio: number | number[],
  fim: number | number[],
  ...args: number[][]
): number | number[] {
  const parts: (number | number[])[] = [inicio, fim, ...args];
  if (delta <= 0) return parts[0];
  const value = Math.floor((parts.length - 1) * delta);
  const inc = parts.length / (parts.length - 1);
  const modDelta = ((delta * parts.length) % inc) / inc;
  if (value >= parts.length - 1) return parts[parts.length - 1];
  const index = parts.findIndex((part) => Array.isArray(part));
  if (index !== -1) {
    const length = (parts[index] as number[]).length;
    for (let i = 0, imax = parts.length; i < imax; i++) {
      if (
        (parts[i] as number[]).length !== undefined &&
        (parts[i] as number[]).length !== length
      ) {
        throw new RangeError('Argumentos com tamanhos diferentes!');
      }
    }
    const resultado = [];
    for (let i = 0; i < (parts[index] as number[]).length; i++) {
      const x = (parts[value] as number[]).length
        ? (parts[value] as number[])[i]
        : (parts[value] as number);
      const y = (parts[value + 1] as number[]).length
        ? (parts[value + 1] as number[])[i]
        : (parts[value + 1] as number);
      resultado.push((y - x) * modDelta + x);
    }
    return resultado;
  } else {
    return (
      ((parts[value + 1] as number) - (parts[value] as number)) * modDelta +
      (parts[value] as number)
    );
  }
}
/**
 * Limita o valor de entrada no intervalo especificado
 * @param valor valor a ser limitado
 * @param min valor mínimo
 * @param max valor máximo
 * @returns retorna um valor entre min e max se o valor estiver entre min e max, caso contrario retorna min ou max
 */
export function clamp(valor: number, min: number, max: number) {
  return Math.min(Math.max(valor, min), max);
}

/**
 * Mapeia valores limitados em um intervalo A para um intervalo B
 * @param value valor a ser mapeado
 * @param deMin menor valor do intervalo de origem
 * @param deMax maior valor do intervalo de destino
 * @param paraMin menor valor do intervalo de destino
 * @param paraMax maior valor do intervalo de destino
 * @param useClamp garante que o valor esteja no intervalo de destino;
 * @returns
 */
export function mapValue(
  value: number,
  deMin: number,
  deMax: number,
  paraMin: number,
  paraMax: number,
  useClamp = true
) {
  if (useClamp)
    return clamp(
      ((value - deMin) * (paraMax - paraMin)) / (deMax - deMin) + paraMin,
      paraMin,
      paraMax
    );
  else
    return ((value - deMin) * (paraMax - paraMin)) / (deMax - deMin) + paraMin;
}
