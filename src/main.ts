import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger/swagger.config';
import { AllExceptionFilter } from './config/exception/http-exception.filter';
import { classValidatorException } from './config/exception/class-validator-exception';
import { TimeOutInterceptor } from './config/interceptor/timeout.interceptor';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const swagger = new SwaggerConfig(app);

  const port = configService.get<number>('app.port');
  const prefix = configService.get<string>('app.prefix');
  const timeoutLimit = configService.get<number>('app.timeoutLimit');

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(prefix);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor(+timeoutLimit));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: classValidatorException,
      stopAtFirstError: true,
    }),
  );

  swagger.init();
  await app.listen(port);
}
bootstrap();
