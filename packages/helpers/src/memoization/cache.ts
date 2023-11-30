import { promises, PathLike } from 'fs';

async function fileExists(filename: PathLike) {
  try {
    await promises.stat(filename);
    return true;
  } catch (err) {
    if ((err as any).code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
}
async function readFile(path: PathLike) {
  return await promises.readFile(path);
}
async function save(path: PathLike, data: Uint8Array | string) {
  return await promises.writeFile(path, data);
}
type Options<T, K> =
  | {
      mode?: 'file';
      stringify?: (pkg: K) => string | Uint8Array;
      parse?: (buffer: Buffer) => K;
      /**
       * Empacota a informação para ser armazenada
       * @param data Informação a ser armazenada
       * @returns Pacote contendo a informação
       */
      pack?: (data: T) => K;
      /**
       * Desempacota a informação para ser usada
       * @param pkg Pacote a ser usado
       * @returns Informação de dentro do pacote
       */
      unpack?: (pkg: K) => T;
      /**
       * Verifica se a informação precisa ser atualizada
       * @param pkg Pacote a ser usado
       * @returns Retorna verdadeiro se precisa ser atualizada
       */
      save?: (pkg: K) => boolean;
    }
  | {
      mode: 'memory';
      /**
       * Empacota a informação para ser armazenada
       * @param data Informação a ser armazenada
       * @returns Pacote contendo a informação
       */
      pack?: (data: T) => K;
      /**
       * Desempacota a informação para ser usada
       * @param pkg Pacote a ser usado
       * @returns Informação de dentro do pacote
       */
      unpack?: (pkg: K) => T;
      /**
       * Verifica se a informação precisa ser atualizada
       * @param pkg Pacote a ser usado
       * @returns Retorna verdadeiro se precisa ser atualizada
       */
      save?: (pkg: K) => boolean;
    };
/**
 * Usa uma informação cacheada se existir e não precisar ser atualizada
 * @param path Caminho até o arquivo (caso não exista, será criado)
 * @param generator Função para gerar dados no caso dos dados não existirem ou precisarem ser atualizados
 * @param opts Opções de cache
 * @param events Eventos de cache
 * @returns Retorna a informação cacheada ou gerada
 */
export async function cache<T, K = T>(
  path: PathLike | string,
  generator: () => T,
  opts: Options<T, K> = {},
  events: {
    onSave?: (pkg: K) => void;
    onGenerate?: (data: K) => void;
    onLoad?: (pkg: K) => void;
  } = {}
): Promise<T> {
  opts = Object.assign(
    {
      mode: 'file',
      stringify: (data: T) => JSON.stringify(data),
      parse: (buffer: Buffer) => JSON.parse(buffer.toString()) as T,
      save: (data: T) => false,
      unpack: (p: K) => p,
      pack: (data: T) => data,
    },
    opts
  );
  events = Object.assign(
    {
      onSave: undefined,
      onGenerate: undefined,
      onLoad: undefined,
    },
    events
  );
  if (!(await fileExists(path))) {
    let cached = await generator();
    // @ts-ignore
    let pkg = await opts.pack(cached);
    events.onGenerate?.(pkg);
    // @ts-ignore
    await save(path, await opts.stringify(pkg));
    events.onSave?.(pkg);
    return cached;
  }
  let buffer: Buffer;
  try {
    buffer = await readFile(path);
  } catch (err) {
    console.warn(err);
    let cached = await generator();
    // @ts-ignore
    let pkg = await opts.pack(cached);
    events.onGenerate?.(pkg);
    // @ts-ignore
    await save(path, await opts.stringify(pkg));
    events.onSave?.(pkg);
    return cached;
  }
  // @ts-ignore
  let pkg: K = await opts.parse(buffer);
  events.onLoad?.(pkg);
  // @ts-ignore
  let cached: T = opts.unpack(pkg);
  // @ts-ignore
  if (opts.save(pkg)) {
    cached = await generator();
    // @ts-ignore
    pkg = await opts.pack(cached);
    events.onGenerate?.(pkg);
    // @ts-ignore
    await save(path, await opts.stringify(pkg));
    events.onSave?.(pkg);
    return cached;
  }
  return cached;
}
// TODO:
// cache(".", ()=>({nome: "jordy", idade: 22}), {
//   mode: "memory"
// })
