import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name } from '@tt/package';

import { appConfig } from '../configs';

export function setupSwagger(app: INestApplication): void {
  const version = appConfig().version;
  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(appConfig().version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${version}/docs`, app, document);
}
