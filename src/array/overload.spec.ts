import overload from './overload';

describe('removeDuplicates', () => {
  beforeAll(() => {
    overload();
  });

  it('Deve retornar um array de elementos únicos', () => {
    const array = [
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib2', idade: 30 },
    ];
    const received = array.uniquify();
    expect(received).toEqual([
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib2', idade: 30 },
    ]);
  });

  it('Deve retornar um array de elementos únicos usando uma chave', () => {
    const array = [
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib2', idade: 30 },
      { nome: 'kitlib3', idade: 30 },
    ];
    const received = array.uniquify('idade');
    expect(received).toEqual([{ nome: 'kitlib', idade: 30 }]);
  });

  it('Deve retornar um array de elementos únicos usando duas chaves', () => {
    const array = [
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib', idade: 30 },
      { nome: 'kitlib', idade: 30 },
    ];
    const received = array.uniquify('nome', 'idade');
    expect(received).toEqual([{ nome: 'kitlib', idade: 30 }]);
  });

  it('Deve retornar um array de elementos únicos baseado em valores pseudo-aléatorios', () => {
    const array = Array.from({ length: 1000 }, (_, id) => ({
      value: Math.floor(Math.random() * 10),
    }));
    const received = array.uniquify('value');
    expect(received.length).toBe(10);
    expect(received.sort((a: any, b: any) => b.value - a.value)).toEqual(
      Array.from({ length: 10 }, (_, value) => ({ value })).sort(
        (a: any, b: any) => b.value - a.value
      )
    );
  });

  it('Deve retornar um array de elementos únicos usando o método de primeiro entre as chaves', () => {
    const array = [
      { id: '27', idade: 30 },
      { id: '27', sobrenome: 'kitsune' },
    ];
    const received = array.uniquify(['id'], 'first');
    expect(received).toEqual([{ id: '27', idade: 30 }]);
  });

  it('Deve retornar um array de elementos únicos usando o método de união entre as chaves', () => {
    const array = [
      { id: '27', idade: 30 },
      { id: '27', sobrenome: 'kitsune' },
    ];
    const received = array.uniquify(['id'], 'merge');
    expect(received).toEqual([{ id: '27', idade: 30, sobrenome: 'kitsune' }]);
  });

  it('Deve retornar um array de elementos únicos usando o método de interceptação entre as chaves', () => {
    const array = [
      { id: '27', idade: 30, sobrenome: 'jubileu', nome: 'kitlib' },
      { id: '27', sobrenome: 'kitsune', nome: 'kitlib' },
    ];
    const received = array.uniquify(['id'], 'intercept');
    expect(received).toEqual([{ id: '27', nome: 'kitlib' }]);
  });

  it('Deve retornar um array de elementos únicos usando o método de último entre as chaves', () => {
    const array = [
      { id: '27', idade: 30 },
      { id: '27', sobrenome: 'kitsune' },
    ];
    const received = array.uniquify(['id'], 'last');
    expect(received).toEqual([{ id: '27', sobrenome: 'kitsune' }]);
  });

  it('Deve testar intensivamente a função uniquify', () => {
    const array = [
      { id: '27', idade: 30, nome: 'kitsune', vivo: true },
      { id: '27', nome: 'kitsune' },
      { id: '27', nome: 'kitsune', sobrenome: 'kitlib' },
      { id: '27', idade: 31, sobrenome: 'kitlib', nome: 'kitsune' },
    ];
    let received = array.uniquify(['id'], 'first');
    expect(received).toEqual([
      { id: '27', idade: 30, nome: 'kitsune', vivo: true },
    ]);

    received = array.uniquify(['id'], 'last');
    expect(received).toEqual([
      { id: '27', idade: 31, sobrenome: 'kitlib', nome: 'kitsune' },
    ]);

    received = array.uniquify(['id'], 'merge');
    expect(received).toEqual([
      { id: '27', idade: 31, sobrenome: 'kitlib', nome: 'kitsune', vivo: true },
    ]);

    received = array.uniquify(['id'], 'intercept');
    expect(received).toEqual([{ id: '27', nome: 'kitsune' }]);
  });
});
