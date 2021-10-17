import { NestFactory } from '@nestjs/core';
import { appConfig, setupHttpServerConfigurations } from '@tt/core/configs';
import { globalFilters } from '@tt/core/filters';
import { globalPipes } from '@tt/core/pipes';
import { setupSwagger } from '@tt/core/services';
import { envUtil } from '@tt/utils';
import compression from 'compression';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { globalInterceptors } from './core/interceptors';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: envUtil.isDevelopment() ? undefined : false,
  });

  setupHttpServerConfigurations(app);

  const appCfg = appConfig();
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.setGlobalPrefix(appCfg.version);
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(...globalPipes());
  app.useGlobalFilters(...globalFilters(app, logger));
  app.useGlobalInterceptors(...globalInterceptors(app));

  setupSwagger(app);

  await app.listen(appCfg.port);
}
bootstrap();
