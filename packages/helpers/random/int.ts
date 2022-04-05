function int(max: number): number;
function int(min: number, max: number): number;
function int(min: number, max?: number): number {
  if (max === undefined) {
    return Math.floor(Math.random() * (min - 1));
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default int;
