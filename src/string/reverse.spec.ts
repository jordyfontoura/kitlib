import reverse from './reverse';

describe('String', () => {
  it('Should validate String.count', () => {
    expect(reverse('1234')).toEqual('4321');
  });
});
