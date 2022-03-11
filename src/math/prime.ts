class Primo {
  start: number;
  pos: number;
  constructor(start: number = 0) {
    this.start = start;
    this.pos = start;
  }

  get next(): number {
    if (this.pos < 2) {
      this.pos = 2;
    } else {
      while (true) {
        this.pos = Primo.f(this.pos);
        if (Primo.check(this.pos)) break;
      }
    }
    return this.pos;
  }

  static f(x: number): number {
    if ((x + 1) % 6 == 0) return x + 2;
    else if ((x - 1) % 6 == 0) return x + 4;
    else return x + 1;
  }

  static check(num: number): boolean {
    let p = new Primo();
    let at = Math.floor(Math.sqrt(num));
    if (num > 3) {
      while (p.next <= at) {
        if (num % p.pos == 0) return false;
      }
    } else if (num < 2) return false;
    return true;
  }

  static quant(start: number, end: number): number {
    let p = new Primo(start);
    let num = p.next;
    let res = 0;
    while (num < end) {
      res += 1;
      num = p.next;
    }
    return res;
  }

  static get(start: number, end: number): number[] {
    let p = new Primo(start);
    let res: number[] = [];
    while (true) {
      let num = p.next;
      if (num >= end) break;
      else res.push(num);
    }
    return res;
  }
}

let valor = new Primo();
let ms = Date.now();
console.log(Primo.get(70000, 80000));
console.log(Date.now() - ms);
