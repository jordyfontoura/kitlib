import hash from 'object-hash';
import { lazy } from '../gen/decorators/lazy';
import { clamp } from './clamp';
import Random from './random';

type Iter<T> = { value: T; next: () => Iter<T> | null };
export class Vector2D {
  static get left(): Vector2D {
    return new Vector2D(-1, 0);
  }
  static get right(): Vector2D {
    return new Vector2D(-1, 0);
  }
  static get up(): Vector2D {
    return new Vector2D(-1, 0);
  }
  static get down(): Vector2D {
    return new Vector2D(-1, 0);
  }

  readonly 0: number;
  readonly 1: number;
  constructor(x: number = 0, y?: number) {
    this[0] = x;
    this[1] = y ?? x;
  }
  @lazy
  get hash(): string {
    return hash([this[0], this[1]], { algorithm: 'md5' });
  }
  @lazy
  get Vector3D(): Vector3D {
    return new Vector3D(this[0], this[1], 0);
  }
  @lazy
  get Vector2DInt(): Vector2DInt {
    return new Vector2DInt(this[0], this[1]);
  }
  get Array(): Array<number> {
    return [this[0], this[1]];
  }

  get x(): number {
    return this[0];
  }
  get y(): number {
    return this[1];
  }

  @lazy
  get sqrMagnitude() {
    return this.x ** 2 + this.y ** 2;
  }
  @lazy
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  @lazy
  get normalized(): Vector2D {
    const magnitude = this.magnitude;
    return new Vector2D(this[0] / magnitude, this[1] / magnitude);
  }

  @lazy
  get abs(): Vector2D {
    return this.apply(Math.round);
  }
  @lazy
  get min(): number {
    return Math.min(this[0], this[1]);
  }
  @lazy
  get max(): number {
    return Math.max(this[0], this[1]);
  }
  @lazy
  get ceil(): Vector2D {
    return this.apply(Math.ceil);
  }
  @lazy
  get round(): Vector2D {
    return this.apply(Math.round);
  }
  @lazy
  get floor(): Vector2D {
    return this.apply(Math.floor);
  }
  /** Retorna uma direção randomica com magnitude 1 */
  get random(): Vector2D {
    return new Vector2D(0, 1).rotated(Random.number() * Math.PI * 2);
  }

  get neg(): Vector2D {
    return this.negative;
  }
  @lazy
  get negative(): Vector2D {
    return this.apply((x) => -x);
  }

  angle(): number;
  angle(vector: Vector2D): number;
  angle(other?: Vector2D): number {
    let angle = 0;
    if (other) {
      angle = Math.atan2(other[0], other[1]) - Math.atan2(this.y, this.x);
    } else {
      angle = Math.atan2(this.y, this.x);
    }
    if (angle > Math.PI) {
      angle -= 2 * Math.PI;
    } else if (angle <= -Math.PI) {
      angle += 2 * Math.PI;
    }
    return angle;
  }

  changed(props: { x?: number; y?: number }): Vector2D {
    return new Vector2D(props.x ?? this[0], props.y ?? this[1]);
  }

