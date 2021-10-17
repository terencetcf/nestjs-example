import { User } from '@tt/core/models';
import { UserService } from '@tt/modules/user';
import { TestApp } from '@tt/test/setup';

import { testData } from './__fixtures__';

describe('UserService', () => {
  let app: TestApp;
  let sut: UserService;

  beforeAll(async () => {
    app = await TestApp.create().setup(
      [],
      [UserService],
      [User],
      testData.entitiesToBeAddedToDb,
    );
    sut = app.get(UserService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getUsers', () => {
    it('should return expected result', async () => {
      // Act
      const actual = await sut.getUsers();

      // Assert
      expect(actual).toMatchSnapshot();
    });
  });

  describe('createUser', () => {
    it('should return the created company', async () => {
      // Act
      const actual = await sut.createUser(testData.createUserDto);

      // Assert
      expect(actual).toMatchSnapshot({
        id: expect.any(String),
      });
    });
  });
});
