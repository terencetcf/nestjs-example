import { User } from '@tt/core/models';
import { CreateUserDto } from '@tt/modules/user';
import { testUserBuilder } from '@tt/test/builders';
import { EntityTestData } from '@tt/test/setup';

const user = testUserBuilder.build({
  id: '070b50ca-486a-41e7-9a2e-cda2c16204ac',
});

const entitiesToBeAddedToDb: EntityTestData[] = [
  {
    entityClass: User,
    data: [user],
  },
];

const createUserDto: CreateUserDto = {
  username: 'new-username',
  first_name: 'Steve',
  last_name: 'Job',
};

export const testData = {
  entitiesToBeAddedToDb,
  createUserDto,
};
