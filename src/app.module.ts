import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConfigModule } from './config/database/db.module';
import { UserModule } from './user/user.module';
import { BaseConfig, DbConfig, JwtConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { AuthProvider } from './auth/providers/auth.provider';
import { LoggerConfigModule } from './config/logger/logger.module';
import { BusinessModule } from './business/business.module';
import { ProductModule } from './product/product.module';
import { MovementModule } from './movement/movement.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [BaseConfig, DbConfig, JwtConfig],
    }),
    DbConfigModule,
    LoggerConfigModule,
    AuthModule,
    UserModule,
    BusinessModule,
    ProductModule,
    MovementModule,
    SaleModule,
  ],
  providers: [AuthProvider],
})
export class AppModule {}