  add(n: number): Vector2D;
  add(x: number, y?: number): Vector2D;
  add(vector: Vector2D): Vector2D;
  add(other: Vector2D | number[] | number, y?: number): Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return new Vector2D(this[0] + other, this[1] + y);
      }
      return new Vector2D(this[0] + other, this[1] + other);
    }
    return new Vector2D(this[0] + other[0], this[1] + other[1]);
  }

  sub(n: number): Vector2D;
  sub(x: number, y?: number): Vector2D;
  sub(vector: Vector2D): Vector2D;
  sub(other: Vector2D | number[] | number, y?: number): Vector2D;
  sub(other: Vector2D | number[] | number, y?: number): Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return new Vector2D(this[0] - other, this[1] - y);
      }
      return new Vector2D(this[0] - other, this[1] - other);
    }
    return new Vector2D(this[0] - other[0], this[1] - other[1]);
  }
  isub(n: number): Vector2D;
  isub(x: number, y?: number): Vector2D;
  isub(vector: Vector2D): Vector2D;
  isub(other: Vector2D | number[] | number, y?: number): Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return new Vector2D(other - this[0], y - this[1]);
      }
      return new Vector2D(other - this[0], other - this[1]);
    }
    return new Vector2D(other[0] - this[0], other[1] - this[1]);
  }
  mul(n: number): Vector2D;
  mul(x: number, y?: number): Vector2D;
  mul(vector: Vector2D): Vector2D;
  mul(other: Vector2D | number[] | number, y?: number): Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return new Vector2D(this[0] * other, this[1] * y);
      }
      return new Vector2D(this[0] * other, this[1] * other);
    }
    return new Vector2D(this[0] * other[0], this[1] * other[1]);
  }
  div(n: number): Vector2D;
  div(x: number, y?: number): Vector2D;
  div(vector: Vector2D): Vector2D;
  div(other: Vector2D | number[] | number, y?: number): Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return new Vector2D(this[0] / other, this[1] / y);
      }
      return new Vector2D(this[0] / other, this[1] / other);
    }
    return new Vector2D(this[0] / other[0], this[1] / other[1]);
  }
  idiv(n: number): Vector2D;
  idiv(x: number, y?: number): Vector2D;
  idiv(vector: Vector2D): Vector2D;
  idiv(other: Vector2D | number[] | number, y?: number): Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return new Vector2D(other / this[0], y / this[1]);
      }
      return new Vector2D(other / this[0], other / this[1]);
    }
    return new Vector2D(other[0] / this[0], other[1] / this[1]);
  }

  scalar(n: number): Vector2D;
  scalar(x: number, y: number): number;
  scalar(vector: Vector2D): number;
  scalar(other: Vector2D | number[] | number, y?: number): number | Vector2D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] * other + this[1] * y;
      }
      return new Vector2D(this[0] * other, this[1] * other);
    }
    return this[0] * other[0] + this[1] * other[1];
  }

  /**
   *
   * @param on
   * @param ortogonal
   * @copyright https://pt.wikipedia.org/wiki/Proje%C3%A7%C3%A3o_de_um_vetor
   * @returns
   */
  project(on: Vector2D, ortogonal = false) {
    if (ortogonal) {
      return this.sub(on.mul(this.scalar(on) / on.sqrMagnitude));
    }
    return on.mul(this.scalar(on) / on.sqrMagnitude);
  }

  distanceTo(n: number): number;
  distanceTo(x: number, y: number): number;
  distanceTo(vector: Vector2D): number;
  distanceTo(other: Vector2D | number[] | number, y?: number): number {
    return this.sub(other, y).magnitude;
  }

  cross(x: number, y: number, z: number): Vector3D;
  cross(vector: Vector2D): Vector3D;
  cross(vector: Vector3D): Vector3D;
  cross(
    other: Vector3D | Vector2D | number[] | number,
    y?: number,
    z?: number
  ): Vector3D {
    if (typeof other === 'number') {
      if (y !== undefined) {
        if (z !== undefined) {
          return new Vector3D(
            this[1] * z,
            -this[0] * z,
            this[0] * y - this[1] * other
          );
        }
        return new Vector3D(0, 0, this[0] * y - this[1] * other);
      }
      return new Vector3D(
        this[1] * other,
        -this[0] * other,
        this[0] * other - this[1] * other
      );
    }
    if (other instanceof Vector2D) {
      return new Vector3D(0, 0, this[0] * other[1] - this[1] * other[0]);
    }
    return new Vector3D(
      this[1] * other[2],
      -this[0] * other[2],
      this[0] * other[1] - this[1] * other[0]
    );
  }
  scaled(size: number): Vector2D {
    return this.normalized.mul(size);
  }
  /**
   * Rotaciona o vetor `theta` graus
   * @param theta Ângulo em radianos
   * @returns
   */
  rotated(center: Vector2D, theta: number): Vector2D;
  rotated(theta: number): Vector2D;
  rotated(value: number | Vector2D, theta: number = 0) {
    if (typeof value === 'number') {
      const sen = Math.sin(value);
      const cos = Math.cos(value);
      return new Vector2D(
        this[0] * cos + this[1] * sen,
        this[1] * cos - this[0] * sen
      );
    }
    if (theta === 0) {
      return this;
    }
    return this.sub(value).rotated(theta).add(value);
  }

  clamp(min: Vector2D, max: Vector2D): Vector2D;
  clamp(min: number[], max: number[]): Vector2D;
  clamp(min: Vector2D | number[], max: Vector2D | number[]): Vector2D {
    return new Vector2D(
      clamp(min[0], max[0], this[0]),
      clamp(min[1], max[1], this[1])
    );
  }
  clampLength(min: number, max: number): Vector2D;
  clampLength(min: number, max: number): Vector2D {
    return this.magnitude < min
      ? this.normalized.mul(min)
      : this.magnitude < max
      ? this
      : this.normalized.mul(max);
  }
  clampAngle(min: number, max: number): Vector2D {
    const angle = this.angle();
    return angle < min
      ? this.rotated(angle - min)
      : angle < max
      ? this
      : this.rotated(angle - max);
  }
  lerp(from: Vector2D, alpha: number): Vector2D;
  lerp(from: Vector2D, to: Vector2D, alpha: number): Vector2D;
  lerp(vector: Vector2D, to: Vector2D | number, alpha?: number): Vector2D {
    if (typeof to === 'number') {
      return new Vector2D(
        to * (vector[0] - this[0]) + this[0],
        to * (vector[1] - this[1]) + this[1]
      );
    }
    if (alpha === undefined) {
      alpha = 0;
    }
    return new Vector2D(
      alpha * (to[0] - vector[0]) + vector[0],
      alpha * (to[1] - vector[1]) + vector[1]
    );
  }

  apply(fn: (n: number) => number): Vector2D {
    return new Vector2D(fn(this[0]), fn(this[1]));
  }

  equal(n: number): boolean;
  equal(x: number, y: number): boolean;
  equal(vector: Vector2D): boolean;
  equal(vector: number[]): boolean;
  equal(other: Vector2D | number[] | number, y?: number): boolean {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] === other && this[1] === y;
      }
      return this[0] === other && this[1] === other;
    }
    return this[0] === other[0] && this[1] === other[1];
  }

  dif(n: number): boolean;
  dif(x: number, y: number): boolean;
  dif(vector: Vector2D): boolean;
  dif(vector: number[]): boolean;
  dif(other: Vector2D | number[] | number, y?: number): boolean {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] !== other || this[1] !== y;
      }
      return this[0] !== other || this[1] !== other;
    }
    return this[0] !== other[0] || this[1] !== other[1];
  }

  les(n: number): boolean;
  les(x: number, y: number): boolean;
  les(vector: Vector2D): boolean;
  les(vector: number[]): boolean;
  les(other: Vector2D | number[] | number, y?: number): boolean {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] < other && this[1] < y;
      }
      return this[0] < other && this[1] < other;
    }
    return this[0] < other[0] && this[1] < other[1];
  }
  lese(n: number): boolean;
  lese(x: number, y: number): boolean;
  lese(vector: Vector2D): boolean;
  lese(vector: number[]): boolean;
  lese(other: Vector2D | number[] | number, y?: number): boolean {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] <= other && this[1] <= y;
      }
      return this[0] <= other && this[1] <= other;
    }
    return this[0] <= other[0] && this[1] <= other[1];
  }
  grt(n: number): boolean;
  grt(x: number, y: number): boolean;
  grt(vector: Vector2D): boolean;
  grt(vector: number[]): boolean;
  grt(other: Vector2D | number[] | number, y?: number): boolean {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] > other && this[1] > y;
      }
      return this[0] > other && this[1] > other;
    }
    return this[0] > other[0] && this[1] > other[1];
  }
  grte(n: number): boolean;
  grte(x: number, y: number): boolean;
  grte(vector: Vector2D): boolean;
  grte(vector: number[]): boolean;
  grte(other: Vector2D | number[] | number, y?: number): boolean {
    if (typeof other === 'number') {
      if (y !== undefined) {
        return this[0] >= other && this[1] >= y;
      }
      return this[0] >= other && this[1] >= other;
    }
    return this[0] >= other[0] && this[1] >= other[1];
  }

  @lazy
  get length(): number {
    return 2;
  }

  valueOf(): string {
    return this.hash;
  }
  toString(): string {
    return `(${this[0]}, ${this[1]})`;
  }
  iterate(): Iter<number> {
    return {
      value: this[0],
      next: () => ({
        value: this[1],
        next: () => null,
      }),
    };
  }
}

export class Vector2DInt extends Vector2D {
  static algorithm = Math.round;
  constructor(x: number = 0, y: number = 0) {
    super(Vector2DInt.algorithm(x), Vector2DInt.algorithm(y));
  }
  manhattan(vector?: Vector2DInt): number {
    if (!vector) {
      return this[0] + this[1];
    }
    return vector[0] - this[0] + vector[1] - this[1];
  }
}

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
