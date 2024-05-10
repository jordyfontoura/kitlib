import {calculateScore} from './score';

describe('score', () => {
  it('should calculate the score of a set of conditions', () => {
    expect(calculateScore([true, true])).toBe(3)
    expect(calculateScore([false, true])).toBe(1)
    expect(calculateScore([[true, true], true])).toBe(3)
    expect(calculateScore([[true, false], true])).toBe(2.5)
    expect(calculateScore([[false, true], true])).toBe(2)
    expect(calculateScore([[false, false], true])).toBe(1)
    expect(calculateScore([[true, false], [true, [false, true]], true, true, true])).toBe(26)
  });

  it('should calculate the score of a all set of conditions', () => {

    for (let a = 0; a < 2; a++) {
      for (let b = 0; b < 2; b++) {
        for (let c = 0; c < 2; c++) {
          // Act
          const score = calculateScore([!!a, !!b, !!c]);

          // Assert
          expect(score).toBe(4 * a + 2 * b + c);
        }
      }
    }
  });
})