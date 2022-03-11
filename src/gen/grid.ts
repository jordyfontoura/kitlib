class Tile {}
class Chunk {}
class Grid2D<T> {
  private _data: T[][];
  constructor(data: T[][]) {
    this._data = data;
  }
  get data(): T[][] {
    return this._data;
  }
  get(x: number, y: number): T {
    return this._data[y][x];
  }
  set(x: number, y: number, value: T): void {
    this._data[y][x] = value;
  }
  forEach(callback: (value: T, x: number, y: number) => void): void {
    for (let y = 0; y < this._data.length; y++) {
      for (let x = 0; x < this._data[y].length; x++) {
        callback(this._data[y][x], x, y);
      }
    }
  }
  map<U>(callback: (value: T, x: number, y: number) => U): U[][] {
    const result: U[][] = [];
    for (let y = 0; y < this._data.length; y++) {
      const row: U[] = [];
      for (let x = 0; x < this._data[y].length; x++) {
        row.push(callback(this._data[y][x], x, y));
      }
      result.push(row);
    }
    return result;
  }
  filter(callback: (value: T, x: number, y: number) => boolean): T[][] {
    const result: T[][] = [];
    for (let y = 0; y < this._data.length; y++) {
      const row: T[] = [];
      for (let x = 0; x < this._data[y].length; x++) {
        if (callback(this._data[y][x], x, y)) {
          row.push(this._data[y][x]);
        }
      }
      result.push(row);
    }
    return result;
  }
}
