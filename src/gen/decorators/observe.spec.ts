import { observe } from './observe';
let contador = 1;
function generateId() {
  return contador++;
}
class E {
  @observe(generateId)
  id: number = -17;
}

describe('Observe', () => {
  test('Observe', () => {
    contador = 1;
    expect(contador).toBe(1);
    const a = new E();
    expect(contador).toBe(1);
    expect(a.id).toBe(-17);
    expect(contador).toBe(1);
    a.id = 4;
    expect(contador).toBe(2);
    a.id = 4;
    expect(contador).toBe(3);
  });
});
