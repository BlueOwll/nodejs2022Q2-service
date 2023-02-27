import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';
import { finished } from 'stream/promises';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logging: LoggingService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    this.logging.log(
      `url ${req.hostname}${req.url}, params ${JSON.stringify(
        req.params,
      )}, query params ${JSON.stringify(req.query)} body ${JSON.stringify(
        req.body,
      )}`,
      'Request',
    );
    const oldSend = res.send;
    res.send = (data) => {
      this.logging.log(
        `status code = ${res.statusCode} body = ${JSON.stringify(data)}`,
        'Responce',
      );
      res.send = oldSend; // set function back to avoid the 'double-send'
      return res.send(data); // just call as normal with data
      // https://stackoverflow.com/questions/67849075/why-res-body-is-undefined-in-express
    };

    next();
  }
}
