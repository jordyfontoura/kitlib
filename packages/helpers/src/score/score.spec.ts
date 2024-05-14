import {calculateScore} from './score';

describe('score', () => {
  it('should calculate the score of a set of conditions', () => {
    expect(calculateScore([false, false])).toBe(0)
    expect(calculateScore([false, true])).toBe(1/3)
    expect(calculateScore([true, false])).toBe(2/3)
    expect(calculateScore([true, true])).toBe(1)

    expect(calculateScore([0, 0])).toBe(0)
    expect(calculateScore([0, 0.5])).toBe(1/6)
    expect(calculateScore([0, 1])).toBe(2/6)
    expect(calculateScore([0.5, 0])).toBe(2/6)
    expect(calculateScore([0.5, 0.5])).toBe(3/6)
    expect(calculateScore([1, 0])).toBe(4/6)
    expect(calculateScore([1, 0.5])).toBe(5/6)
    expect(calculateScore([1, 1])).toBe(1)

    expect(calculateScore([[true, true], true])).toBe(1)
    expect(calculateScore([[true, false], true])).toBe(2/3)
    expect(calculateScore([[false, true], true])).toBe(2/3)
    expect(calculateScore([[false, false], true])).toBe(1/3)
    expect(calculateScore([[true, false], [true, false, false, true], true, true])).toBe(0.6)
  });

  it('should calculate the score of a all set of conditions', () => {
    for (let a = 0; a < 2; a++) {
      for (let b = 0; b < 2; b++) {
        for (let c = 0; c < 2; c++) {
          // Act
          const score = calculateScore([!!a, !!b, !!c]);
          const expected = (4 * a + 2 * b + c) / ((1 << 3) - 1);

          // Assert
          expect(score).toBe(expected);
        }
      }
    }
  });
})