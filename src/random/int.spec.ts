import int from './int';

describe('Random', () => {
  it('Should be generate random int', () => {
    let value = int(10);
    expect(value).toBeGreaterThanOrEqual(0);
    value = int(17, 18) - 17;
    expect(value).toBeLessThanOrEqual(1);
    expect(value).toBeGreaterThanOrEqual(0);
    value = int(18, 17) - 17;
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);

    expect(int(-17)).toBeLessThanOrEqual(0);
    expect(int(-17, -16)).toBeLessThanOrEqual(-16);
  });
});
