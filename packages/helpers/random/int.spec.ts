import int from './int';

describe('Random', () => {
  it('Should be generate random int', () => {
    for (let i = 0; i < 100; i++) {
      Math.random = () => i / 100;
      let value = int(100);
      expect(value).toEqual(Math.floor((i / 100) * 99));
    }
    for (let i = 0; i < 1000; i++) {
      const value = int(0, 10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(10);
    }
    // expect(value).toBeGreaterThanOrEqual(0);
    // value = int(17, 18) - 17;
    // expect(value).toBeLessThanOrEqual(1);
    // expect(value).toBeGreaterThanOrEqual(0);
    // value = int(18, 17) - 17;
    // expect(value).toBeGreaterThanOrEqual(0);
    // expect(value).toBeLessThanOrEqual(1);

    // expect(int(-17)).toBeLessThanOrEqual(0);
    // expect(int(-17, -16)).toBeLessThanOrEqual(-16);
  });
});
