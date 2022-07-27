import { InternalServerErrorException } from '@nestjs/common';
import { envUtil } from '@tt/utils';

describe('envUtil', () => {
  describe('get', () => {
    it('should return expected result', () => {
      // Act
      const actual = envUtil.get('NODE_ENV');

      // Arrange
      expect(actual).toEqual('development');
    });

    it('should return default value', () => {
      // Act
      const actual = envUtil.get('NO_ENV_KVP', 'default-value');

      // Arrange
      expect(actual).toEqual('default-value');
    });

    it('should throw exception', () => {
      // Act
      const action = () => envUtil.get('ENV_KEY_NOT_EXISTS');

      // Arrange
      expect(action).toThrow(InternalServerErrorException);
    });
  });

  describe('getInt', () => {
    it('should return expected value', () => {
      // Act
      const actual = envUtil.getInt('API_PORT');

      // Assert
      expect(actual).toEqual(8080);
    });
  });

  describe('isDevelopment', () => {
    it('should return expected value', () => {
      // Act
      const actual = envUtil.isDevelopment();

      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
