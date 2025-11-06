import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('db.host'),
        port: parseInt(configService.get<string>('db.port')),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.pass'),
        database: configService.get<string>('db.name'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        options: { encrypt: false },
      }),
    }),
  ],
})
export class DbConfigModule {}
