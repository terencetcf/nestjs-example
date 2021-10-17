import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const payload = {
      error: {
        message: this.buildErrorMessage(exception.message),
      },
    };

    response.status(HttpStatus.NOT_FOUND).json(payload);
  }

  private buildErrorMessage(errMsg: string): string {
    let entityName = 'resources';
    if (errMsg.startsWith(`Could not find any entity of type "`)) {
      const matches = errMsg.match(/\"(.*?)\"/);
      if (matches) {
        entityName = matches[0].split('"').join('');
      }
    }

    return `Unable to find requested ${entityName}`;
  }
}
