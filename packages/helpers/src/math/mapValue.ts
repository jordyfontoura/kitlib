import { clamp } from './clamp';

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
