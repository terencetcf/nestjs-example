import { ExceptionFilter, INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { ExceptionsFilter, HttpExceptionFilter } from '.';
import { EntityNotFoundExceptionFilter } from './entity-not-found-exception.filter';

export const globalFilters = (
  app: INestApplication,
  logger: Logger,
): ExceptionFilter[] => [
  new ExceptionsFilter(app.get(HttpAdapterHost).httpAdapter, logger),
  new HttpExceptionFilter(),
  new EntityNotFoundExceptionFilter(),
];
