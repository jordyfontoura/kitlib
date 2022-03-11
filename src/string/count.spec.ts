import count from './count';

describe('String', () => {
  it('Should validate String.count', () => {
    expect(count('', '1')).toEqual(0);
    expect(count('1234567910111213', '1')).toEqual(6);
    expect(count('1234567910111213', '10')).toEqual(1);
    expect(count('1234567910111213', '12')).toEqual(2);

    expect(count('12345679310111213', /[12]3/)).toEqual(2);
  });
});
