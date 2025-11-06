import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const AuthProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
