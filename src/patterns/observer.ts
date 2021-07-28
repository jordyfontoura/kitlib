declare global{
  interface IMiddlewares{
    'Exemplo': {id: 'Exemplo', params: {nome: string, description: string}};
  }
}
type Ks<T=string> = T extends keyof IMiddlewares ? IMiddlewares[T] : {id: string, params: any}

const middlewares: {
  [K in string]: ((args: Ks<K>)=>any)[]
} = {};
export function execMiddleware<T extends keyof IMiddlewares>(id :T, params: IMiddlewares[T]['params']) {
  if (id in middlewares || middlewares[id]) {
    return middlewares[id].map(fn=>fn({id, params}));
  }
}
export function registerMiddleware<T extends keyof IMiddlewares>(id: T, value: (args: IMiddlewares[T])=>void) {
  if(!(id in middlewares) || !Object.keys(middlewares).includes(id)){
    middlewares[id] = [];
  }
  if (!middlewares[id].includes(value as (args: {id: string, params: any})=>void)) {
    middlewares[id].push(value as (args: {id: string, params: any})=>void);
  }
}