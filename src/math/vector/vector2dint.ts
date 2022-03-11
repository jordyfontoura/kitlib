import { Vector2D } from './vector2d';

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
