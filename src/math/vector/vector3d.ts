import hash from 'object-hash';
import { Vector2D } from './vector2d';

type Iter<T> = { value: T; next: () => Iter<T> | null };

export class Vector3D extends Array<number> {
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super(x, y, z);
  }

  get hash(): string {
    return hash([this[0], this[1]]);
  }

  get x(): number {
    return this[0];
  }
  get y(): number {
    return this[1];
  }
  get z(): number {
    return this[2];
  }

  get sqrMagnitude() {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  get normalized(): Vector3D {
    const magnitude = this.magnitude;
    return new Vector3D(
      this[0] / magnitude,
      this[1] / magnitude,
      this[2] / magnitude
    );
  }

  get ceil(): Vector3D {
    return this.apply(Math.ceil);
  }
  get round(): Vector3D {
    return this.apply(Math.round);
  }
  get floor(): Vector3D {
    return this.apply(Math.floor);
  }

  get neg(): Vector3D {
    return this.apply((x) => -x);
  }

  add(n: number): Vector3D;
  add(x: number, y: number, z?: number): Vector3D;
  add(vector: Vector3D): Vector3D;
  add(other: Vector3D | number[] | number, y?: number, z?: number): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(this[0] + other, this[1] + y, this[2] + z);
        }
        return new Vector3D(this[0] + other, this[1] + y, this[2]);
      }
      return new Vector3D(this[0] + other, this[1] + other, this[2] + other);
    }
    return new Vector3D(
      this[0] + other[0],
      this[1] + other[1],
      this[2] + other[2]
    );
  }
  sub(n: number): Vector3D;
  sub(x: number, y: number, z?: number): Vector3D;
  sub(vector: Vector3D): Vector3D;
  sub(other: Vector3D | number[] | number, y?: number, z?: number): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(this[0] - other, this[1] - y, this[2] - z);
        }
        return new Vector3D(this[0] - other, this[1] - y, this[2]);
      }
      return new Vector3D(this[0] - other, this[1] - other, this[2] - other);
    }
    return new Vector3D(
      this[0] - other[0],
      this[1] - other[1],
      this[2] - other[2]
    );
  }
  isub(n: number): Vector3D;
  isub(x: number, y: number, z?: number): Vector3D;
  isub(vector: Vector3D): Vector3D;
  isub(other: Vector3D | number[] | number, y?: number, z?: number): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(other - this[0], y - this[1], z - this[2]);
        }
        return new Vector3D(other - this[0], y - this[1], this[2]);
      }
      return new Vector3D(other - this[0], other - this[1], other - this[2]);
    }
    return new Vector3D(
      other[0] - this[0],
      other[1] - this[1],
      other[2] - this[2]
    );
  }
  mul(n: number): Vector3D;
  mul(x: number, y: number, z?: number): Vector3D;
  mul(vector: Vector3D): Vector3D;
  mul(other: Vector3D | number[] | number, y?: number, z?: number): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(this[0] * other, this[1] * y, this[2] * z);
        }
        return new Vector3D(this[0] * other, this[1] * y, this[2]);
      }
      return new Vector3D(this[0] * other, this[1] * other, this[2] * other);
    }
    return new Vector3D(
      this[0] * other[0],
      this[1] * other[1],
      this[2] * other[2]
    );
  }
  div(n: number): Vector3D;
  div(x: number, y: number, z?: number): Vector3D;
  div(vector: Vector3D): Vector3D;
  div(other: Vector3D | number[] | number, y?: number, z?: number): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(this[0] / other, this[1] / y, this[2] / z);
        }
        return new Vector3D(this[0] / other, this[1] / y, this[2]);
      }
      return new Vector3D(this[0] / other, this[1] / other, this[2] / other);
    }
    return new Vector3D(
      this[0] / other[0],
      this[1] / other[1],
      this[2] / other[2]
    );
  }
  idiv(n: number): Vector3D;
  idiv(x: number, y: number, z?: number): Vector3D;
  idiv(vector: Vector3D): Vector3D;
  idiv(other: Vector3D | number[] | number, y?: number, z?: number): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(other / this[0], y / this[1], z / this[2]);
        }
        return new Vector3D(other / this[0], y / this[1], this[2]);
      }
      return new Vector3D(other / this[0], other / this[1], other / this[2]);
    }
    return new Vector3D(
      other[0] / this[0],
      other[1] / this[1],
      other[2] / this[2]
    );
  }

  scalar(n: number): Vector3D;
  scalar(x: number, y: number, z?: number): number;
  scalar(vector: Vector3D): number;
  scalar(
    other: Vector3D | number[] | number,
    y?: number,
    z?: number
  ): number | Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return this[0] * other + this[1] * y + this[2] * z;
        }
        return this[0] * other + this[1] * y + this[2];
      }
      return new Vector3D(this[0] * other, this[1] * other, this[2] * other);
    }
    return this[0] * other[0] + this[1] * other[1] + this[2] * other[2];
  }

  vetorial(x: number, y: number, z: number): Vector3D;
  vetorial(vector: Vector3D): Vector3D;
  vetorial(vector: Vector2D): Vector3D;
  vetorial(
    other: Vector3D | Vector2D | number[] | number,
    y?: number,
    z?: number
  ): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(
            this[1] * z - this[2] * y,
            this[2] * other - this[0] * z,
            this[0] * y - this[1] * other
          );
        }
        return new Vector3D(
          -this[2] * y,
          this[2] * other,
          this[0] * y - this[1] * other
        );
      }
      return new Vector3D(
        this[1] * other - this[2] * other,
        this[2] * other - this[0] * other,
        this[0] * other - this[1] * other
      );
    }
    if (other instanceof Vector2D) {
      return new Vector3D(
        -this[2] * other[1],
        this[2] * other[0],
        this[0] * other[1] - this[1] * other[0]
      );
    }
    return new Vector3D(
      this[1] * other[2] - this[2] * other[1],
      this[2] * other[0] - this[0] * other[2],
      this[0] * other[1] - this[1] * other[0]
    );
  }

  apply(fn: (n: number) => number): Vector3D {
    return new Vector3D(fn(this[0]), fn(this[1]), fn(this[2]));
  }
}
