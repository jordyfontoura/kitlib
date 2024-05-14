export function remap(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  return toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
}
