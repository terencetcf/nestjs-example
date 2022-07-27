import { HttpStatus } from '@nestjs/common';
import { StatusController, StatusService } from '@tt/modules/status';
import { TestApp } from '@tt/test/setup';

describe('StatusController', () => {
  let app: TestApp;
  beforeAll(async () => {
    app = await TestApp.create().setup([StatusController], [StatusService]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /status', () => {
    it('should return OK status with expected response body', async () => {
      // Act
      const actual = await app.httpRequest.get(`/status`);

      // Assert
      expect(actual.status).toEqual(HttpStatus.OK);
      expect(actual.body).toMatchSnapshot();
    });
  });
});
