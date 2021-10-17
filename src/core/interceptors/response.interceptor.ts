import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { IResponse } from '@tt/core/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(map((data) => this.transformResponse(data)));
  }

  private transformResponse(data: SafeAny): SafeAny {
    if (typeof data === 'string') {
      return data;
    }

    return { data };
  }
}
