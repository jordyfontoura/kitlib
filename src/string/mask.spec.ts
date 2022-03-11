import mask from './mask';

describe('String', () => {
  it('Should validate String.mask', () => {
    expect(mask('12345678', '####-####')).toEqual('1234-5678');
    expect(mask('123456789', '####-####')).toEqual('1234-56789');
    expect(mask('123456789', '##-##-####')).toEqual('12-34-56789');
    expect(mask('$#3456789', '##-##-####')).toEqual('$#-34-56789');
    expect(mask('1234', '##-##-####')).toEqual('12-34');
    expect(mask('0123456789', '####-####', { direction: 'left' })).toEqual(
      '012345-6789'
    );

    expect(mask('12345678', ['####-####', '#-##'])).toEqual('1234-5678');
    expect(mask('12', ['####-####', '#-##'])).toEqual('1-2');
    expect(mask('123', ['####-####', '#-##'])).toEqual('1-23');
    expect(mask('1234', ['####-####', '#-##'])).toEqual('1234');
  });
});
