import { INestApplication } from '@nestjs/common';

export const setupHttpServerConfigurations = (app: INestApplication): void => {
  const httpAdapter = app.getHttpAdapter();
  const server = httpAdapter.getHttpServer();
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
};
