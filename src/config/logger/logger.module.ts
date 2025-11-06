import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            genReqId: (request) =>
              request.headers['x-correlation-id'] || uuidv4(),
            formatters: {
              level: (label) => {
                return { level: label.toUpperCase() };
              },
            },
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
            level:
              configService.get<string>('app.env') === 'Prod'
                ? 'info'
                : 'debug',
          },
        };
      },
    }),
  ],
})
export class LoggerConfigModule {}
