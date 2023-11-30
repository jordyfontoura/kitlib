import {
  IVector2,
  add,
  neg,
  sub,
  mul,
  div,
  scale,
  inverseScale,
  apply,
  dot,
  length,
  manhattanLength,
  normalize,
  distance,
  manhattanDistance,
  angle,
  rotate,
  lerp,
  project,
  ortho,
  perpendicular,
  reflect,
  refract,
  min,
  max,
  clamp,
  exact,
  equal,
  toString,
  toArray,
} from "./vec2";

/**
 * Vector2
 * @class Vector2
 * @implements {IVector2}
 * @export
 * @example
 * const vector1 = new Vector2({ x: 1, y: 2 });
 * const vector2 = new Vector2(1, 2);
 *
 * const vector3 = vector1.add(vector2);
 * const vector4 = vector1.neg().sub(vector2).mul(vector3).div(vector2).scale(2).inverseScale(2);
 * console.log(vector4);
 */

export class Vector2 implements IVector2 {
  x: number;
  y: number;

  constructor(vector: number[]);
  constructor(vector: IVector2);
  constructor(x: number, y: number);
  constructor(vector: IVector2 | number[] | number, y?: number) {
    if (typeof vector === "number") {
      this.x = vector;
      this.y = y!;
    } else if (Array.isArray(vector)) {
      this.x = vector[0];
      this.y = vector[1];
    } else {
      this.x = vector.x;
      this.y = vector.y;
    }
  }

  add(...vectors: IVector2[]) {
    return new Vector2(add(this, ...vectors));
  }
  neg() {
    return new Vector2(neg(this));
  }
  sub(...vectors: IVector2[]) {
    return new Vector2(sub(this, ...vectors));
  }
  mul(...vectors: IVector2[]) {
    return new Vector2(mul(this, ...vectors));
  }
  div(vector: IVector2) {
    return new Vector2(div(this, vector));
  }
  scale(scalar: number) {
    return new Vector2(scale(this, scalar));
  }
  inverseScale(scalar: number) {
    return new Vector2(inverseScale(this, scalar));
  }
  apply(fn: (n: number) => number) {
    return new Vector2(apply(this, fn));
  }
  dot(...vectors: IVector2[]): number {
    return dot(this, ...vectors);
  }
  length(): number {
    return length(this);
  }
  manhattanLength(): number {
    return manhattanLength(this);
  }
  normalized() {
    return new Vector2(normalize(this));
  }
  distance(vector: IVector2) {
    return distance(this, vector);
  }
  manhattanDistance(vector: IVector2) {
    return manhattanDistance(this, vector);
  }
  angle(vector: IVector2) {
    return angle(this, vector);
  }
  rotate(angle: number) {
    return new Vector2(rotate(this, angle));
  }
  lerp(vector: IVector2, t: number) {
    return new Vector2(lerp(this, vector, t));
  }
  project(vector: IVector2) {
    const { vector: v } = project(this, vector);
    return new Vector2(v);
  }
  ortho() {
    return new Vector2(ortho(this));
  }
  perpendicular(vector: IVector2) {
    return perpendicular(this, vector);
  }
  reflect(vector: IVector2) {
    const { vector: v } = reflect(this, vector);
    return new Vector2(v);
  }
  refract(vector: IVector2, n1: number, n2: number) {
    const { vector: v } = refract(this, vector, n1, n2);
    return new Vector2(v);
  }
  min(...vectors: IVector2[]) {
    return new Vector2(min(this, ...vectors));
  }
  max(...vectors: IVector2[]) {
    return new Vector2(max(this, ...vectors));
  }
  clamp(min: IVector2, max: IVector2) {
    return new Vector2(clamp(this, min, max));
  }
  exact(vector: IVector2) {
    return exact(this, vector);
  }
  equal(vector: IVector2) {
    return equal(this, vector);
  }
  toString() {
    return toString(this);
  }
  toArray() {
    return toArray(this);
  }
  get value() {
    return { x: this.x, y: this.y };
  }
  get [Symbol.toStringTag]() {
    return "Vector2";
  }
  get [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator];
  }
}
