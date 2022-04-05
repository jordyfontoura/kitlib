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
