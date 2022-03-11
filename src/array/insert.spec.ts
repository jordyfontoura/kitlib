import { insert } from './insert';

describe('Insert', () => {
  it('Deve inserir um elemento no início do array', () => {
    const array = [1, 3, 5, 7, 9];
    insert(
      array,
      (index, count) => ({
        next: index + 2,
        elements: [count * 2],
        // break: count === 4,
      }),
      1
    );
    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
