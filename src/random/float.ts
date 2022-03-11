function float(max: number): number;
function float(min: number, max?: number): number {
  if (max === undefined) {
    return Math.random() * min;
  }
  return Math.random() * (max - min) + min;
}
export default float;
