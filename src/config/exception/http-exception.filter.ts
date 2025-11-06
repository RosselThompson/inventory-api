import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const HTTP_500_MESSAGE = 'Internal Server Error';
    const HTTP_401_MESSAGE = 'Unauthorized';

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const getMessage = () => {
      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        return { status, message: HTTP_500_MESSAGE };
      }
      if (status === HttpStatus.UNAUTHORIZED) {
        return { status, message: HTTP_401_MESSAGE };
      }
      return msg;
    };

    this.logger.error(JSON.stringify(msg));

    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: getMessage(),
    });
  }
}
