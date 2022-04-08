import { decycle } from '../object/decycle';
import KitParser from './parser';

describe('Parser', () => {
  it('Deve parsear um objeto baseado em um schema', () => {
    const schema = KitParser.schema({
      idade: KitParser.number(),
      ano: KitParser.number(),
      mes: KitParser.number(),
      peso: KitParser.pipe((x: string) => x.replace(/[^\d.,]/gi, '')).number(),
      altura: KitParser.number(),
      gravidade: KitParser.number().case((n: number) => isNaN(n), Infinity),
    });
    const object = {
      idade: '21',
      ano: 2021,
      mes: '01',
      peso: '1.2 kg',
      altura: '1.5',
      gravidade: NaN,
    };

    const parsed = schema.compile(object);
    expect(typeof parsed.idade).toBe('number');
    expect(parsed.idade).toBe(21);
    expect(typeof parsed.ano).toBe('number');
    expect(parsed.ano).toBe(2021);
    expect(typeof parsed.mes).toBe('number');
    expect(parsed.mes).toBe(1);
    expect(typeof parsed.peso).toBe('number');
    expect(parsed.peso).toBe(1.2);
    expect(typeof parsed.altura).toBe('number');
    expect(parsed.altura).toBe(1.5);
    expect(typeof parsed.gravidade).toBe('number');
    expect(parsed.gravidade).toBe(Infinity);
  });

  it('Deve retornar o valor passado caso não seja encontrado um parser', () => {
    expect(KitParser.number().compile('21')).toBe(21);
    const parser = KitParser.number().switch([
      {
        condition: (n: number) => n === 0,
        action: (piped) => piped.pipe((x) => x + 1),
      },
      {
        condition: (n: number) => n === 1,
        action: (piped) => piped.pipe((x) => x + 1),
      },
      {
        condition: (n: number) => n === 2,
        action: (piped) => piped.pipe((x) => x + 1),
      },
    ]);
    expect(parser.compile(0)).toBe(1);
    expect(parser.compile(1)).toBe(2);
    expect(parser.compile(2)).toBe(3);
  });

  it('Deve parsear todas as chaves do objeto', () => {
    const schema = KitParser.forEachKey(KitParser.number());

    const parsed = schema.compile({
      idade: '21',
      ano: 2021,
      mes: '01',
      peso: '1,2',
      altura: '1.5',
    });

    expect(typeof parsed.idade).toBe('number');
    expect(parsed.idade).toBe(21);
    expect(typeof parsed.ano).toBe('number');
    expect(parsed.ano).toBe(2021);

    expect(typeof parsed.mes).toBe('number');
    expect(parsed.mes).toBe(1);

    expect(typeof parsed.peso).toBe('number');
    expect(parsed.peso).toBe(1.2);

    expect(typeof parsed.altura).toBe('number');
    expect(parsed.altura).toBe(1.5);
  });

  it('Deve parsear as chaves especificadas do objeto', () => {
    const schema = KitParser.forEachKey(KitParser.number(), [
      'idade',
      'mes',
      'ano',
    ]);

    const parsed = schema.compile({
      idade: '21',
      ano: 2021,
      mes: '01',
      peso: '1,2',
      altura: '1.5',
    });

    expect(typeof parsed.idade).toBe('number');
    expect(parsed.idade).toBe(21);
    expect(typeof parsed.ano).toBe('number');
    expect(parsed.ano).toBe(2021);

    expect(typeof parsed.mes).toBe('number');
    expect(parsed.mes).toBe(1);

    expect(typeof parsed.peso).toBe('string');
    expect(parsed.peso).toBe('1,2');

    expect(typeof parsed.altura).toBe('string');
    expect(parsed.altura).toBe('1.5');
  });

  it('array', () => {
    const schema = KitParser.schema({
      idade: KitParser.number(),
      filhos: KitParser.arrayOf(KitParser.number().case(isNaN, 0)),
    });
    const parsed = schema.compile({
      idade: '21',
      filhos: ['1', '2', '3', 'd'],
    });
    expect(typeof parsed.idade).toBe('number');
    expect(parsed.idade).toBe(21);
    expect(typeof parsed.filhos).toBe('object');
    expect(parsed.filhos).toEqual([1, 2, 3, 0]);
  });

  it('inner schema', () => {
    const schema = KitParser.schema({
      idade: KitParser.number(),
      atributos: KitParser.schema({
        hp: KitParser.number(),
      }),
    });
    expect(
      schema.compile({
        idade: '22',
        atributos: {
          hp: '100',
        },
      })
    ).toStrictEqual({
      idade: 22,
      atributos: {
        hp: 100,
      },
    });
  });

  it('recursive schema', () => {
    const schema = KitParser.schema({
      idade: KitParser.number(),
      atributos: KitParser.schema({
        hp: KitParser.number(),
        self: KitParser.ref((obj) => obj),
      }),
    });
    const person = {
      idade: '22',
      atributos: {
        hp: '100',
        self: null as any,
      },
    };
    person.atributos.self = person;
    const parsed = schema.compile(person);
    expect(parsed.idade).toBe(22);
    expect(parsed.atributos.hp).toBe(100);
    expect(decycle(parsed.atributos.self)).toStrictEqual(decycle(parsed));
  });

  it('optional', () => {
    const schema = KitParser.schema({
      idade: KitParser.optional().number(),
    });
    expect(
      schema.compile({
        idade: '22',
      })
    ).toStrictEqual({
      idade: 22,
    });
    expect(
      schema.compile({
        idade: null,
      })
    ).toStrictEqual({
      idade: null,
    });
  });

  it('default', () => {
    const schema = KitParser.schema({
      idade: KitParser.default(0).number(),
    });
    expect(
      schema.compile({
        idade: '22',
      })
    ).toStrictEqual({
      idade: 22,
    });
    expect(schema.compile({})).toStrictEqual({
      idade: 0,
    });
  });

  it('default isEmpty list', () => {
    const schema = KitParser.schema({
      idade: KitParser.number().default(17, { isEmpty: [NaN] }),
    });
    expect(
      schema.compile({
        idade: '22',
      })
    ).toStrictEqual({
      idade: 22,
    });
    expect(schema.compile({})).toStrictEqual({
      idade: 17,
    });
  });

  it('default isEmpty function', () => {
    const schema = KitParser.schema({
      idade: KitParser.number().default(17, { isEmpty: isNaN }),
    });
    expect(
      schema.compile({
        idade: '22',
      })
    ).toStrictEqual({
      idade: 22,
    });
    expect(schema.compile({})).toStrictEqual({
      idade: 17,
    });
  });

  it('async schema', async () => {
    const schema = KitParser.schema(
      {
        idade: KitParser.pipe(
          (value) =>
            new Promise((resolve) => setTimeout(() => resolve(value), 200))
        )
          .number()
          .default(17, { isEmpty: isNaN }),
      },
      'async'
    );
    const promise = schema.compile({
      idade: '22',
    });
    expect(promise).toBeInstanceOf(Promise);
    const parsed = await promise;
    expect(parsed).toStrictEqual({
      idade: 22,
    });
    expect(await schema.compile({})).toStrictEqual({
      idade: 17,
    });
  });
});
