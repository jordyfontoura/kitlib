export interface GridCoordinates {
  row: number;
  col: number;
}

export interface GridItem<T> extends GridCoordinates {
  value: T;
}

export class Grid<T> {
  protected data: T[] = [];

  constructor(
    public rows: number,
    public cols: number,
    gen?: (row: number, col: number, data: T[]) => T
  ) {
    this.data = new Array(rows * cols);

    if (!gen) return;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.data[row * cols + col] = gen(row, col, this.data);
      }
    }
  }

  get(row: number, col: number): T | undefined {
    return this.data[row * this.cols + col];
  }

  set(row: number, col: number, value: T): void {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;

    this.data[row * this.cols + col] = value;
  }

  has(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  map<U>(callback: (value: T, row: number, col: number, data: T[]) => U): Grid<U> {
    const result = new Grid<U>(this.rows, this.cols);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        result.set(row, col, callback(this.get(row, col)!, row, col, this.data));
      }
    }

    return result;
  }

  forEach(callback: (value: T, row: number, col: number, data: T[]) => void): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        callback(this.get(row, col)!, row, col, this.data);
      }
    }
  }

  filter(callback: (value: T, row: number, col: number, data: T[]) => boolean): GridItem<T>[] {
    const result: GridItem<T>[] = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const value = this.get(row, col)!;

        if (callback(value, row, col, this.data)) {
          result.push({ row, col, value });
        }
      }
    }

    return result;
  }

  coordinates(): GridCoordinates[] {
    const result: GridCoordinates[] = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        result.push({ row, col });
      }
    }

    return result;
  }


  *[Symbol.iterator]() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        yield this.data[row * this.cols + col];
      }
    }
  }
}
