import { Vector2 } from "./vector2";

export type IVector2 = { x: number; y: number };

export function create(x: number, y: number): Vector2 {
  return new Vector2({ x, y });
}

export function zero(): Vector2 {
  return new Vector2({ x: 0, y: 0 });
}

export function one(): Vector2 {
  return new Vector2({ x: 1, y: 1 });
}

export function up(): Vector2 {
  return new Vector2({ x: 0, y: 1 });
}

export function down(): Vector2 {
  return new Vector2({ x: 0, y: -1 });
}

export function left(): Vector2 {
  return new Vector2({ x: -1, y: 0 });
}

export function right(): Vector2 {
  return new Vector2({ x: 1, y: 0 });
}

export function clone(vector: IVector2): Vector2 {
  return new Vector2({ x: vector.x, y: vector.y });
}

export function add(...vectors: IVector2[]): Vector2 {
  return new Vector2(
    vectors.reduce(
      (acc, vector) => {
        acc.x += vector.x;
        acc.y += vector.y;
        return acc;
      },
      { x: 0, y: 0 }
    )
  );
}

export function sub(vector: IVector2, ...vectors: IVector2[]): Vector2 {
  return new Vector2(
    vectors.reduce((acc, vector) => {
      acc.x -= vector.x;
      acc.y -= vector.y;
      return acc;
    }, clone(vector))
  );
}

export function neg(vector: IVector2): Vector2 {
  return new Vector2({ x: -vector.x, y: -vector.y });
}

export function mul(vector: IVector2, ...vectors: IVector2[]): Vector2 {
  return new Vector2(
    vectors.reduce((acc, vector) => {
      acc.x *= vector.x;
      acc.y *= vector.y;
      return acc;
    }, clone(vector))
  );
}

export function div(vector1: IVector2, vector2: IVector2): Vector2 {
  return new Vector2({ x: vector1.x / vector2.x, y: vector1.y / vector2.y });
}

export function scale(vector: IVector2, scalar: number): Vector2 {
  return new Vector2({ x: vector.x * scalar, y: vector.y * scalar });
}

export function inverseScale(vector: IVector2, scalar: number): Vector2 {
  return new Vector2({ x: vector.x / scalar, y: vector.y / scalar });
}

export function apply(vector: IVector2, fn: (n: number) => number): Vector2 {
  return new Vector2({ x: fn(vector.x), y: fn(vector.y) });
}

export function dot(...vectors: IVector2[]): number {
  return vectors.reduce((acc, vector) => acc + vector.x * vector.y, 0);
}

export function length(vector: IVector2): number {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

export function lengthSquared(vector: IVector2): number {
  return vector.x ** 2 + vector.y ** 2;
}

export function manhattanLength(vector: IVector2): number {
  return Math.abs(vector.x) + Math.abs(vector.y);
}

export function normalize(vector: IVector2): Vector2 {
  const len = length(vector);
  return new Vector2({ x: vector.x / len, y: vector.y / len });
}

export function distance(vector1: IVector2, vector2: IVector2): number {
  return length(sub(vector1, vector2));
}

export function manhattanDistance(
  vector1: IVector2,
  vector2: IVector2
): number {
  return manhattanLength(sub(vector1, vector2));
}

export function angle(vector1: IVector2, vector2: IVector2): number {
  return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x);
}

export function rotate(vector: IVector2, angle: number): Vector2 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return new Vector2({
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y * cos,
  });
}

export function lerp(vector1: IVector2, vector2: IVector2, t: number): Vector2 {
  return add(
    mul(vector1, { x: 1 - t, y: 1 - t }),
    mul(vector2, { x: t, y: t })
  );
}

export function random(): Vector2 {
  return new Vector2(
    normalize(rotate({ x: 1, y: 0 }, Math.random() * Math.PI * 2))
  );
}

export function project(
  vector1: IVector2,
  vector2: IVector2
): { scalar: number; vector: Vector2 } {
  const scalar = dot(vector1, vector2) / length(vector2);
  return { scalar, vector: mul(normalize(vector2), { x: scalar, y: scalar }) };
}

export function ortho(vector: IVector2): Vector2 {
  return new Vector2({ x: -vector.y, y: vector.x });
}

export function perpendicular(vector1: IVector2, vector2: IVector2): boolean {
  return dot(vector1, vector2) === 0;
}

export function reflect(
  vector1: IVector2,
  vector2: IVector2
): { scalar: number; vector: Vector2 } {
  const { scalar, vector } = project(vector1, vector2);
  return { scalar: scalar * 2, vector: sub(vector1, vector) };
}

export function refract(
  vector1: IVector2,
  vector2: IVector2,
  n1: number,
  n2: number
): { scalar: number; vector: Vector2 } {
  const { scalar, vector } = project(vector1, vector2);
  const r = n1 / n2;
  const k = 1 - r ** 2 * (1 - scalar ** 2);
  if (k < 0) {
    return { scalar: 0, vector: zero() };
  }
  return { scalar: r * scalar - Math.sqrt(k), vector };
}

export function min(...vectors: IVector2[]): Vector2 {
  return new Vector2(
    vectors.reduce(
      (acc, vector) => {
        acc.x = Math.min(acc.x, vector.x);
        acc.y = Math.min(acc.y, vector.y);
        return acc;
      },
      { x: Infinity, y: Infinity }
    )
  );
}

export function max(...vectors: IVector2[]): Vector2 {
  return new Vector2(
    vectors.reduce(
      (acc, vector) => {
        acc.x = Math.max(acc.x, vector.x);
        acc.y = Math.max(acc.y, vector.y);
        return acc;
      },
      { x: -Infinity, y: -Infinity }
    )
  );
}

export function clamp(vector: IVector2, min: IVector2, max: IVector2): Vector2 {
  return new Vector2({
    x: Math.max(min.x, Math.min(max.x, vector.x)),
    y: Math.max(min.y, Math.min(max.y, vector.y)),
  });
}

export function exact(vector1: IVector2, vector2: IVector2): boolean {
  return vector1.x === vector2.x && vector1.y === vector2.y;
}

export function equal(vector1: IVector2, vector2: IVector2): boolean {
  return (
    Math.abs(vector1.x - vector2.x) < Number.EPSILON &&
    Math.abs(vector1.y - vector2.y) < Number.EPSILON
  );
}

export function toString(vector: IVector2): string {
  return `(${vector.x}, ${vector.y})`;
}

export function toArray(vector: IVector2): [number, number] {
  return [vector.x, vector.y];
}

export function fromArray([x, y]: [number, number]): Vector2 {
  return new Vector2({ x, y });
}
