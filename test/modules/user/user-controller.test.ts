import { HttpStatus } from '@nestjs/common';
import { User } from '@tt/core/models';
import { UserController, UserService } from '@tt/modules/user';
import { TestApp } from '@tt/test/setup';

import { testData } from './__fixtures__';

describe('UserController', () => {
  let app: TestApp;
  beforeAll(async () => {
    app = await TestApp.create().setup(
      [UserController],
      [UserService],
      [User],
      testData.entitiesToBeAddedToDb,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return OK status with expected response body', async () => {
      // Act
      const actual = await app.httpRequest.get(`/users`);

      // Assert
      expect(actual.status).toEqual(HttpStatus.OK);
      expect(actual.body).toMatchSnapshot();
    });
  });

  describe('POST /users', () => {
    it('should return OK status with expected response body', async () => {
      // Act
      const actual = await app.httpRequest
        .post(`/users`)
        .send(testData.createUserDto);

      // Assert
      expect(actual.status).toEqual(HttpStatus.CREATED);
      expect(actual.body).toMatchSnapshot({
        data: {
          id: expect.any(String),
        },
      });
    });

    it('should return BadRequest status if payload is invalid', async () => {
      // Arrange
      const invalidPayload = {};

      // Act
      const actual = await app.httpRequest.post(`/users`).send(invalidPayload);

      // Assert
      expect(actual.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(actual.body).toMatchSnapshot();
    });

    it('should return BadRequest status if payload exceeded limits', async () => {
      // Arrange
      const invalidPayload = {
        username: 'x'.repeat(51),
        first_name: 'x'.repeat(101),
        last_name: 'x'.repeat(101),
      };

      // Act
      const actual = await app.httpRequest.post(`/users`).send(invalidPayload);

      // Assert
      expect(actual.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(actual.body).toMatchSnapshot();
    });
  });
});
