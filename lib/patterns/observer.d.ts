declare global {
    interface IMiddlewares {
        'Exemplo': {
            id: 'Exemplo';
            params: {
                nome: string;
                description: string;
            };
        };
    }
}
export declare function execMiddleware<T extends keyof IMiddlewares>(id: T, params: IMiddlewares[T]['params']): any[] | undefined;
export declare function registerMiddleware<T extends keyof IMiddlewares>(id: T, value: (args: IMiddlewares[T]) => void): void;
//# sourceMappingURL=observer.d.ts.map