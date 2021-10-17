import { ArgumentsHost, Catch, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Logger } from 'nestjs-pino';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly _httpServer: HttpServer,
    private readonly logger: Logger,
  ) {
    super(_httpServer);
  }

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    this.logger.error(exception, response?.req?.body ?? null);

    super.catch(exception, host);
  }
}
