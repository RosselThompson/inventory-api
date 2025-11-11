import { ConfigFactory } from '@nestjs/config';

export const BaseConfig: ConfigFactory = () => ({
  app: {
    env: process.env.APP_ENV,
    port: parseInt(process.env.APP_PORT) || 3000,
    prefix: process.env.APP_PREFIX || '/api',
    timeoutLimit: parseInt(process.env.APP_TIMEOUT_LIMIT) || 120000, //ms
  },
});

export const DbConfig: ConfigFactory = () => ({
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
});

export const JwtConfig: ConfigFactory = () => ({
  jwt: {
    secrets: {
      accessToken: process.env.JWT_ACCESS_SECRET,
      refreshToken: process.env.JWT_REFRESH_SECRET,
    },
    expiresIn: {
      access: process.env.JWT_ACCESS_EXPIRES_IN,
      refresh: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  },
});
