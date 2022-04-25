import { IParserSchema, IPipeOptions } from '../parser/parser';

export function BodyParser(schema: IParserSchema, options: IPipeOptions) {
  return function (req, res, next) {
    req.body = schema.compile(req.body, options);
    next();
  };
}
export function QueryParser(schema: IParserSchema, options: IPipeOptions) {
  return function (req, res, next) {
    req.query = schema.compile(req.query, options);
    next();
  };
}
