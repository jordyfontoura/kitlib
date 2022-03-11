import capitalize from './capitalize';

describe('String', () => {
  it('Deve validar a função capitalize', () => {
    expect(capitalize('teste')).toEqual('Teste');
    expect(capitalize('teste teste')).toEqual('Teste Teste');
    expect(capitalize('teste,teste')).toEqual('Teste,Teste');
  });
});
