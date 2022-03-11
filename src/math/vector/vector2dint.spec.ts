import { Vector2DInt } from './vector2dint';

describe('Vector2D', () => {
  test('Deve retornar um vetor inteiro', () => {
    const [a, b] = [Math.random() * 10, Math.random() * 10];
    let vector = new Vector2DInt(a, b);
    expect(vector.Vector2DInt.x).toBe(Math.round(a));
    expect(vector.Vector2DInt.y).toBe(Math.round(b));
  });
});
describe('Vector2DInt', () => {
  test('Deve criar um vetor', () => {
    let vector = new Vector2DInt(0);
    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
    const [a, b] = [Math.random() * 10, Math.random() * 10];
    vector = new Vector2DInt(a, b);
    expect(vector.x).toBe(Math.round(a));
    expect(vector.y).toBe(Math.round(b));
  });
});
