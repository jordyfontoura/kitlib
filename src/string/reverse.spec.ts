import reverse from './reverse';

describe('String', () => {
  it('Deve validar a função reverse', () => {
    expect(reverse('1234')).toEqual('4321');
  });
});
