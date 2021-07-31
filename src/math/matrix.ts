class Matrix2D extends Array<number[]> {
  constructor(x: number, y: number, initial?: number);
  constructor(matrix: number[][]);
  constructor(
    x: number[][] | number,
    y?: number,
    initial?: number | ((x: number, y: number) => number)
  ) {
    super();
    if (typeof x === 'number') {
      for (let ix = 0; ix < x; ix++) {
        this.push([]);
        for (let iy = 0; iy < (y ?? x); iy++) {
          if (initial === undefined) {
            this[ix].push(0);
          } else if (typeof initial === 'number') {
            this[ix].push(initial);
          } else {
            this[ix].push(initial(ix, iy));
          }
        }
      }
    } else {
      for (let ix = 0; ix < x.length; ix++) {
        for (let iy = 0; iy < x[0].length; iy++) {
          this[ix][iy] = +x[ix][iy];
        }
      }
    }
  }
}
