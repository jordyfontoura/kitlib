import { NextFunction, Request, Response } from 'express';
import { performance } from 'perf_hooks';

function now(): number {
  return performance.now();
}

interface IInfos {
  request: {
    at: number;
    method: Request['method'];
    path: Request['path'];
    query: Request['query'];
    body: Request['body'];
    headers: Request['headers'];
    userAgent?: string;
    ip: string;
  };
  response: {
    status?: Response['statusCode'];
    at: number;
  };
  duration: number;
}

export function metrics(record: (infos: IInfos) => void | Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const start = now();
    const info: IInfos = {
      request: {
        at: start,
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        headers: req.headers,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
      },
      response: {
        at: Infinity,
      },
      get duration() {
        return this.response.at - this.request.at;
      },
    };

    res.once('close', function () {
      const endedAt = now();

      info.response = {
        status: res.statusCode,
        at: endedAt,
      };
      record(info);
    });
    next();
  };
}
