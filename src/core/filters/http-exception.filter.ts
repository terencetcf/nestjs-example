import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

type ExceptionResponse = {
  message?: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const err = exception.getResponse();
    const message = (err as ExceptionResponse)?.message || err.toString();
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = {
      error: {
        message,
      },
    };

    response.status(statusCode).json(payload);
  }
}
