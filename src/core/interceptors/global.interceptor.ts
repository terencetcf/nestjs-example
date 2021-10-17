import {
  ClassSerializerInterceptor,
  INestApplication,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ResponseInterceptor } from '.';

export const globalInterceptors = (
  app: INestApplication,
): NestInterceptor[] => [
  new ResponseInterceptor(),
  new ClassSerializerInterceptor(app.get(Reflector)),
];
