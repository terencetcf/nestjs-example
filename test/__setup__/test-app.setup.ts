import { INestApplication, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { globalFilters } from '@tt/core/filters';
import { globalInterceptors } from '@tt/core/interceptors';
import { globalPipes } from '@tt/core/pipes';
import { Logger, LoggerModule } from 'nestjs-pino';
import request from 'supertest';
import { DataSource, EntityTarget, Repository } from 'typeorm';

import { TEST_DB_CONFIG, testConfiguration } from './test-db.setup';

export type EntityTestData = {
  entityClass: EntityTarget<unknown>;
  data: SafeAny;
};

export class TestApp {
  app!: INestApplication;
  dataSource!: DataSource;
  testingModule!: TestingModule;

  static create(): TestApp {
    return new TestApp();
  }

  async setup(
    controllers?: Type<unknown>[],
    providers?: Provider[],
    repositoryEntities?: Type<unknown>[],
    testDataToBeAddedToDb?: EntityTestData[],
  ): Promise<TestApp> {
    this.dataSource = await new DataSource(TEST_DB_CONFIG).initialize();

    await this.setupApp(controllers, providers, repositoryEntities);
    await this.addToDB(testDataToBeAddedToDb);

    return this;
  }

  private async setupApp(
    controllers?: Type<unknown>[],
    providers?: Provider[],
    repositoryEntities?: Type<unknown>[],
  ): Promise<TestApp> {
    const repoEntityProviders = (repositoryEntities || []).map((repo) => ({
      provide: getRepositoryToken(repo),
      useValue: this.dataSource.getRepository(repo),
    }));

    const builder = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [testConfiguration],
          isGlobal: true,
        }),
        LoggerModule.forRoot({
          pinoHttp: {
            autoLogging: false,
          },
        }),
      ],
      controllers,
      providers: [...(providers || []), ...repoEntityProviders],
    });

    const logger: Logger = jest.fn() as SafeAny;

    this.testingModule = await builder.compile();
    this.app = this.testingModule.createNestApplication();
    this.app
      .useGlobalPipes(...globalPipes())
      .useGlobalFilters(...globalFilters(this.app, logger))
      .useGlobalInterceptors(...globalInterceptors(this.app));

    await this.app.init();

    return this;
  }

  async close(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.destroy();
    }

    await this.app.close();
  }

  get<T>(typeOrToken: Type<T> | string): T {
    return this.testingModule.get<T>(typeOrToken);
  }

  getRepo<T>(entityClass: EntityTarget<T>): Repository<T> {
    return this.dataSource.getRepository(entityClass);
  }

  async addDataToDB<T>(entityClass: EntityTarget<T>, data: T): Promise<void> {
    const repo = this.getRepo<T>(entityClass);
    await repo.save(data);
  }

  async addArrayDataToDB<T>(
    entityClass: EntityTarget<T>,
    data: T[],
  ): Promise<void> {
    const repo = this.getRepo<T>(entityClass);
    await repo.save(data);
  }

  async addToDB(datasets?: EntityTestData[]): Promise<void> {
    if (!datasets) {
      return;
    }

    for (const d of datasets) {
      const repo = this.getRepo(d.entityClass);
      await repo.save(d.data);
    }
  }

  async wait(ms = 100): Promise<void> {
    await new Promise((r) => setTimeout(r, ms));
  }

  get httpRequest(): request.SuperTest<request.Test> {
    return request(this.app.getHttpServer());
  }
}
