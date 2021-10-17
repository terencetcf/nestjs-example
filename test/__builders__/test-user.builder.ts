import { User } from '@tt/core/models';
import { generatorUtil } from '@tt/utils';
import * as Factory from 'factory.ts';

export const testUserBuilder = Factory.Sync.makeFactory<User>({
  id: generatorUtil.uuid(),
  username: 'test_user',
  first_name: 'John',
  last_name: 'Doe',
});
